const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a la base de datos
const sequelize = require('./config/db');
sequelize.authenticate()
  .then(() => console.log('Conexión a MySQL exitosa'))
  .catch(err => console.error('Error de conexión a MySQL:', err));

// Sincronizar modelos
require('./models'); // Importa y define relaciones
sequelize.sync({ alter: true })
  .then(() => console.log('Modelos sincronizados con la base de datos'))
  .catch(err => console.error('Error al sincronizar modelos:', err));

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Inmobiliaria Leal funcionando');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});