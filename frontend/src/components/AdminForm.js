import React, { useState } from 'react';
import api from '../services/api';

const AdminForm = ({ onSuccess, adminToEdit, onCancel }) => {
  const [name, setName] = useState(adminToEdit ? adminToEdit.name : '');
  const [email, setEmail] = useState(adminToEdit ? adminToEdit.email : '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isEdit = !!adminToEdit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await api.put(`/users/${adminToEdit.id}`, { name, email, password: password || undefined, role: 'admin' });
      } else {
        await api.post('/users/register', { name, email, password, role: 'admin' });
      }
      onSuccess();
    } catch (err) {
      setError('Error al guardar el administrador');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h4>{isEdit ? 'Editar Administrador' : 'Crear Administrador'}</h4>
      <div>
        <label>Nombre:</label>
        <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
      </div>
      <div>
        <label>Correo:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 8 }}
          placeholder={isEdit ? 'Dejar en blanco para no cambiar' : ''}
          required={!isEdit}
        />
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" style={{ marginRight: 8 }}>{isEdit ? 'Actualizar' : 'Crear'}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default AdminForm;