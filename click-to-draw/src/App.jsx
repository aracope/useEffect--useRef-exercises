// File: src/App.jsx
import { useState, useEffect, useRef } from 'react';
import './App.css';
import CardArea from './components/CardArea';
import Controls from './components/Controls';
import Message from './components/Message';

function App() {
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(52);
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    async function fetchDeck() {
      try {
        const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await res.json();
        setDeckId(data.deck_id);
        setRemaining(data.remaining);
        setCards([]);
        setMessageWithTimeout('New deck created and shuffled!');
      } catch (err) {
        setMessageWithTimeout('Error initializing deck.');
      }
    }
    fetchDeck();
  }, []);

  async function handleDraw() {
    try {
      if (!deckId) return;
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await res.json();

      if (data.success && data.cards.length > 0) {
        setCards((cards) => [...cards, data.cards[0]]);
        setRemaining(data.remaining);
        if (data.remaining === 0) {
          setMessageWithTimeout('No cards left to draw!');
        }
      } else {
        alert('Error: no cards remaining!');
      }
    } catch (err) {
      setMessageWithTimeout('Error drawing card.');
    }
  }

  async function handleShuffleFull() {
    setIsShuffling(true);
    try {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      const data = await res.json();
      if (data.success) {
        setRemaining(52);
        setCards([]);
        setMessageWithTimeout('Deck fully shuffled!');
      }
    } catch (err) {
      setMessageWithTimeout('Error shuffling deck.');
    } finally {
      setIsShuffling(false);
    }
  }

  async function handleReshuffleRemaining() {
    if (remaining === 0) {
      setMessageWithTimeout('No cards to reshuffle!');
      return;
    }
    setIsShuffling(true);
    try {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`);
      const data = await res.json();
      if (data.success) {
        setCards([]);
        setMessageWithTimeout('Remaining cards reshuffled!');
      }
    } catch (err) {
      setMessageWithTimeout('Error reshuffling deck.');
    } finally {
      setIsShuffling(false);
    }
  }

  function setMessageWithTimeout(msg) {
    setMessage(msg);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div className="App">
      <h1>Draw a Card</h1>
      <Message text={message} />
      <Controls
        onDraw={handleDraw}
        onShuffle={handleShuffleFull}
        onReshuffle={handleReshuffleRemaining}
        disabled={{ draw: remaining === 0 || isShuffling, shuffle: isShuffling }}
      />
      <CardArea cards={cards} />
    </div>
  );
}

export default App;
