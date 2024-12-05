import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', protect, authorize('admin'), addMenuItem);
router.put('/:id', protect, authorize('admin'), updateMenuItem);
router.delete('/:id', protect, authorize('admin'), deleteMenuItem);

export default router;