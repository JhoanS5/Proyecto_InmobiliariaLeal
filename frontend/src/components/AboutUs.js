import React from 'react';

const valores = [
  { icon: "🔍", label: "Transparencia" },
  { icon: "🤝", label: "Compromiso" },
  { icon: "🤗", label: "Confianza" },
  { icon: "💡", label: "Innovación" },
  { icon: "🌱", label: "Responsabilidad" },
];

const AboutUs = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #e0e7ef 0%, #f7f9fb 100%)',
    padding: '60px 0'
  }}>
    <div style={{
      maxWidth: 700,
      margin: '0 auto',
      padding: 36,
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 6px 32px rgba(0,0,0,0.10)',
      border: '1px solid #e0e7ef'
    }}>
      <h2 style={{
        color: '#0a2240',
        marginBottom: 18,
        fontWeight: 900,
        fontSize: 32,
        letterSpacing: 1
      }}>
        Sobre Nosotros
      </h2>
      <h3 style={{
        color: '#10b981',
        marginBottom: 8,
        fontWeight: 700,
        fontSize: 22
      }}>Misión</h3>
      <p style={{ marginBottom: 28, color: '#222', fontSize: 17, lineHeight: 1.7 }}>
        Nos dedicamos a ofrecer un conjunto completo de servicios inmobiliarios y de construcción, gestionando y ejecutando proyectos de alta calidad que abarcan desde ventas y alquileres hasta hipotecas, avalúos y trámites notariales. Nuestro objetivo es proporcionar soluciones innovadoras y eficientes que no solo mejoren la calidad de vida de nuestros clientes, sino que también contribuyan al desarrollo sostenible de las comunidades en las que operamos. Creemos en la importancia de la innovación, la eficiencia y el compromiso con la comunidad, y trabajamos con un enfoque ético y responsable en todos nuestros proyectos.
      </p>
      <h3 style={{
        color: '#10b981',
        marginBottom: 8,
        fontWeight: 700,
        fontSize: 22
      }}>Visión</h3>
      <p style={{ marginBottom: 28, color: '#222', fontSize: 17, lineHeight: 1.7 }}>
        Ser reconocidos como la empresa líder en el sector inmobiliario y de construcción, destacándonos por nuestra capacidad de ofrecer soluciones integrales, innovadoras y sostenibles que superen las expectativas de nuestros clientes. Nos comprometemos a impulsar el desarrollo tecnológico y la sostenibilidad en todos nuestros proyectos, con el objetivo de contribuir positivamente al entorno y a las comunidades donde operamos. Aspiramos a crear un entorno de trabajo colaborativo y de desarrollo continuo, posicionándonos como un referente de calidad y excelencia en la industria.
      </p>
      <h3 style={{
        color: '#10b981',
        marginBottom: 12,
        fontWeight: 700,
        fontSize: 22
      }}>Valores</h3>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 18
      }}>
        {valores.map((v, i) => (
          <li key={i} style={{
            background: '#e0e7ef',
            borderRadius: 10,
            padding: '10px 18px',
            fontWeight: 600,
            color: '#2563eb',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)'
          }}>
            <span style={{ fontSize: 20 }}>{v.icon}</span> {v.label}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AboutUs;