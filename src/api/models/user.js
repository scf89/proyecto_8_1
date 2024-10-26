const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, trim: true, required: false },
    rol: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Método para encriptar la contraseña antes de guardarla
userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
