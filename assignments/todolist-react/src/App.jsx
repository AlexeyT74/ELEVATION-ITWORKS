import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Todolist from './components/todolist';
import TodoForm from './components/todoform';
import { todoFactory } from './components/todolist';

function App() {
  const [todos, setTodos] = useState([todoFactory("First")]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputValue = formData.get('title');
    setTodos(todoFactory(inputValue));
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
