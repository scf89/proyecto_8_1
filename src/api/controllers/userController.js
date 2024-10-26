const User = require('../models/user');
const { generateToken } = require("../../config/jwt");
const bcrypt = require('bcryptjs');
const { deleteFile } = require("../../utils/deleteFile");



// Registrar usuario
const registerUser = async (req, res) => {
  const { userName, email, password} = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ userName, email, password,image: req.file ? req.file.path : null });
  res.status(201).json({ token: generateToken(user._id) });
};

// Login usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Listar usuarios (solo admin)
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// Cambiar rol de un usuario (solo admin)
const changeUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  // Verifica que el rol sea válido
  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: 'Rol no válido' });
  }
  console.log(req);
  // Verifica que el usuario que realiza la acción sea un admin
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
  }

  const user = await User.findByIdAndUpdate(userId, { rol: role }, { new: true });
  
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  
  res.json({ message: 'Rol cambiado exitosamente', user });
};

// Eliminar usuario (admin o self)
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  // Verifica si el usuario es un admin o si está eliminando su propia cuenta
  if (req.user.rol === 'admin' || req.user._id.toString() === userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Elimina la imagen de Cloudinary si existe una URL
    if (user.image) {
      deleteFile(user.image);
  }
    return res.json({ message: 'Usuario eliminado exitosamente' });
  }

  return res.status(403).json({ message: 'No tienes permisos para eliminar este usuario' });
};



module.exports = { registerUser, loginUser, getAllUsers, changeUserRole, deleteUser };
