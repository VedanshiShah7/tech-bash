// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const prompts = [
  "What are you feeling right now?",
  "Write about something that made you smile recently.",
  "Describe a challenge you’ve overcome.",
  "Who are you becoming?",
  "What does healing look like for you today?"
];

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem('solaceEntries')) || []);
  const [prompt, setPrompt] = useState(prompts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * prompts.length);
      setPrompt(prompts[index]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('solaceEntries', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => setText(e.target.value);

  const handleAnalyze = async () => {
    try {
      const response = await axios.post('https://language.googleapis.com/v1/documents:analyzeSentiment?key=YOUR_GOOGLE_API_KEY', {
        document: {
          type: 'PLAIN_TEXT',
          content: text,
        },
        encodingType: 'UTF8'
      });
      const sentimentData = response.data.documentSentiment;
      setSentiment(sentimentData);
      setEntries([...entries, { text, sentiment: sentimentData, date: new Date().toISOString() }]);
      setText('');
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (e) => setText(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className="App">
      <h1>Solace</h1>
      <p className="prompt">{prompt}</p>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Write your thoughts here..."
        style={{ paddingRight: '1rem' }}
        aria-label="Journal entry text area"
      />
      <div className="controls">
        <button onClick={handleAnalyze}>Analyze</button>
        <button onClick={handleVoiceInput}>🎤 Speak</button>
      </div>
      {sentiment && (
        <div className="sentiment">
          <h3>Emotion Analysis</h3>
          <p>Score: {sentiment.score}</p>
          <p>Magnitude: {sentiment.magnitude}</p>
        </div>
      )}
      <div className="entry-history">
        <h2>Your Reflections</h2>
        <ul>
          {entries.map((entry, idx) => (
            <li key={idx}>
              <p><strong>{new Date(entry.date).toLocaleString()}:</strong> {entry.text}</p>
              <small>Score: {entry.sentiment.score}, Magnitude: {entry.sentiment.magnitude}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
