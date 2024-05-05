import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Header({userName}){
  return(
    <h1>Hello {userName}</h1>
  )
}

function Button({handleSubmit}){
  return (
    <button onClick={handleSubmit}>Submit</button>
  )
}

function Input({text, setText}) {
  return (
    <input value={text} onChange={(e) => setText(e.target.value)}>
    </input>
  )
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

function App() {

  function handleSubmit() {
    console.log("handleSubmit");
    setUserName(text)
    setText("")
  }

 const [userName, setUserName] = useState("Guest")
  const [text, setText] = useState('');

  return (
    <>
     <Header userName={userName}/>
     <Input text={text} setText={setText}/>
     <Button handleSubmit={handleSubmit}/>
     <MyButton/>
    </>
  )
}

export default App
