function Card({ image, code }) {
  const angle = Math.random() * 30 - 15;
  const x = Math.random() * 30 - 15;
  const y = Math.random() * 30 - 15;

  const style = {
    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${x}px, ${y}px)`
  };

  return <img src={image} alt={code} className="pile-card" style={style} />;
}

export default Card;
