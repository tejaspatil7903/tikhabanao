import { useState, useEffect } from 'react';
import { useMenuStore } from '../../stores/menuStore';
import { useOrderStore } from '../../stores/orderStore';
import { PageContainer } from '../layout/PageContainer';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import AddMenuItem from './AddMenuItem';
import MenuItemList from './MenuItemList';
import OrderList from './OrderList';
import DeliveryPersonList from './DeliveryPersonList';

export default function AdminDashboard() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const { fetchMenuItems } = useMenuStore();
  const { fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, [fetchOrders, fetchMenuItems]);

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
        {activeTab === 'menu' && (
          <Button
            variant="accent"
            onClick={() => setShowAddItem(true)}
          >
            Add Menu Item
          </Button>
        )}
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'menu'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Menu Items
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'delivery'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Delivery Personnel
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'orders' && <OrderList />}
      {activeTab === 'menu' && <MenuItemList />}
      {activeTab === 'delivery' && <DeliveryPersonList />}

      {showAddItem && (
        <AddMenuItem onClose={() => setShowAddItem(false)} />
      )}
    </PageContainer>
  );
}