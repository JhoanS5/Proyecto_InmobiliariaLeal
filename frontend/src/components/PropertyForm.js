import React, { useState } from 'react';
import api from '../services/api';

const initialState = {
  title: '',
  description: '',
  price: '',
  location: '',
  address: '',
  type: 'casa',
  status: 'disponible',
  operation: 'venta',
  bedrooms: 0,
  bathrooms: 0,
  area: '',
  parking: 0,
  images: [],
  features: [],
};

const PropertyForm = ({ onSuccess, propertyToEdit, onCancel }) => {
  const [form, setForm] = useState(propertyToEdit ? propertyToEdit : initialState);
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState('');
  // NUEVO: Estado para imágenes actuales y las que se eliminarán
  const [currentImages, setCurrentImages] = useState(
    propertyToEdit && propertyToEdit.images ? [...propertyToEdit.images] : []
  );
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const isEdit = !!propertyToEdit;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  // Eliminar imagen NUEVA (aún no subida)
  const handleRemoveImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Eliminar imagen ACTUAL (ya guardada en la propiedad)
  const handleRemoveCurrentImage = (img) => {
    setCurrentImages(prev => prev.filter(image => image !== img));
    setImagesToDelete(prev => [...prev, img]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();

      // Agregar todos los campos del formulario
      Object.entries(form).forEach(([key, value]) => {
        if (key !== 'images') {
          formData.append(key, value);
        }
      });

      // Agregar las imágenes nuevas seleccionadas
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      // Agregar las imágenes a eliminar (solo en edición)
      if (isEdit && imagesToDelete.length > 0) {
        imagesToDelete.forEach(img => {
          formData.append('imagesToDelete[]', img);
        });
      }

      // Enviar también la lista de imágenes actuales (para mantener las que no se eliminaron)
      if (isEdit) {
        formData.append('currentImages', JSON.stringify(currentImages));
      }

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
      console.error('Error al guardar la propiedad:', err);
      setError('Error al guardar la propiedad');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h4>{isEdit ? 'Editar Propiedad' : 'Crear Propiedad'}</h4>
      {/* ...campos normales... */}
      {/* ...los campos de texto y select van aquí igual que antes... */}
      {/* ... */}

      {/* Campo para subir imágenes */}
      <div>
        <label>Imágenes (máximo 5):</label>
        <input 
          type="file" 
          name="images" 
          multiple 
          accept="image/*" 
          onChange={handleImagesChange} 
          style={{ width: '100%', marginBottom: 8 }} 
        />
        {selectedImages.length > 0 && (
          <div style={{ fontSize: '12px', color: '#666', marginBottom: 8 }}>
            <p>{selectedImages.length} imagen(es) seleccionada(s):</p>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {selectedImages.map((file, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {file.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    style={{
                      marginLeft: 8,
                      color: 'white',
                      background: '#d9534f',
                      border: 'none',
                      borderRadius: 3,
                      padding: '2px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mostrar imágenes existentes si es edición */}
      {isEdit && currentImages && currentImages.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label>Imágenes actuales:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {currentImages.map((img, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <img
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`Imagen ${idx + 1}`}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCurrentImage(img)}
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    background: '#d9534f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 14,
                    lineHeight: '18px',
                    padding: 0
                  }}
                  title="Eliminar imagen"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Puedes eliminar imágenes individuales.
          </p>
        </div>
      )}

      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" style={{ marginRight: 8 }}>{isEdit ? 'Actualizar' : 'Crear'}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default PropertyForm;