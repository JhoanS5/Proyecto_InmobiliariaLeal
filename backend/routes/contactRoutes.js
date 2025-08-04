const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Para propiedades y solicitudes
router.post('/', authMiddleware, roleMiddleware(['admin', 'super_admin']), contactController.create);
router.get('/', authMiddleware, roleMiddleware(['admin', 'super_admin']), contactController.getAll);
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'super_admin']), contactController.getById);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'super_admin']), contactController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'super_admin']), contactController.delete);

module.exports = router;