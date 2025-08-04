const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/upload');

// RUTAS PÚBLICAS: obtener todas las propiedades y una por ID
router.get('/', propertyController.getAll);
router.get('/:id', propertyController.getById);

// RUTAS PROTEGIDAS: solo para admins/empleados
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  upload.array('images', 5),
  propertyController.create
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  upload.array('images', 5),
  propertyController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'super_admin']),
  propertyController.delete
);

module.exports = router;