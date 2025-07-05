import Card from './Card';

function CardArea({ cards }) {
  return (
    <div id="card-area">
      {cards.map((card, idx) => (
        <Card key={idx} image={card.image} code={card.code} />
      ))}
    </div>
  );
}

export default CardArea;
