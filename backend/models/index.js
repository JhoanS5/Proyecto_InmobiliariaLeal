const User = require('./User');
const Property = require('./Property');
const ContactRequest = require('./ContactRequest');

// Definir relaciones
ContactRequest.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });
Property.hasMany(ContactRequest, { foreignKey: 'propertyId', as: 'contactRequests' });

module.exports = {
  User,
  Property,
  ContactRequest
};