import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderById
} from '../controllers/order.controller.js';

const router = express.Router();
console.log("Order routes loaded");

router.post("/", protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put(
  "/:id/status",
  protect,
  authorize("admin", "delivery"),
  updateOrderStatus
);



export default router;