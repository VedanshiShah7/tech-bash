import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const prompts = [
  "What's something beautiful you noticed recently?",
  "Who are you becoming?",
  "What do you need to let go of?",
  "When did you feel most alive this week?",
  "What is something you're proud of?",
  "What emotion needs space right now?",
  "What memory brings you peace?",
];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function App() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [appTheme, setAppTheme] = useState('light');
  const [drawing, setDrawing] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [customAgent, setCustomAgent] = useState('Poetic Friend');
  const canvasRef = useRef(null);

  useEffect(() => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    try {
      const response = await axios.post(
        `https://language.googleapis.com/v1/documents:analyzeSentiment?key=YOUR_GOOGLE_API_KEY`,
        {
          document: { type: 'PLAIN_TEXT', content: text },
          encodingType: 'UTF8',
        }
      );

      const sentimentResult = response.data.documentSentiment;
      setSentiment(sentimentResult);

      const newEntry = {
        text,
        sentiment: sentimentResult,
        date: new Date().toISOString(),
        drawing: null,
      };

      setEntries([newEntry, ...entries]);
      setText('');
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

      setAppTheme(
        sentimentResult.score >= 0.2 ? 'positive' : sentimentResult.score <= -0.2 ? 'negative' : 'neutral'
      );
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
      alert("Couldn't analyze. Check your API key or try again later.");
    }
  };

  const handleSave = () => {
    if (!text.trim() && !drawing) return;

    const canvas = canvasRef.current;
    const drawingData = canvas ? canvas.toDataURL() : null;

    const newEntry = {
      text,
      sentiment: null,
      date: new Date().toISOString(),
      drawing: drawingData,
    };

    setEntries([newEntry, ...entries]);
    setText('');
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    clearCanvas();
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setText((prev) => prev + ' ' + speechText);
    };

    recognition.onerror = (event) => {
      console.error('Voice input error:', event.error);
    };
  };

  const handleNewPrompt = () => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  const startDrawing = () => {
    setDrawing(true);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const drawOnCanvas = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const toggleCanvas = () => {
    setShowCanvas(!showCanvas);
  };

  const handleAgentChange = (e) => {
    setCustomAgent(e.target.value);
  };

  return (
    <div className={`App ${appTheme}`}>
      <header>
        <h1>solace</h1>
        <p className="tagline">A space to reflect, feel, and grow with {customAgent}.</p>
        <select value={customAgent} onChange={handleAgentChange} aria-label="Choose your voice agent">
          <option value="Poetic Friend">Poetic Friend</option>
          <option value="Creative Guide">Creative Guide</option>
          <option value="Future Self">Future Self</option>
        </select>
      </header>

      <main>
        <section className="journal-section">
          <p className="prompt">
            <em>{prompt}</em>
          </p>

          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Let your thoughts flow..."
            aria-label="Journaling input"
            style={{ paddingRight: '1rem' }}
          />

          <div className="controls">
            <button onClick={handleAnalyze}>Analyze</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleVoiceInput}>🎤 Speak</button>
            <button onClick={handleNewPrompt}>🔄 New Prompt</button>
            <button onClick={toggleCanvas}>✏️ Draw</button>
          </div>

          {sentiment && (
            <div className="sentiment">
              <p>
                🧠 Sentiment Score: <strong>{sentiment.score.toFixed(2)}</strong>
              </p>
              <p>
                ❤️ Emotional Magnitude: <strong>{sentiment.magnitude.toFixed(2)}</strong>
              </p>
            </div>
          )}
        </section>

        {showCanvas && (
          <section className="drawing-section">
            <h2>Draw Your Reflection</h2>
            <canvas
              ref={canvasRef}
              width="400"
              height="400"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={drawOnCanvas}
              style={{ border: '1px solid black', marginLeft: '20px' }}
            ></canvas>
            <div className="drawing-controls">
              <button onClick={clearCanvas}>Clear Drawing</button>
            </div>
          </section>
        )}

        <section className="entry-history">
          <h2>Reflection History</h2>
          {entries.length === 0 ? (
            <p>No entries yet. Your journey starts now.</p>
          ) : (
            <ul>
              {entries.map((entry, idx) => (
                <li key={idx}>
                  <p><strong>{new Date(entry.date).toLocaleString()}</strong></p>
                  <p>{entry.text}</p>
                  <small>Sentiment: {entry.sentiment ? entry.sentiment.score.toFixed(2) : 'N/A'} | Magnitude: {entry.sentiment ? entry.sentiment.magnitude.toFixed(2) : 'N/A'}</small>
                  {entry.drawing && (
                    <div>
                      <img src={entry.drawing} alt="Drawing" width="100" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
