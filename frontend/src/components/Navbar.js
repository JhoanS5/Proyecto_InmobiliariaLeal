import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const handleMenuToggle = () => setMenuOpen(prev => !prev);

  return (
    <nav
      style={{
        width: '100%',
        background: 'rgba(34,34,34,0.98)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div
        className="navbar-container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: 72,
          position: 'relative'
        }}
      >
        {/* Logo y nombre */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/LogoInmobiliaria.jpg"
            alt="Logo Inmobiliaria Leal"
            style={{
              height: 48,
              marginRight: 14,
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))'
            }}
          />
          <span
            style={{
              fontWeight: 900,
              fontSize: 24,
              letterSpacing: 2,
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            INMOBILIARIA LEAL
          </span>
        </Link>

        {/* Menú hamburguesa para móviles */}
        <button
          className="navbar-burger"
          onClick={handleMenuToggle}
          aria-label="Abrir/cerrar menú"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            marginLeft: 16,
            zIndex: 200 // Asegura que esté por encima del menú
          }}
        >
          <span style={{
            display: 'block',
            width: 28,
            height: 4,
            background: 'var(--color-accent)',
            borderRadius: 2,
            marginBottom: 5,
            transition: 'transform 0.3s'
          }} />
          <span style={{
            display: 'block',
            width: 28,
            height: 4,
            background: 'var(--color-accent)',
            borderRadius: 2,
            marginBottom: 5,
            transition: 'opacity 0.3s'
          }} />
          <span style={{
            display: 'block',
            width: 28,
            height: 4,
            background: 'var(--color-accent)',
            borderRadius: 2,
            transition: 'transform 0.3s'
          }} />
        </button>

        {/* Navegación */}
        <div
          className={`navbar-links${menuOpen ? ' open' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <NavLink to="/" label="Inicio" onClick={() => setMenuOpen(false)} />
          <NavLink to="/propiedades" label="Propiedades" onClick={() => setMenuOpen(false)} />
          <NavLink to="/nosotros" label="Nosotros" onClick={() => setMenuOpen(false)} />
          {!user && (
            <NavLink
              to="/login"
              label="Acceso empleados"
              accent
              onClick={() => setMenuOpen(false)}
            />
          )}
          {user && (
            <>
              <NavLink
                to="/dashboard"
                label="Panel"
                accent
                onClick={() => setMenuOpen(false)}
              />
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: 12,
                  background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary))',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 20px',
                  fontWeight: 700,
                  fontSize: 15,
                  boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s, box-shadow 0.15s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
                }}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 800px) {
            .navbar-container {
              padding: 0 12px !important;
            }
            .navbar-container span {
              font-size: 18px !important;
              letter-spacing: 1px !important;
            }
            .navbar-links {
              position: absolute;
              top: 72px;
              left: 0;
              width: 100vw;
              background: rgba(34,34,34,0.98);
              flex-direction: column;
              align-items: flex-start !important;
              gap: 0 !important;
              padding: 18px 0 12px 0;
              display: none;
              box-shadow: 0 8px 32px rgba(0,0,0,0.18);
              z-index: 100;
              backdrop-filter: blur(10px);
            }
            .navbar-links.open {
              display: flex !important;
            }
            .navbar-links a, .navbar-links button {
              width: 100%;
              text-align: left;
              margin: 0 !important;
              padding: 12px 24px !important;
              border-radius: 0 !important;
              font-size: 18px !important;
              background: transparent !important;
            }
            .navbar-links a:hover, .navbar-links button:hover {
              background: rgba(255,255,255,0.10) !important;
              transform: none !important;
            }
            .navbar-burger {
              display: block !important;
            }
          }
          @media (max-width: 500px) {
            .navbar-container img {
              height: 36px !important;
              margin-right: 8px !important;
            }
            .navbar-container span {
              font-size: 14px !important;
              letter-spacing: 0.5px !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

// Componente para los enlaces del navbar con efecto moderno
function NavLink({ to, label, accent, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        color: accent
          ? 'var(--color-accent)'
          : 'var(--color-white)',
        fontWeight: accent ? 700 : 500,
        fontSize: 16,
        textDecoration: 'none',
        margin: '0 10px',
        padding: '6px 14px',
        borderRadius: 6,
        background: accent
          ? 'rgba(243,112,33,0.10)'
          : 'transparent',
        transition: 'background 0.18s, color 0.18s, transform 0.15s',
        position: 'relative'
      }}
      onMouseOver={e => {
        e.currentTarget.style.background = accent
          ? 'linear-gradient(90deg, var(--color-accent), var(--color-primary))'
          : 'rgba(255,255,255,0.10)';
        e.currentTarget.style.color = 'var(--color-white)';
        e.currentTarget.style.transform = 'scale(1.07)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.background = accent
          ? 'rgba(243,112,33,0.10)'
          : 'transparent';
        e.currentTarget.style.color = accent
          ? 'var(--color-accent)'
          : 'var(--color-white)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {label}
    </Link>
  );
}

export default Navbar;