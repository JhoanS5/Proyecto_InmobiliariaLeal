import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AdminList from './AdminList';
import PropertyList from './PropertyList';
import ContactRequestList from './ContactRequestList';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [section, setSection] = useState('home');

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h2>Panel de Administración</h2>
      <p>Bienvenido, <b>{user.name}</b> ({user.role})</p>
      <button onClick={logout} style={{ marginBottom: 24 }}>Cerrar sesión</button>
      <hr />
      <div>
        <h3>Gestión</h3>
        <ul>
          {user.role === 'super_admin' && (
            <li>
              <button onClick={() => setSection('usuarios')}>Gestión de Usuarios</button>
            </li>
          )}
          <li>
            <button onClick={() => setSection('propiedades')}>Propiedades</button>
          </li>
          <li>
            <button onClick={() => setSection('solicitudes')}>Solicitudes de Contacto</button>
          </li>
        </ul>
      </div>
      <div style={{ marginTop: 32 }}>
        {section === 'usuarios' && user.role === 'super_admin' && <AdminList />}
        {section === 'propiedades' && <PropertyList />}
        {section === 'solicitudes' && <ContactRequestList />}
        {section === 'home' && <div>Selecciona una opción de gestión.</div>}
      </div>
    </div>
  );
};

export default Dashboard;