import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useMenuStore } from '../../stores/menuStore';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

function Breads() {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { items, fetchMenuItems } = useMenuStore();
  const [selectedBread, setSelectedBread] = useState(null);

  useEffect(() => {
    fetchMenuItems('bread');
  }, [fetchMenuItems]);

  const handleSelect = (bread) => {
    addItem({ ...bread, quantity: 1 });
    navigate("/extra-breads");
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Select Your Bread</h2>
      <p className="text-gray-600 mb-6">Each selection comes with a default quantity</p>
      
      {items.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">No breads available</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((bread) => (
            <Card key={bread._id} className="flex flex-col">
              <img
                src={bread.image}
                alt={bread.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-secondary mb-2">{bread.name}</h3>
                <p className="text-gray-600 mb-4">{bread.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">₹{bread.price} each</span>
                  <span className="text-sm text-gray-500">
                    Default: {bread.defaultQuantity} pieces
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleSelect(bread)}
                >
                  Select ({bread.defaultQuantity} pcs)
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        {selectedBread && (
          <Button
            variant="accent"
            onClick={() => navigate('/extra-breads')}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

export default Breads;