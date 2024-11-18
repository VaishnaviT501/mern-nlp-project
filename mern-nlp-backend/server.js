const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = 5000;

// Enable CORS for your React app
app.use(cors());  // Allow all origins, or restrict to 'http://localhost:3000'

// Parse incoming requests with JSON payload
app.use(express.json());

// MongoDB Connection URI
const mongoURI = 'mongodb://localhost:27017';  // Replace with your MongoDB URI if needed
const dbName = 'sentimentAnalysisDB';  // Database name
let db;

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('MongoDB connection error:', error));

// Sentiment Analysis Route
app.post('/api/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    // Forward the request to Flask backend for sentiment analysis
    const response = await axios.post('http://127.0.0.1:5001/analyze', { text });

    console.log('Flask response:', response.data);  // Log the full response from Flask

    // Check if 'analysis' exists and handle it
    if (!response.data || !response.data.analysis) {
      return res.status(500).json({ error: 'Invalid response from Flask' });
    }

    const sentiment = response.data.analysis.toUpperCase(); // "POSITIVE" or "NEGATIVE"
    const score = response.data.score;

    // Save the sentiment analysis result to MongoDB
    const sentimentData = {
      text: text,
      sentiment: sentiment,
      score: score,
      date: new Date(),  // Add a date for when the analysis was performed
    };

    // Insert the data into MongoDB
    const collection = db.collection('sentiments');
    await collection.insertOne(sentimentData);

    // Send back the sentiment analysis result to the React frontend
    res.json({
      sentiment: sentiment,  // Sentiment as "POSITIVE" or "NEGATIVE"
    });
  } catch (error) {
    console.error('Error forwarding request to Flask:', error.message);
    res.status(500).json({ error: 'Failed to process sentiment analysis' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
