const { ContactRequest, Property } = require('../models');

exports.create = async (req, res) => {
  try {
    const contact = await ContactRequest.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const contacts = await ContactRequest.findAll({ include: [{ model: Property, as: 'property' }] });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const contact = await ContactRequest.findByPk(req.params.id, { include: [{ model: Property, as: 'property' }] });
    if (!contact) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const contact = await ContactRequest.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Solicitud no encontrada' });
    await contact.update(req.body);
    res.json({ message: 'Solicitud actualizada', contact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const contact = await ContactRequest.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Solicitud no encontrada' });
    await contact.destroy();
    res.json({ message: 'Solicitud eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};