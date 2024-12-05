import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export default function DeliveryRegistration({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const { registerDeliveryPerson } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerDeliveryPerson(formData);
      toast.success('Delivery person registered successfully');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register Delivery Person</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Register
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}