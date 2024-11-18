import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.107:5001/analyze', // Flask API base URL
});

const analyzeText = (text) => {
  api.post('/analyze', { text })  // This should hit the /analyze endpoint
    .then(response => console.log(response.data))  // Log the response data
    .catch(error => console.error('Error:', error));
};

// Example usage
analyzeText('your text here');
