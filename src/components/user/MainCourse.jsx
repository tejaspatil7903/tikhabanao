import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useMenuStore } from '../../stores/menuStore';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export default function MainCourse() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const foodType = searchParams.get('type');
  const addItem = useCartStore((state) => state.addItem);
  const { items, fetchMenuItems } = useMenuStore();
  
  useEffect(() => {
    fetchMenuItems('main', foodType);
  }, [fetchMenuItems, foodType]);

  const handleSelect = (dish) => {
    addItem({ ...dish, quantity: 1 });
    navigate('/breads');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Select Main Course</h2>
      {items.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">No items available in this category</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((dish) => (
            <Card 
              key={dish._id} 
              className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative w-full h-48">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Veg/Non-veg Badge */}
                <div className="absolute top-3 right-3 bg-white p-1 rounded-sm shadow-md">
                  <div className={`w-4 h-4 border-2 ${dish.type === 'veg' ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
                    <span className={`block w-2 h-2 ${dish.type === 'veg' ? 'bg-green-600' : 'bg-red-600'} rounded-full`}></span>
                  </div>
                </div>

                {/* Offer Tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                    50% OFF
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-4">
                {/* Title and Rating Row */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    {dish.name}
                  </h3>
                  <div className="flex items-center bg-green-700 text-white px-1.5 py-0.5 rounded text-sm gap-1">
                    <span className="font-bold">4.2</span>
                    <span className="text-xs">★</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {dish.description}
                </p>

                {/* Price and Action Row */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold">₹{dish.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{Math.round(dish.price * 1.5)}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => handleSelect(dish)}
                    className="px-4 py-2 bg-white border border-gray-300 text-green-600 rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <span className="flex items-center text-sm font-medium">
                      ADD
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}