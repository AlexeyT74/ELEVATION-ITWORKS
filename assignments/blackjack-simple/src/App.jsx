import { useState } from 'react';

const STATUSES = {
  inProgress : "In Progress",
  stopped : "Stopped",
  playerWin : "Player WIN",
  playerLoose : "Player LOOSE"
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


function Desk(props) {
  console.log(props.gameStatus);
  return <h1>Game {props.gameStatus}</h1>;
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
  
  function handleDeal(){
    if (gameStatus!=STATUSES.inProgress)
      return;
    const deckCopy = [...deck];
    const card = deckCopy.pop();
    setDeck(deckCopy);
    setDeckPlayer([...deckPlayer,card]);
    console.log("deal", deckPlayer);
  }

  function handleStop(){
    if (gameStatus!=STATUSES.inProgress)
      return;
    setGameStatus(STATUSES.stopped)
    setDeckDealer([deck[0],deck[1]])
    console.log("stop", deckPlayer, deckDealer);
  }

  return (
    <>
      <Desk status={gameStatus}/>
      <Controls handleDeal={handleDeal} handleStop={handleStop}/>
    </>
  );
}

export default App;
