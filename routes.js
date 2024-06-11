const express = require('express');
const {
  createReservation,
  getAllReservations,
  getReservationById,
  getReservationsByUser,
  cancelReservation,
  completeReservation,
  getRemainingReservations
} = require('./controller');
const router = express.Router();

router.post('/', createReservation);
router.get('/', getAllReservations);
router.get('//:id', getReservationById);
router.get('/user/:userId', getReservationsByUser);
router.put('/cancel/:id', cancelReservation);
router.put('/complete/:id', completeReservation);
router.get('/remaining', getRemainingReservations);

module.exports = router;
