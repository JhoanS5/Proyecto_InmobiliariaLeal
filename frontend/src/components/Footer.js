import React from 'react';

const Footer = () => (
  <footer style={{
    background: '#002147',
    color: '#fff',
    padding: '24px 0',
    textAlign: 'center',
    marginTop: 40
  }}>
    <div style={{ marginBottom: 8 }}>
      <b>Inmobiliaria Leal</b> &nbsp;|&nbsp; 
      <span>Tel: +57 3213656521</span> &nbsp;|&nbsp; 
      <span>Email: info@inmobiliarialeal.com</span>
    </div>
    <div style={{ fontSize: 14 }}>
      © {new Date().getFullYear()} Inmobiliaria Leal. Todos los derechos reservados.
    </div>
  </footer>
);

export default Footer;