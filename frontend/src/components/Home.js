import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [operation, setOperation] = useState('venta');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Construye la query string para los filtros
    const params = new URLSearchParams();
    if (operation) params.append('operation', operation);
    if (type) params.append('type', type);
    if (location) params.append('location', location);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    navigate(`/propiedades?${params.toString()}`);
  };

  return (
    <div style={{
      minHeight: '60vh',
      background: 'linear-gradient(120deg, #002147 60%, #f5a623 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px 0'
    }}>
      <h1 style={{ color: '#fff', fontSize: 40, marginBottom: 16, textAlign: 'center' }}>
        Encuentra tu <span style={{ color: '#f5a623' }}>Hogar Perfecto</span>
      </h1>
      <p style={{ color: '#fff', fontSize: 18, marginBottom: 32, textAlign: 'center' }}>
        Más de 15 años conectando familias con la propiedad de sus sueños.<br />
        Experiencia, confianza y resultados garantizados.
      </p>
      <form
        onSubmit={handleSearch}
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          padding: 24,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          minWidth: 320,
          maxWidth: 700
        }}
      >
        <div>
          <button
            type="button"
            onClick={() => setOperation('venta')}
            style={{
              background: operation === 'venta' ? '#002147' : '#f7f9fb',
              color: operation === 'venta' ? '#fff' : '#002147',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 6,
              marginRight: 4,
              cursor: 'pointer'
            }}
          >
            Comprar
          </button>
          <button
            type="button"
            onClick={() => setOperation('alquiler')}
            style={{
              background: operation === 'alquiler' ? '#002147' : '#f7f9fb',
              color: operation === 'alquiler' ? '#fff' : '#002147',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            Alquilar
          </button>
        </div>
        <input
          placeholder="Ubicación, barrio o ciudad..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          style={{ padding: 8, minWidth: 180, flex: 1 }}
        />
        <select value={type} onChange={e => setType(e.target.value)} style={{ padding: 8, minWidth: 140 }}>
          <option value="">Tipo de propiedad</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="local">Local</option>
          <option value="oficina">Oficina</option>
          <option value="terreno">Terreno</option>
          <option value="bodega">Bodega</option>
        </select>
        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{ padding: 8, minWidth: 120 }}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{ padding: 8, minWidth: 120 }}
        />
        <button
          type="submit"
          style={{
            background: '#f5a623',
            color: '#fff',
            padding: '8px 24px',
            border: 'none',
            borderRadius: 6,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Home;