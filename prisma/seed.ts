import {db} from "../src/utils/db.server"

interface Headline {
    name: string;
    description: string;
}
  
  interface ApiResponse {
    headlines: Headline[];
}

const fetchHeadlines = async (): Promise<Headline[]> => {
    try {
      const response = await fetch('http://localhost:3000/headlines');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ApiResponse = await response.json();
      return data.headlines;
    } catch (error) {
      console.error('There was a problem fetching the headlines:', error);
      return [];
    }
  };

async function seed() {
    const headlines = await fetchHeadlines();
    await Promise.all(
      headlines.map(headline => 
        db.basketballMoveCards.create({
          data: {
            name: headline.name,
            description: headline.description,
          },
        })
      )
    );
  }
  
  // Call seed function and handle possible errors
  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await db.$disconnect();
    });