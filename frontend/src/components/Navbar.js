import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      padding: '16px 32px',
      background: '#002147',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 22 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          Inmobiliaria Leal
        </Link>
      </div>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: 20, textDecoration: 'none' }}>Inicio</Link>
        <Link to="/propiedades" style={{ color: '#fff', marginRight: 20, textDecoration: 'none' }}>Propiedades</Link>
        <Link to="/nosotros" style={{ color: '#fff', marginRight: 20, textDecoration: 'none' }}>Nosotros</Link>
        {!user && (
          <Link to="/login" style={{ color: '#f5a623', fontWeight: 'bold', textDecoration: 'none' }}>
            Acceso empleados
          </Link>
        )}
        {user && (
          <>
            <Link to="/dashboard" style={{ color: '#f5a623', fontWeight: 'bold', marginLeft: 16, textDecoration: 'none' }}>
              Panel
            </Link>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: 16,
                background: 'transparent',
                color: '#fff',
                border: '1px solid #f5a623',
                borderRadius: 6,
                padding: '6px 14px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;