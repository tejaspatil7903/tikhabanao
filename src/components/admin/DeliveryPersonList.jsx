import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import DeliveryRegistration from './DeliveryRegistration';
import toast from 'react-hot-toast';

export default function DeliveryPersonList() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const { user } = useAuthStore();

  const fetchDeliveryPersons = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/delivery-persons', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      setDeliveryPersons(data);
    } catch (error) {
      toast.error('Failed to fetch delivery personnel');
    }
  };

  useEffect(() => {
    fetchDeliveryPersons();
  }, []);

  const handleRemove = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/auth/delivery-persons/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      toast.success('Delivery person removed successfully');
      fetchDeliveryPersons();
    } catch (error) {
      toast.error('Failed to remove delivery person');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-secondary">Delivery Personnel</h3>
        <Button
          variant="primary"
          onClick={() => setShowRegistration(true)}
        >
          Add Delivery Person
        </Button>
      </div>

      {deliveryPersons.map((person) => (
        <Card key={person._id}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{person.name}</h4>
              <p className="text-gray-600">{person.email}</p>
              <p className="text-gray-600">{person.phone}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={person.active ? 'accent' : 'secondary'}>
                {person.active ? 'Active' : 'Inactive'}
              </Badge>
              <Button
                variant="danger"
                onClick={() => handleRemove(person._id)}
              >
                Remove
              </Button>
            </div>
          </div>
          {person.currentOrders?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium">Current Orders:</p>
              <div className="text-sm text-gray-600">
                {person.currentOrders.map(order => (
                  <span key={order} className="mr-2">#{order.slice(-6)}</span>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}

      {showRegistration && (
        <DeliveryRegistration
          onClose={() => {
            setShowRegistration(false);
            fetchDeliveryPersons();
          }}
        />
      )}
    </div>
  );
}