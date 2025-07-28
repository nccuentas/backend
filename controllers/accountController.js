const StreamingAccount = require('../models/StreamingAccount');

// Crear cuenta
exports.createAccount = async (req, res) => {
  try {
    const account = await StreamingAccount.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las cuentas
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await StreamingAccount.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una cuenta
exports.getAccountById = async (req, res) => {
  try {
    const account = await StreamingAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'No encontrada' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar cuenta
exports.updateAccount = async (req, res) => {
  try {
    const updated = await StreamingAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar cuenta
exports.deleteAccount = async (req, res) => {
  try {
    await StreamingAccount.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cuenta eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
