import { useState, useEffect } from "react";
import Card from "./components/Card";
import shuffle, { type cardType } from "./utilities/shuffle";

function App() {
  const [cards, setCards] = useState(shuffle); // Cards array from assets
  const [pickOne, setPickOne] = useState<cardType | null>(null); // First selection
  const [pickTwo, setPickTwo] = useState<cardType | null>(null); // Second selection
  const [disabled, setDisabled] = useState(false); // Delay handler
  const [wins, setWins] = useState(0); // Win streak

  const handleClick = (card: cardType) => {
    if (!disabled) pickOne ? setPickTwo(card) : setPickOne(card);
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    let pickTimer: number;

    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.image === pickOne.image ? { ...card, matched: true } : card
          );
        });

        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [pickOne, pickTwo]);

  useEffect(() => {
    for (const card of cards) {
      if (card.matched === false) return;
    }

    console.log("You win!");
    setWins(wins + 1);
    handleTurn();
    setCards(shuffle);
  }, [cards]);

  return (
    <>
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
