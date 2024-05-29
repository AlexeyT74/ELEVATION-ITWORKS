import { Alert, Button, Card, TextField, Typography } from '@mui/material';

export default function LoginForm() {
  return (
    <Card component={'form'} sx={{p:'15px'}} >
      <Typography variant="h4">Login with MUI</Typography>
      <TextField label="Username" variant="outlined" margin="normal" fullWidth required />
      <TextField label="Password" variant="outlined" type="password" margin="normal" fullWidth required />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Alert severity="error" variant="outlined" sx={{mt:'15px'}}>Something gone wrong</Alert>
    </Card>
  );
}
