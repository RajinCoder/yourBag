import express from 'express';
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';
import {db} from "./utils/db.server.ts"

const app = express();
const PORT = 3000;

// Configure CORS
app.use(cors());

// Function to get headlines with paragraphs from Wikipedia
const getHeadlinesWithParagraphs = async () => {
  const url = 'https://en.wikipedia.org/wiki/Basketball_moves';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const contentDiv = $('#mw-content-text');

  const headlinesWithParagraphs: { name: string; description: string; }[] = [];
  contentDiv.find('span.mw-headline').each((_, element) => {
    const headlineText = $(element).text().trim();
    let pTag = $(element).parent().nextAll('p').first(); // Adjusted to find the next <p> correctly
    let pText = pTag.length ? pTag.text().trim() : "No paragraph found";
    
    // Handling edge cases where the paragraph might not directly follow the headline
    if (!pTag.length || pText === "") {
        pTag = $(element).parent().nextAll().find('p').first();
        pText = pTag.length ? pTag.text().trim() : "No paragraph found";
    }

    headlinesWithParagraphs.push({ name: headlineText, description: pText });
});

  return headlinesWithParagraphs;
};


app.get('/headlines', async (_req, res) => {
  try {
    const headlinesWithParagraphs = await getHeadlinesWithParagraphs();
    res.json({ headlines: headlinesWithParagraphs });
  } catch (error) {
    console.error('Error fetching headlines:', error);
    res.status(500).send('Error fetching headlines');
  }
});

app.get('/basketballMoves', async (_req, res) => {
  const data = await db.basketballMoveCards.findMany({
    select: {
      uid: true, // Assuming you want to include it but as a string
      name: true,
      description: true
    }
  });

  // Manually convert `uid` from `bigint` to `string`
  const transformedData = data.map(item => ({
    ...item,
    uid: item.uid.toString(), // Convert `uid` to string
  }));

  res.json(transformedData);
});

app.get('/search', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const API_KEY = "AIzaSyCxOGGV6_bYX0Nrjd0DjEItv5bgq5K5VfM";
  const baseURL = 'https://www.googleapis.com/youtube/v3/search';

  try {
    const response = await axios.get(baseURL, {
      params: {
        part: 'snippet',
        q: searchTerm,
        type: 'video',
        maxResults: 1,
        key: API_KEY,
      },
    });

    const items = response.data.items;
    if (items.length > 0) {
      const videoId = items[0].id.videoId;
      const thumbnailUrl = items[0].snippet.thumbnails.high.url;
      res.json({ videoId, thumbnailUrl });
    } else {
      res.json({ error: 'No results found' });
    }
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    res.status(500).json({ error: 'Error fetching YouTube video' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
