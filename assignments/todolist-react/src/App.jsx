import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Todolist from './components/todolist';
import TodoForm from './components/todoform';
import { todoFactory } from './components/todolist';

function App() {
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let inputValue = formData.get('title');
    inputValue.trim();
    if (inputValue.length) {
      const tempTodos = [...todos, todoFactory(inputValue)];
      setTodos(tempTodos);
      e.target.reset();
    }
  };

  return (
    <>
      <h1>Hello Todo from React</h1>
      <TodoForm addTodo={handleSubmit} />
      <Todolist todos={todos} />
    </>
  );
}

export default App;
