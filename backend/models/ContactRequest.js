const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ContactRequest = sequelize.define('ContactRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Properties',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'contactado', 'cerrado'),
    defaultValue: 'pendiente'
  },
  source: {
    type: DataTypes.STRING,
    defaultValue: 'web'
  }
});

module.exports = ContactRequest;