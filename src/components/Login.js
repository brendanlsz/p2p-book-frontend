import React, { useState } from 'react';
import { login, signup, setToken } from '../api/api';

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
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <span onClick={() => setIsLogin(false)} style={{ cursor: 'pointer', color: 'blue' }}>
              Sign up here
            </span>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <span onClick={() => setIsLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}>
              Log in here
            </span>
          </>
        )}
      </p>
    </div>
  );
}

export default Login;
