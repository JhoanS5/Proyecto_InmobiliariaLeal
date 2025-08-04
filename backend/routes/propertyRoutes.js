const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/upload');

// Crear propiedad (con subida de hasta 5 imágenes)
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  upload.array('images', 5),
  propertyController.create
);

// Obtener todas las propiedades
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  propertyController.getAll
);

// Obtener una propiedad por ID
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  propertyController.getById
);

// Actualizar propiedad (con subida de hasta 5 imágenes)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  upload.array('images', 5),
  propertyController.update
);

// Eliminar propiedad
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  propertyController.delete
);

module.exports = router;