function Controls({ onDraw, onShuffle, onReshuffle, disabled }) {
  return (
    <div className="buttons">
      <button onClick={onDraw} disabled={disabled.draw}>Draw a Card</button>
      <button onClick={onShuffle} disabled={disabled.shuffle}>Shuffle Entire Deck</button>
      <button onClick={onReshuffle} disabled={disabled.shuffle}>Shuffle Remaining Cards</button>
    </div>
  );
}

export default Controls;
