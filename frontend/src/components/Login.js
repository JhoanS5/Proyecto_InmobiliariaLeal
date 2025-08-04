import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Iniciar Sesión</h2>
      <div>
        <label>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required style={{ width: '100%', marginBottom: 8 }} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required style={{ width: '100%', marginBottom: 8 }} />
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;