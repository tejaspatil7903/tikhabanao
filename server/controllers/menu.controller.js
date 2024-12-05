import MenuItem from '../models/MenuItem.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, type, category, defaultQuantity } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = await uploadToCloudinary(imageFile);

    const menuItem = await MenuItem.create({
      name,
      description,
      price: Number(price),
      type,
      category,
      defaultQuantity: Number(defaultQuantity),
      image: imageUrl
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMenuItems = async (req, res) => {
  try {
    const { category, type } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (type) query.type = type;

    const menuItems = await MenuItem.find(query);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file);
      updates.image = imageUrl;
    }

    const menuItem = await MenuItem.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};