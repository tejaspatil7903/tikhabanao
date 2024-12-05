import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { PageContainer } from '../layout/PageContainer';

export default function AdminRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: '' // Special code for first admin registration
  });
  
  const navigate = useNavigate();
  const { registerAdmin } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await registerAdmin({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminCode: formData.adminCode
      });
      toast.success('Admin account created successfully');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <PageContainer className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create Admin Account</h2>
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
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Input
            label="Admin Registration Code"
            type="password"
            name="adminCode"
            value={formData.adminCode}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="primary" className="w-full">
            Create Admin Account
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}