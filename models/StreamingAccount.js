const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  nombrePerfil: String,
  tienePin: Boolean,
  pin: String,
  asignadoACliente: String,
  estadoPerfil: {
    type: String,
    enum: ['Libre', 'Ocupado', 'Mantenimiento'],
    default: 'Libre'
  }
});

const StreamingAccountSchema = new mongoose.Schema({
  nombreServicio: { type: String, required: true },
  correoAcceso: { type: String, required: true },
  contrasenaAcceso: { type: String, required: true },
  perfiles: [ProfileSchema],
  fechaAdquisicion: Date,
  fechaExpiracion: Date,
  notasAdicionales: String
});

module.exports = mongoose.model('StreamingAccount', StreamingAccountSchema);
