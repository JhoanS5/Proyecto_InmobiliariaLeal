const { Property } = require('../models');
const fs = require('fs');
const path = require('path');

exports.create = async (req, res) => {
  try {
    const imageFiles = req.files || [];
    const imageNames = imageFiles.map(file => file.filename);

    const property = await Property.create({
      ...req.body,
      images: imageNames
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('Error al crear propiedad:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    // Solo propiedades con status 'disponible'
    const properties = await Property.findAll({ where: { status: 'disponible' } });
    const propertiesWithImages = properties.map(property => {
      let images = property.images;
      if (!Array.isArray(images)) {
        try {
          images = images ? JSON.parse(images) : [];
        } catch {
          images = [];
        }
      }
      return { ...property.toJSON(), images };
    });
    res.json(propertiesWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada' });

    let images = property.images;
    if (!Array.isArray(images)) {
      try {
        images = images ? JSON.parse(images) : [];
      } catch {
        images = [];
      }
    }
    res.json({ ...property.toJSON(), images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada' });

    // 1. Imágenes actuales (las que el usuario quiere mantener)
    let currentImages = [];
    if (req.body.currentImages) {
      try {
        currentImages = JSON.parse(req.body.currentImages);
      } catch {
        currentImages = [];
      }
    } else if (Array.isArray(property.images)) {
      currentImages = property.images;
    } else if (property.images) {
      try {
        currentImages = JSON.parse(property.images);
      } catch {
        currentImages = [];
      }
    }

    // 2. Imágenes a eliminar
    let imagesToDelete = [];
    if (req.body['imagesToDelete[]']) {
      if (Array.isArray(req.body['imagesToDelete[]'])) {
        imagesToDelete = req.body['imagesToDelete[]'];
      } else {
        imagesToDelete = [req.body['imagesToDelete[]']];
      }
    }

    // Elimina del disco las imágenes a borrar
    imagesToDelete.forEach(img => {
      const imgPath = path.join(__dirname, '..', 'uploads', img);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    });

    // 3. Imágenes nuevas subidas
    const imageFiles = req.files || [];
    const newImageNames = imageFiles.map(file => file.filename);

    // 4. Construye el array final de imágenes
    const updatedImages = [...currentImages, ...newImageNames];

    // 5. Actualiza la propiedad
    const updateData = {
      ...req.body,
      images: updatedImages
    };

    await property.update(updateData);
    res.json({ message: 'Propiedad actualizada', property: { ...property.toJSON(), images: updatedImages } });
  } catch (error) {
    console.error('Error al actualizar propiedad:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada' });

    if (property.images && Array.isArray(property.images)) {
      property.images.forEach(img => {
        const imgPath = path.join(__dirname, '..', 'uploads', img);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      });
    }

    await property.destroy();
    res.json({ message: 'Propiedad eliminada' });
  } catch (error) {
    console.error('Error al eliminar propiedad:', error);
    res.status(500).json({ error: error.message });
  }
};