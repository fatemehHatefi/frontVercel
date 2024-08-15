'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Alert } from 'react-bootstrap'; // Import Alert for error messages
import styles from './form.module.css'; // Import custom styles

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Login successful:', result.token);
        localStorage.setItem('userToken', result.token);
        localStorage.setItem('userEmail', email);
        
        window.location.href = '/'; // Force full page reload
      } else {
        console.error('Login error:', result.message);
        setErrorMessage(result.message || 'Failed to log in. Please try again.'); // Set error message
      }
    } catch (error) {
      console.error('Server error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.'); // Set error message
    }
  };

  return (
    <Form onSubmit={handleLogin} className={styles.form}>
      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
