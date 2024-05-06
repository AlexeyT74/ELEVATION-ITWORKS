function Todo({ todo }) {
  return (
    <li key={todo.id}>
      <div>Title: {todo.title}</div>
      <div>Date: {todo.date.toLocaleString()}</div>
    </li>
  );
}

export default Todo;
