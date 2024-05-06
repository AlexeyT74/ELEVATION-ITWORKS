function TodoForm(props) {
//   const showRed = true;
//   const style = { marginTop: '20px' };
  return (
    <form onSubmit={props.addTodo}>
      {/* <form className="form" style={{ marginTop: '20px' }} onSubmit={props.addTodo}> */}
      <input type="text" name="title" />
      <button>Add</button>
    </form>
  );
}

export default TodoForm;
