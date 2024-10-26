// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const {getReservationById,updateReservation,deleteReservation,getAllReservations,createReservation} = require('../controllers/reservationController');
const { isAuth, isAdmin } = require('../../middlewares/auth');

router.get('/:id',[isAuth], getReservationById); // Obtener una reserva específica
router.put('/:id',[isAuth], updateReservation);    // Actualizar una reserva específica
router.delete('/:id',[isAuth], deleteReservation);  // Eliminar una reserva específica
router.get('/',[isAuth, isAdmin], getAllReservations); // Obtener todas las reservas
router.post('/',[isAuth], createReservation);   // Crear una nueva reserva

module.exports = router;
