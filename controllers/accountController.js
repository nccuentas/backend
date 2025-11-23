const prisma = require("../prisma");

// Crear cuenta
exports.createAccount = async (req, res) => {
  try {
    const {
      nombreServicio,
      correoAcceso,
      contrasenaAcceso,
      fechaAdquisicion,
      fechaExpiracion,
      notasAdicionales,
      perfiles = []
    } = req.body;

    const account = await prisma.streamingAccount.create({
      data: {
        nombreServicio,
        correoAcceso,
        contrasenaAcceso,
        fechaAdquisicion: fechaAdquisicion ? new Date(fechaAdquisicion) : null,
        fechaExpiracion: fechaExpiracion ? new Date(fechaExpiracion) : null,
        notasAdicionales,
        perfiles: {
          create: perfiles
        }
      },
      include: { perfiles: true }
    });

    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las cuentas
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await prisma.streamingAccount.findMany({
      include: { perfiles: true }
    });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una cuenta por ID
exports.getAccountById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const account = await prisma.streamingAccount.findUnique({
      where: { id },
      include: { perfiles: true }
    });

    if (!account) return res.status(404).json({ error: "No encontrada" });

    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar cuenta
exports.updateAccount = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.streamingAccount.update({
      where: { id },
      data: req.body
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar cuenta
exports.deleteAccount = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Primero borrar perfiles
    await prisma.profile.deleteMany({
      where: { streamingAccountId: id }
    });

    // Luego la cuenta
    await prisma.streamingAccount.delete({
      where: { id }
    });

    res.json({ message: "Cuenta eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
