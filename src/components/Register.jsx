"use client"
import { useState } from "react"
import { registerWithEmailAndPassword } from "../../utils/auth";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const user = await registerWithEmailAndPassword(email, password);
        console.log('Registration successful:', user);
      } catch (error) {
        console.error('Registration failed:', error.message);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input className='text-black' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className='text-black' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    );
};

export default Register;