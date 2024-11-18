from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the Hugging Face pre-trained model and tokenizer
model_name = "distilbert-base-uncased-finetuned-sst-2-english"  # Correct model path
sentiment_analysis = pipeline("sentiment-analysis", model=model_name)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the NLP API!"})

@app.route('/analyze', methods=['POST'])
def analyze():
    # Get JSON data from the request
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Perform sentiment analysis using the Hugging Face model
    result = sentiment_analysis(text)

    # Extract the sentiment label and score
    sentiment = result[0]['label']  # Sentiment label (e.g., POSITIVE or NEGATIVE)
    score = result[0]['score']  # Confidence score

    # Return the sentiment analysis result
    return jsonify({'analysis': sentiment, 'score': score})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
