import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const PropertyCatalog = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    operation: '',
    type: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get('/properties');
        setProperties(res.data);
      } catch (err) {
        setProperties([]);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  // Filtrado básico en frontend
  const filtered = properties.filter(p => {
    return (
      (!filters.operation || p.operation === filters.operation) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.minPrice || Number(p.price) >= Number(filters.minPrice)) &&
      (!filters.maxPrice || Number(p.price) <= Number(filters.maxPrice))
    );
  });

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      background: 'var(--color-dark)',
      minHeight: '80vh',
      padding: '32px 0'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontWeight: 900,
          fontSize: 34,
          marginBottom: 32,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Propiedades disponibles
        </h2>
        {/* Filtros */}
        <div style={{
          display: 'flex',
          gap: 16,
          marginBottom: 36,
          flexWrap: 'wrap',
          background: 'rgba(255,255,255,0.07)',
          padding: 18,
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          justifyContent: 'center'
        }}>
          <select name="operation" value={filters.operation} onChange={handleChange} style={filterInputStyle}>
            <option value="">Operación</option>
            <option value="venta">Venta</option>
            <option value="arriendo">Arriendo</option>
          </select>
          <select name="type" value={filters.type} onChange={handleChange} style={filterInputStyle}>
            <option value="">Tipo</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Local">Local</option>
            <option value="Oficina">Oficina</option>
            <option value="Lote">Lote</option>
            <option value="Bodega">Bodega</option>
          </select>
          <input
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Ubicación"
            style={filterInputStyle}
          />
          <input
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Precio mínimo"
            type="number"
            style={filterInputStyle}
          />
          <input
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Precio máximo"
            type="number"
            style={filterInputStyle}
          />
        </div>
        {/* Propiedades */}
        {loading ? (
          <div style={{ color: 'var(--color-accent)', textAlign: 'center', marginTop: 60 }}>
            Cargando propiedades...
          </div>
        ) : (
          <div
            className="catalog-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 32,
              justifyContent: 'center',
              alignItems: 'start',
              width: '100%',
              maxWidth: 900,
              margin: '0 auto',
              padding: '0 12px'
            }}
          >
            {filtered.map(property => (
              <div
                key={property.id}
                className="property-card"
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 420,
                  maxWidth: 420,
                  margin: '0 auto',
                  border: '1px solid #f2f2f2',
                  position: 'relative'
                }}
              >
                {/* Etiqueta de operación */}
                <div style={{
                  position: 'absolute',
                  margin: 18,
                  zIndex: 2
                }}>
                  <span style={{
                    background: property.operation === 'arriendo' ? '#2563eb' : '#10b981',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 13,
                    borderRadius: 8,
                    padding: '4px 14px'
                  }}>
                    {property.operation === 'arriendo' ? 'En Alquiler' : 'En Venta'}
                  </span>
                </div>
                {/* Imagen principal */}
                <div style={{ width: '100%', height: 170, overflow: 'hidden', background: '#eee', position: 'relative' }}>
                  <img
                    src={property.images && property.images.length ? `http://localhost:5000/uploads/${property.images[0]}` : '/no-image.png'}
                    alt={property.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                {/* Contenido */}
                <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{
                      color: '#222',
                      fontWeight: 800,
                      fontSize: 20,
                      marginBottom: 4
                    }}>
                      {property.title}
                    </h3>
                    <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>
                      <span style={{ marginRight: 6 }}>📍</span>
                      {property.location}
                    </div>
                    <div style={{
                      color: '#f59e42',
                      fontWeight: 800,
                      fontSize: 20,
                      marginBottom: 8
                    }}>
                      {property.price ? `$${Number(property.price).toLocaleString()}` : 'Consultar'}
                      {property.operation === 'arriendo' && <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>/mes</span>}
                    </div>
                    <div style={{ color: '#444', fontSize: 15, marginBottom: 10 }}>
                      {property.description && (
                        <div style={{
                          marginBottom: 8,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {property.description}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
                        {property.bedrooms > 0 && <span>🛏 {property.bedrooms} hab</span>}
                        {property.bathrooms > 0 && <span>🛁 {property.bathrooms} baños</span>}
                        {property.area && <span>📐 {property.area} m²</span>}
                        {property.parking > 0 && <span>🚗 {property.parking} parqueo</span>}
                      </div>
                      <div style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>
                        <b>Tipo:</b> {property.type} &nbsp;|&nbsp; <b>Estado:</b> {property.status}
                      </div>
                    </div>
                    {/* Características */}
                    {property.features && typeof property.features === 'string' && property.features.length > 0 && (
                      <div style={{ marginBottom: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {property.features.split(',').slice(0, 2).map((feat, idx) => (
                          <span key={idx} style={{
                            background: '#e0e7ef',
                            color: '#2563eb',
                            fontWeight: 600,
                            fontSize: 13,
                            borderRadius: 8,
                            padding: '3px 10px'
                          }}>{feat.trim()}</span>
                        ))}
                        {property.features.split(',').length > 2 && (
                          <span style={{
                            background: '#e0e7ef',
                            color: '#2563eb',
                            fontWeight: 600,
                            fontSize: 13,
                            borderRadius: 8,
                            padding: '3px 10px'
                          }}>
                            +{property.features.split(',').length - 2} más
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <Link
                    to={`/propiedades/${property.id}`}
                    style={{
                      background: '#0a2240',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 16,
                      borderRadius: 8,
                      padding: '12px 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      marginTop: 12,
                      display: 'block',
                      letterSpacing: 0.5
                    }}
                  >
                    Ver Detalles Completos
                  </Link>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: 18 }}>
                No se encontraron propiedades con esos filtros.
              </div>
            )}
          </div>
        )}
        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: 900px) {
              .catalog-grid {
                grid-template-columns: 1fr !important;
                max-width: 420px !important;
              }
            }
            @media (max-width: 500px) {
              .property-card {
                width: 100% !important;
                min-width: 0 !important;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

const filterInputStyle = {
  padding: 10,
  borderRadius: 6,
  border: '1px solid #ddd',
  minWidth: 120,
  fontSize: 15,
  background: 'rgba(255,255,255,0.95)'
};

export default PropertyCatalog;