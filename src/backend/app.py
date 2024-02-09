from flask import Flask, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app)

def get_headlines_with_paragraphs():
    url = 'https://en.wikipedia.org/wiki/Basketball_moves'
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    content_div = soup.find('div', id='mw-content-text')
    
    # Find all headlines and their corresponding <p> tags
    headlines_with_paragraphs = []
    for headline in content_div.find_all('span', class_='mw-headline'):
        headline_text = headline.text.strip()
        p_tag = headline.find_next('p')
        if p_tag:
            p_text = p_tag.text.strip()
        else:
            p_text = "No paragraph found"
        headlines_with_paragraphs.append({'headline': headline_text, 'paragraph': p_text})
    
    return headlines_with_paragraphs

@app.route('/api/headlines', methods=['GET'])
def api_headlines():
    headlines_with_paragraphs = get_headlines_with_paragraphs()
    return jsonify({'headlines': headlines_with_paragraphs})

if __name__ == '__main__':
    app.run(debug=True)
