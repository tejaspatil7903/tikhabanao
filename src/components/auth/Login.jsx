import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { PageContainer } from '../layout/PageContainer';
import { FaTruck, FaUtensils, FaWallet, FaClock } from 'react-icons/fa';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success('Login successful!');
      navigate('/user');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <PageContainer className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Hero Section */}
      <div className="w-full bg-white/40 backdrop-blur-sm py-12 mb-8 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight animate-fade-in">
                Delicious Food,
                <span className="text-orange-500 block">Smart Prices</span>
              </h1>
              <p className="text-xl text-gray-600">
                Experience the perfect blend of quality and affordability with SmartServe
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
                  <FaWallet className="text-orange-500" />
                  <span>30% Lower Prices</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
                  <FaClock className="text-orange-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
                  <FaUtensils className="text-orange-500" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-200 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-300 rounded-full opacity-50 animate-pulse delay-300"></div>
              <div className="relative bg-white/80 backdrop-blur rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-center p-4 hover:bg-orange-50 rounded-lg transition-colors">
                    <div className="text-4xl font-bold text-orange-500">500+</div>
                    <div className="text-sm text-gray-600">Restaurants</div>
                  </div>
                  <div className="space-y-2 text-center p-4 hover:bg-orange-50 rounded-lg transition-colors">
                    <div className="text-4xl font-bold text-orange-500">5k+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div className="space-y-2 text-center p-4 hover:bg-orange-50 rounded-lg transition-colors">
                    <div className="text-4xl font-bold text-orange-500">15min</div>
                    <div className="text-sm text-gray-600">Avg. Delivery</div>
                  </div>
                  <div className="space-y-2 text-center p-4 hover:bg-orange-50 rounded-lg transition-colors">
                    <div className="text-4xl font-bold text-orange-500">4.9★</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Login to access exclusive deals and start saving on your favorite meals.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaTruck className="text-2xl text-orange-500" />
                <span className="text-gray-700">Free delivery on your first order</span>
              </div>
              <div className="flex items-center gap-3">
                <FaWallet className="text-2xl text-orange-500" />
                <span className="text-gray-700">Special member discounts</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUtensils className="text-2xl text-orange-500" />
                <span className="text-gray-700">Access to premium restaurants</span>
              </div>
            </div>
          </div>

          <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome Back!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                className="bg-white/70"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                className="bg-white/70"
              />
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                Login
              </Button>
            </form>
            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
              >
                Register here
              </button>
            </p>
          </Card>
        </div>
      </div>

      {/* Add some floating food illustrations */}
      <div className="fixed -z-10 top-1/4 left-10 w-16 h-16 bg-orange-100 rounded-full animate-float"></div>
      <div className="fixed -z-10 top-1/2 right-10 w-20 h-20 bg-orange-200 rounded-full animate-float-delay"></div>
      <div className="fixed -z-10 bottom-1/4 left-1/4 w-12 h-12 bg-orange-300 rounded-full animate-float"></div>
    </PageContainer>
  );
}