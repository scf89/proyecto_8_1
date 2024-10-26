// routes/coworkingRoutes.js
const express = require('express');
const router = express.Router();
const {getCoworkingById,updateCoworking,deleteCoworking,getAllCoworkings,createCoworking} = require('../controllers/coworkingController');
const { isAdmin, isAuth} = require('../../middlewares/auth');
const { upload } = require('../../middlewares/file');

router.get('/:id', getCoworkingById); // Obtener un coworking específico
router.put('/:id', [isAuth, isAdmin,upload.single('image')],updateCoworking);   // Actualizar un coworking específico
router.delete('/:id',[isAuth, isAdmin], deleteCoworking); // Eliminar un coworking específico
router.get('/', getAllCoworkings); // Obtener todos los coworkings
router.post('/',[isAuth, isAdmin,upload.single('image')], createCoworking);   // Crear un nuevo coworking

module.exports = router;
