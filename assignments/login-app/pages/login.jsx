function Login({handleSubmit}){
    return <form onSubmit={handleSubmit}>
    <h1>Login</h1>
    <input type="name" name="name"></input>
    <input type="password" name="password"></input>
    <button type="submit">Submit</button>
    </form>
}

export default Login;