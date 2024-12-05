import { useState } from 'react';
import { useMenuStore } from '../../stores/menuStore';
import toast from 'react-hot-toast';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export default function AddMenuItem({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'veg',
    category: 'main',
    price: '',
    description: '',
    defaultQuantity: '1',
    image: null,
  });

  const { addMenuItem } = useMenuStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await addMenuItem(formDataToSend);
      toast.success('Menu item added successfully!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add menu item');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-primary mb-6">Add Menu Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
              required
            >
              <option value="main">Main Course</option>
              <option value="bread">Bread</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
              required
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>

          <Input
            label="Price (₹)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <Input
            label="Default Quantity"
            type="number"
            name="defaultQuantity"
            value={formData.defaultQuantity}
            onChange={handleChange}
            min="1"
            required
          />

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}