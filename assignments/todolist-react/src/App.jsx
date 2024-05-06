import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todolist from './components/todolist'
import TodoForm from './components/todoform'

function App() {
  const [count, setCount] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputValue = formData.get('input');
  };

  return (
    <>
    <h1>Hello Todo from React</h1>
    <TodoForm addTodo={handleSubmit}/>
    <Todolist/>
  </>
  )
}

export default App
