import React, { useState } from 'react';
import api from '../services/api';

const PublicContactForm = ({ propertyId }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/contacts', { ...form, propertyId });
      setSuccess('¡Solicitud enviada correctamente!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Error al enviar la solicitud');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 420,
        margin: '0 auto',
        padding: 28,
        border: '1px solid #e0e7ef',
        borderRadius: 14,
        background: '#f9fafb',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#0a2240', fontWeight: 800, marginBottom: 18 }}>
        Solicitar información
      </h3>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Nombre:</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            marginTop: 4,
            marginBottom: 8,
            padding: 10,
            borderRadius: 7,
            border: '1px solid #cbd5e1',
            fontSize: 15,
            background: '#fff'
          }}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Email:</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            marginTop: 4,
            marginBottom: 8,
            padding: 10,
            borderRadius: 7,
            border: '1px solid #cbd5e1',
            fontSize: 15,
            background: '#fff'
          }}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Teléfono:</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            marginTop: 4,
            marginBottom: 8,
            padding: 10,
            borderRadius: 7,
            border: '1px solid #cbd5e1',
            fontSize: 15,
            background: '#fff'
          }}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Mensaje:</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          style={{
            width: '100%',
            marginTop: 4,
            marginBottom: 8,
            padding: 10,
            borderRadius: 7,
            border: '1px solid #cbd5e1',
            fontSize: 15,
            background: '#fff',
            resize: 'vertical'
          }}
        />
      </div>
      {error && <div style={{ color: '#e11d48', marginBottom: 10, textAlign: 'center' }}>{error}</div>}
      {success && <div style={{ color: '#059669', marginBottom: 10, textAlign: 'center' }}>{success}</div>}
      <button
        type="submit"
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #2563eb, #10b981)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 16,
          border: 'none',
          borderRadius: 8,
          padding: '12px 0',
          marginTop: 8,
          cursor: 'pointer',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          letterSpacing: 0.5
        }}
      >
        Enviar Solicitud
      </button>
    </form>
  );
};

export default PublicContactForm;