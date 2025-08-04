import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div
    style={{
      minHeight: '80vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: 'linear-gradient(135deg, var(--color-dark) 60%, var(--color-primary) 100%)',
      paddingTop: 60,
      paddingBottom: 40,
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Hero */}
    <div
      style={{
        background: 'rgba(255,255,255,0.97)',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: '48px 36px 36px 36px',
        textAlign: 'center',
        maxWidth: 520,
        marginBottom: 56,
        position: 'relative',
        zIndex: 2
      }}
    >
      <img
        src="/LogoInmobiliaria.jpg"
        alt="Logo Inmobiliaria Leal"
        style={{
          height: 100,
          marginBottom: 18,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))'
        }}
      />
      <h1
        style={{
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 900,
          fontSize: 36,
          letterSpacing: 2,
          marginBottom: 10
        }}
      >
        Bienvenido a Inmobiliaria Leal
      </h1>
      <p style={{ color: 'var(--color-gray)', fontSize: 20, marginBottom: 32 }}>
        Tu mejor opción para comprar, vender o alquilar propiedades en la región.
      </p>
      <Link to="/propiedades">
        <button
          style={{
            background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary))',
            color: 'var(--color-white)',
            fontWeight: 700,
            fontSize: 20,
            border: 'none',
            borderRadius: 8,
            padding: '14px 38px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
            transition: 'transform 0.15s, box-shadow 0.15s',
            cursor: 'pointer'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.04)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
          }}
        >
          Ver Propiedades
        </button>
      </Link>
    </div>

    {/* Presentación */}
    <section
      style={{
        maxWidth: 900,
        textAlign: 'center',
        marginBottom: 48,
        color: 'var(--color-white)',
        zIndex: 2
      }}
    >
      <h2
        style={{
          fontWeight: 800,
          fontSize: 28,
          marginBottom: 14,
          background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        ¿Por qué elegirnos?
      </h2>
      <p style={{ fontSize: 18, color: 'var(--color-white)', opacity: 0.92 }}>
        Somos una empresa con amplia experiencia en el sector inmobiliario y de la construcción.<br />
        Ofrecemos asesoría personalizada, transparencia y acompañamiento en todo el proceso de compra, venta o alquiler de tu propiedad.
      </p>
    </section>

    {/* Ventajas */}
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 36,
        justifyContent: 'center',
        marginBottom: 40,
        zIndex: 2
      }}
    >
      {[
        {
          title: 'Atención personalizada',
          desc: 'Te acompañamos en cada paso para que tomes la mejor decisión.'
        },
        {
          title: 'Variedad de propiedades',
          desc: 'Casas, apartamentos, locales y más, para todos los gustos y necesidades.'
        },
        {
          title: 'Transparencia y confianza',
          desc: 'Procesos claros y seguros en cada transacción.'
        }
      ].map((item, idx) => (
        <div
          key={idx}
          style={{
            background: 'rgba(255,255,255,0.98)',
            borderRadius: 14,
            boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
            padding: 28,
            minWidth: 240,
            maxWidth: 280,
            transition: 'transform 0.18s, box-shadow 0.18s',
            cursor: 'pointer'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.13)';
          }}
        >
          <h3 style={{
            color: 'var(--color-primary)',
            fontWeight: 800,
            fontSize: 20,
            marginBottom: 10
          }}>
            {item.title}
          </h3>
          <p style={{ color: 'var(--color-gray)', fontSize: 15 }}>{item.desc}</p>
        </div>
      ))}
    </section>

    {/* Efecto decorativo de fondo */}
    <div
      style={{
        position: 'absolute',
        top: '-120px',
        left: '-120px',
        width: 320,
        height: 320,
        background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 80%)',
        opacity: 0.18,
        zIndex: 1
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: 260,
        height: 260,
        background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 80%)',
        opacity: 0.15,
        zIndex: 1
      }}
    />
  </div>
);

export default Home;