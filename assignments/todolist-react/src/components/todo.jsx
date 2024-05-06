function Todo({ todo }) {
  console.log(todo.date);
  return (
    <li key={todo.id} className="todo">
      <div>Title: {todo.title}</div>
      <div>Date: {todo.date.toLocaleDateString()}</div>
    </li>
  );
}

export default Todo;
