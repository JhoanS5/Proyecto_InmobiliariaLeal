import React from 'react';

const AboutUs = () => (
  <div style={{
    maxWidth: 700,
    margin: '40px auto',
    padding: 24,
    background: '#f7f9fb',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  }}>
    <h2 style={{ color: '#002147', marginBottom: 16 }}>Nosotros</h2>
    <h3 style={{ color: '#f5a623', marginBottom: 8 }}>Misión</h3>
    <p style={{ marginBottom: 24 }}>
      Nos dedicamos a ofrecer un conjunto completo de servicios inmobiliarios y de construcción, gestionando y ejecutando proyectos de alta calidad que abarcan desde ventas y alquileres hasta hipotecas, avalúos y trámites notariales. Nuestro objetivo es proporcionar soluciones innovadoras y eficientes que no solo mejoren la calidad de vida de nuestros clientes, sino que también contribuyan al desarrollo sostenible de las comunidades en las que operamos. Creemos en la importancia de la innovación, la eficiencia y el compromiso con la comunidad, y trabajamos con un enfoque ético y responsable en todos nuestros proyectos.
    </p>
    <h3 style={{ color: '#f5a623', marginBottom: 8 }}>Visión</h3>
    <p style={{ marginBottom: 24 }}>
      Ser reconocidos como la empresa líder en el sector inmobiliario y de construcción, destacándonos por nuestra capacidad de ofrecer soluciones integrales, innovadoras y sostenibles que superen las expectativas de nuestros clientes. Nos comprometemos a impulsar el desarrollo tecnológico y la sostenibilidad en todos nuestros proyectos, con el objetivo de contribuir positivamente al entorno y a las comunidades donde operamos. Aspiramos a crear un entorno de trabajo colaborativo y de desarrollo continuo, posicionándonos como un referente de calidad y excelencia en la industria.
    </p>
    <h3 style={{ color: '#f5a623', marginBottom: 8 }}>Valores</h3>
    <ul style={{ marginLeft: 24, marginBottom: 0 }}>
      <li>Transparencia</li>
      <li>Compromiso</li>
      <li>Confianza</li>
      <li>Innovación</li>
      <li>Responsabilidad</li>
    </ul>
  </div>
);

export default AboutUs;