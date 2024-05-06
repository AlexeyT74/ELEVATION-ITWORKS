function Todolist({ todos }) {
  console.log('Todolist', todos);
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>Title: {todo.title}</span>
          <span>Date: {todo.date}</span>
        </li>
      ))}
    </ul>
  );
}

function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  );
}

export function todoFactory(title) {
  return {
    title,
    id: uuidv4(),
    done: false,
    date: Date.now(),
  };
}

export default Todolist;
