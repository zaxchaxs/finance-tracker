"use client"
import { useState } from 'react';
import { loginWithEmailAndPassword } from '../../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginWithEmailAndPassword(email, password);
      console.log('Login successful:', user);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className='text-black' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input className='text-black' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
