const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Compara la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Genera el token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secreto', // Usa tu secreto real en producción
      { expiresIn: '8h' }
    );

    // Devuelve el usuario (sin la contraseña) y el token
    const { password: _, ...userData } = user.toJSON();
    res.json({ user: userData, token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};