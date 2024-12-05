import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['veg', 'non-veg'],
    required: true
  },
  category: {
    type: String,
    enum: ['main', 'bread', 'dessert'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  defaultQuantity: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

export default mongoose.model("MenuItem", menuItemSchema);