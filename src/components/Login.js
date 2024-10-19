import React, { useState } from 'react';
import { login, signup, setToken } from '../api/api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Paper,
} from '@mui/material';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await login(email, password);
        setToken(response.data.access_token); // Save the token in localStorage
        alert('Login successful!');
        onLoginSuccess(); // Notify the App component that the user has logged in
      } else {
        await signup(email, password);
        const response = await login(email, password);
        setToken(response.data.access_token); // Save the token in localStorage
        onLoginSuccess(); // Notify the App component that the user has logged in
      }
      localStorage.setItem('email', email);
    } catch (error) {
      alert(`${isLogin ? 'Login' : 'Sign up'} failed!`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center">
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item>
            <Typography variant="body1">
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <Link
                    component="span"
                    onClick={() => setIsLogin(false)}
                    style={{ cursor: 'pointer', color: '#1976d2' }}
                  >
                    Sign up here
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link
                    component="span"
                    onClick={() => setIsLogin(true)}
                    style={{ cursor: 'pointer', color: '#1976d2' }}
                  >
                    Log in here
                  </Link>
                </>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Login;
