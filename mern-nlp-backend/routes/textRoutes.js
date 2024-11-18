const axios = require('axios');

// POST route for text analysis
router.post('/analyze', async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    // Call the Flask NLP API running on port 5001
    const response = await axios.post('http://127.0.0.1:5001/analyze', { text });

    // Extract the sentiment analysis result from the Flask API response
    const sentiment = response.data.analysis;  // Assuming Flask returns { "analysis": "positive" }
    
    // Return the result to the client
    res.json({ text, sentiment });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
