import express from 'express';
import {
  register,
  registerAdmin,
  registerDeliveryPerson,
  removeDeliveryPerson,
  getDeliveryPersons,
  login,
  getProfile
} from '../controllers/auth.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/register-admin', registerAdmin);
router.post('/register-delivery', protect, authorize('admin'), registerDeliveryPerson);
router.delete('/delivery-persons/:id', protect, authorize('admin'), removeDeliveryPerson);
router.get('/delivery-persons', protect, authorize('admin'), getDeliveryPersons);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;