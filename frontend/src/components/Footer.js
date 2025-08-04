import React from 'react';

const Footer = () => (
  <footer
    style={{
      background: 'var(--color-dark)',
      color: 'var(--color-white)',
      padding: '32px 0 16px 0',
      marginTop: 40,
      borderTop: '4px solid var(--color-accent)',
      width: '100%',
    }}
  >
    <div
      className="footer-container"
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '0 32px',
      }}
    >
      {/* Logo e info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 220 }}>
        <img
          src="/LogoInmobiliaria.jpg"
          alt="Logo Inmobiliaria Leal"
          style={{
            height: 48,
            background: 'white',
            borderRadius: 8,
            padding: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          }}
        />
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: 2,
              color: 'var(--color-primary)',
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            INMOBILIARIA LEAL
          </div>
          <div style={{ fontSize: 14, color: 'var(--color-gray)' }}>
            &copy; {new Date().getFullYear()} Todos los derechos reservados
          </div>
        </div>
      </div>
      {/* Contacto y redes */}
      <div style={{ textAlign: 'right', minWidth: 220 }}>
        <div style={{ fontSize: 15, marginBottom: 6 }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Contacto:</span> <br />
          <span>
            Tel: <a href="tel:+573001234567" style={{ color: 'var(--color-white)' }}>+57 321 3656521</a>
          </span>
          <br />
          <span>
            Email:{' '}
            <a href="mailto:info@lealinmobiliaria.com" style={{ color: 'var(--color-white)' }}>
              info@lealinmobiliaria.com
            </a>
          </span>
        </div>
        <div style={{ marginTop: 8 }}>
          <a href="https://wa.me/573213656521" target="_blank" rel="noopener noreferrer" style={{ marginRight: 12 }}>
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
              alt="WhatsApp"
              style={{ height: 22, verticalAlign: 'middle', filter: 'invert(1)' }}
            />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ marginRight: 12 }}>
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
              alt="Facebook"
              style={{ height: 22, verticalAlign: 'middle', filter: 'invert(1)' }}
            />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
              alt="Instagram"
              style={{ height: 22, verticalAlign: 'middle', filter: 'invert(1)' }}
            />
          </a>
        </div>
      </div>
    </div>
    {/* Responsive styles */}
    <style>
      {`
        @media (max-width: 700px) {
          .footer-container {
            flex-direction: column;
            align-items: flex-start !important;
            text-align: left !important;
            gap: 18px !important;
            padding: 0 16px !important;
          }
          .footer-container > div {
            min-width: 0 !important;
            width: 100% !important;
          }
        }
      `}
    </style>
  </footer>
);

export default Footer;