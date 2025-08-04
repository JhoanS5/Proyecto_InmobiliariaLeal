const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Registro y login (públicos)
router.post('/register', userController.register);
router.post('/login', userController.login);

// Solo super_admin puede gestionar usuarios
router.get('/', authMiddleware, roleMiddleware(['super_admin']), userController.getAll);
router.get('/:id', authMiddleware, roleMiddleware(['super_admin']), userController.getById);
router.put('/:id', authMiddleware, roleMiddleware(['super_admin']), userController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['super_admin']), userController.delete);

module.exports = router;