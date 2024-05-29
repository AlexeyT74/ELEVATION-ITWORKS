import { Button, Stack, TextField, Typography } from '@mui/material';

export default function LoginForm() {
  return (
    <Stack spacing={2} component={'form'}>
      <Typography variant="h4">Login with MUI</Typography>
      <TextField label="Username" variant="outlined" margin="normal" fullWidth required />
      <TextField label="Password" variant="outlined" type="password" margin="normal" fullWidth required />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Stack>
  );
}
