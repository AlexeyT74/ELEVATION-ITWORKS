import { useState, useEffect } from 'react';

const STATUSES = {
  inProgress: 'In Progress',
  stopped: 'Stopped',
  playerWin: 'Player WIN',
  playerLoose: 'Player LOOSE',
};

const NAMES = {
  player: "Player",
  dealer: "Dealer"
}

function buildDeck() {
  const fullSuites = ['♠', '♥', '♦', '♣'];

  const deck = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      deck.push({ type: fullSuites[i], value: j });
    }
  }

  return deck;
}

// a fn thats shuffles the deck
function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

function countDeck(deck) {
  return deck.reduce((acc, card) => acc + card.value, 0);
}

function verify(deck) {
  return countDeck(deck) >= 21;
}

function Hand({ deck, handName }) {
  useEffect(() => {
    console.log(deck.length);
  });

  if (deck.length == 0) return <></>;
  else
    return (
      <>
        <h3>Deck {handName}</h3>
        <ul>
          {deck.map((card) => (
            <li key={card.value}>
              {card.value}
              {card.type}
            </li>
          ))}
        </ul>
      </>
    );
}

function Desk(props) {
  useEffect(() => {
    console.log(props.status);
  });

  return (
    <>
      <h1>Game {props.status}</h1>
      <Hand deck={props.deckPlayer} handName={NAMES.player} />
      <Hand deck={props.deckDealer} handName={NAMES.dealer} />
    </>
  );
}

function Controls(props) {
  return (
    <>
      <button onClick={props.handleDeal}>Deal</button>
      <button onClick={props.handleStop}>Stop</button>
    </>
  );
}

function App() {
  const [deck, setDeck] = useState(shuffleDeck(buildDeck()));
  const [deckPlayer, setDeckPlayer] = useState([]);
  const [deckDealer, setDeckDealer] = useState([]);
  const [gameStatus, setGameStatus] = useState(STATUSES.inProgress);

  useEffect(() => {
    const playerHand = countDeck(deckPlayer);
    const dealerHand = countDeck(deckDealer);
    if (playerHand == 21) setGameStatus(STATUSES.playerWin);
    else if (playerHand > 21) setGameStatus(STATUSES.playerLoose);
    else if (gameStatus == STATUSES.stopped) {
      // Stop Buttom pressed
      // playerHand < 21
      if (dealerHand > 21 || playerHand > dealerHand) setGameStatus(STATUSES.playerWin);
      else setGameStatus(STATUSES.playerLoose);
    }
    console.log('player', deckPlayer, countDeck(deckPlayer));
    console.log('dealer', deckDealer, countDeck(deckDealer));
  });

  function handleDeal() {
    if (gameStatus != STATUSES.inProgress) return;
    const deckCopy = [...deck];
    const card = deckCopy.pop();
    setDeck(deckCopy);
    setDeckPlayer([...deckPlayer, card]);
  }

  function handleStop() {
    if (gameStatus != STATUSES.inProgress) return;
    setGameStatus(STATUSES.stopped);
    setDeckDealer([deck[0], deck[1]]);
  }

  return (
    <>
      <Desk status={gameStatus} deckPlayer={deckPlayer} deckDealer={deckDealer} />
      <Controls handleDeal={handleDeal} handleStop={handleStop} />
    </>
  );
}

export default App;
