import React, { useState } from 'react';
import axios from 'axios';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { text });

      // Assuming the response contains sentiment as "POSITIVE" or "NEGATIVE"
      setSentiment(response.data.sentiment);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);  // Log the error
      setError('Failed to fetch sentiment analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {sentiment && <p>Sentiment: {sentiment}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SentimentAnalysis;
