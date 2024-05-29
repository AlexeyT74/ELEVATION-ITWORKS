import { AppBar, Box, Container, Toolbar } from '@mui/material';
import LoginForm from './LoginForm.tsx'

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>AppBar</Toolbar>
      </AppBar>
      <Box pt={10} display="flex" justifyContent="center" alignContent="center">
        <LoginForm />
      </Box>
    </>
  );
}

export default App;
