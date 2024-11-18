import logo from './logo.svg';  // Add this line at the top of App.js
import './App.css';
import SentimentAnalysis from './components/SentimentAnalysis';  // Import SentimentAnalysis component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />  {/* Logo is now correctly imported */}
        <h1>React NLP Sentiment Analysis</h1>
      </header>
      <main>
        {/* SentimentAnalysis component is rendered here */}
        <SentimentAnalysis />
      </main>
    </div>
  );
}

export default App;
