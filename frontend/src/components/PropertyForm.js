import React, { useState, useEffect } from 'react';
import api from '../services/api';

const initialState = {
  title: '',
  description: '',
  price: '',
  location: '',
  address: '',
  type: '',
  status: '',
  operation: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  parking: '',
  features: '',
  images: []
};

const PropertyForm = ({ onSuccess, propertyToEdit, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState('');

  const isEdit = !!propertyToEdit;

  // Este useEffect actualiza el formulario cuando propertyToEdit cambia
  useEffect(() => {
    if (isEdit && propertyToEdit) {
      setForm({
        ...initialState,
        ...propertyToEdit
      });
    } else {
      setForm(initialState);
    }
  }, [isEdit, propertyToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key !== 'images') {
          formData.append(key, value);
        }
      });
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      if (isEdit) {
        await api.put(`/properties/${propertyToEdit.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/properties', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      onSuccess();
    } catch (err) {
      setError('Error al guardar la propiedad');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h4>{isEdit ? 'Editar Propiedad' : 'Crear Propiedad'}</h4>
      <div style={{ marginBottom: 12 }}>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Ubicación (Ciudad/Barrio):</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Dirección:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Tipo:</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        >
          <option value="">Selecciona un tipo</option>
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Local">Local</option>
          <option value="Lote">Lote</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Estado:</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        >
          <option value="">Selecciona un estado</option>
          <option value="disponible">Disponible</option>
          <option value="vendido">Vendido</option>
          <option value="arrendado">Arrendado</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Operación:</label>
        <select
          name="operation"
          value={form.operation}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        >
          <option value="">Selecciona una operación</option>
          <option value="venta">Venta</option>
          <option value="arriendo">Arriendo</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Habitaciones:</label>
        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          min="0"
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Baños:</label>
        <input
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          min="0"
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Área (m²):</label>
        <input
          type="number"
          name="area"
          value={form.area}
          onChange={handleChange}
          min="0"
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Parqueaderos:</label>
        <input
          type="number"
          name="parking"
          value={form.parking}
          onChange={handleChange}
          min="0"
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Características (separadas por coma):</label>
        <input
          type="text"
          name="features"
          value={form.features}
          onChange={handleChange}
          style={{ width: '100%' }}
          placeholder="Ej: Balcón, Piscina, Depósito"
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Imágenes (máximo 5):</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
        />
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" style={{ background: 'var(--color-accent)', color: 'white', marginRight: 12 }}>
        {isEdit ? 'Actualizar' : 'Crear'}
      </button>
      <button type="button" onClick={onCancel} style={{ background: '#ccc' }}>
        Cancelar
      </button>
    </form>
  );
};

export default PropertyForm;