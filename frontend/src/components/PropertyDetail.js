import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import PublicContactForm from './PublicContactForm';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        setProperty(null);
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div style={{ padding: 32 }}>Cargando propiedad...</div>;
  if (!property) return <div style={{ padding: 32 }}>Propiedad no encontrada.</div>;

  // Asegurarse de que images siempre sea un array
  const images = Array.isArray(property.images)
    ? property.images
    : property.images
      ? (() => {
          try {
            return JSON.parse(property.images);
          } catch {
            return [];
          }
        })()
      : [];

  // Features como array
  const features = property.features && typeof property.features === 'string'
    ? property.features.split(',').map(f => f.trim()).filter(f => f)
    : Array.isArray(property.features)
      ? property.features
      : [];

  return (
    <div style={{
      maxWidth: 900,
      margin: '40px auto',
      padding: 24,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      position: 'relative'
    }}>
      {/* Etiqueta de operación */}
      <div style={{
        position: 'absolute',
        top: 24,
        left: 24,
        zIndex: 2
      }}>
        <span style={{
          background: property.operation === 'arriendo' ? '#2563eb' : '#10b981',
          color: '#fff',
          fontWeight: 700,
          fontSize: 14,
          borderRadius: 8,
          padding: '5px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          {property.operation === 'arriendo' ? 'En Alquiler' : 'En Venta'}
        </span>
      </div>

      {/* Galería de imágenes */}
      {images.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          {/* Imagen principal */}
          <div style={{ marginBottom: 16 }}>
            <img
              src={`http://localhost:5000/uploads/${images[selectedImage]}`}
              alt={`${property.title} - Imagen ${selectedImage + 1}`}
              style={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </div>
          {/* Miniaturas */}
          {images.length > 1 && (
            <div style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              paddingBottom: 8
            }}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`Miniatura ${idx + 1}`}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: 80,
                    height: 60,
                    objectFit: 'cover',
                    borderRadius: 4,
                    cursor: 'pointer',
                    border: selectedImage === idx ? '3px solid #2563eb' : '2px solid #ddd',
                    transition: 'border 0.2s ease'
                  }}
                />
              ))}
            </div>
          )}
          {/* Contador de imágenes */}
          {images.length > 1 && (
            <p style={{ 
              textAlign: 'center', 
              color: '#666', 
              fontSize: '14px', 
              marginTop: 8 
            }}>
              Imagen {selectedImage + 1} de {images.length}
            </p>
          )}
        </div>
      )}

      {/* Título y precio */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
        <h2 style={{ color: '#002147', margin: 0, fontWeight: 800, fontSize: 28 }}>{property.title}</h2>
        <div style={{ color: '#f59e42', fontWeight: 900, fontSize: 26 }}>
          {property.price ? `$${Number(property.price).toLocaleString()}` : 'Consultar'}
          {property.operation === 'arriendo' && <span style={{ color: '#888', fontWeight: 400, fontSize: 16 }}>/mes</span>}
        </div>
      </div>
      <div style={{ color: '#888', fontSize: 16, marginBottom: 12 }}>
        <span style={{ marginRight: 6 }}>📍</span>
        {property.location}
      </div>

      {/* Descripción */}
      <div style={{ marginBottom: 18 }}>
        <p style={{ lineHeight: 1.6, margin: 0 }}>{property.description}</p>
      </div>

      {/* Datos principales */}
      <div style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        marginBottom: 12,
        color: '#444',
        fontSize: 16
      }}>
        {property.bedrooms > 0 && <span>🛏 {property.bedrooms} hab</span>}
        {property.bathrooms > 0 && <span>🛁 {property.bathrooms} baños</span>}
        {property.area && <span>📐 {property.area} m²</span>}
        {property.parking > 0 && <span>🚗 {property.parking} parqueo</span>}
      </div>

      {/* Más detalles */}
      <div style={{ color: '#666', fontSize: 15, marginBottom: 10 }}>
        <b>Tipo:</b> {property.type} &nbsp;|&nbsp; <b>Estado:</b> {property.status}
      </div>
      {property.address && (
        <div style={{ color: '#888', fontSize: 15, marginBottom: 10 }}>
          <b>Dirección:</b> {property.address}
        </div>
      )}

      {/* Características */}
      {features.length > 0 && (
        <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {features.slice(0, 3).map((feat, idx) => (
            <span key={idx} style={{
              background: '#e0e7ef',
              color: '#2563eb',
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 8,
              padding: '4px 12px'
            }}>{feat}</span>
          ))}
          {features.length > 3 && (
            <span style={{
              background: '#e0e7ef',
              color: '#2563eb',
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 8,
              padding: '4px 12px'
            }}>
              +{features.length - 3} más
            </span>
          )}
        </div>
      )}

      <hr style={{ margin: '32px 0' }} />
      <PublicContactForm propertyId={property.id} />
    </div>
  );
};

export default PropertyDetail;