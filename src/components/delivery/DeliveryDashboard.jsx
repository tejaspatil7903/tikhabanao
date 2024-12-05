import { useEffect } from 'react';
import { useOrderStore } from '../../stores/orderStore';
import { PageContainer } from '../layout/PageContainer';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export default function DeliveryDashboard() {
  const { orders, fetchOrders, updateOrderStatus } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const readyOrders = orders.filter(order => order.status === 'ready');
  const activeDeliveries = orders.filter(order => 
    order.status === 'out-for-delivery' && order.deliveryPerson?._id === user._id
  );

  return (
    <PageContainer>
      <h2 className="text-3xl font-bold text-primary mb-8">Delivery Dashboard</h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4">Orders Ready for Pickup</h3>
          <div className="space-y-4">
            {readyOrders.map((order) => (
              <Card key={order._id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Order #{order._id.slice(-6)}
                    </h4>
                    <p className="text-gray-600">
                      Customer: {order.user.name}
                    </p>
                    <p className="text-gray-600">
                      Address: {order.deliveryAddress}
                    </p>
                    <p className="text-gray-600">
                      Phone: {order.phone}
                    </p>
                  </div>
                  <Badge variant="accent">Ready for Pickup</Badge>
                </div>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => updateOrderStatus(order._id, 'out-for-delivery')}
                >
                  Pick Up Order
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Active Deliveries</h3>
          <div className="space-y-4">
            {activeDeliveries.map((order) => (
              <Card key={order._id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Order #{order._id.slice(-6)}
                    </h4>
                    <p className="text-gray-600">
                      Customer: {order.user.name}
                    </p>
                    <p className="text-gray-600">
                      Address: {order.deliveryAddress}
                    </p>
                    <p className="text-gray-600">
                      Phone: {order.phone}
                    </p>
                    {order.deliveryInstructions && (
                      <p className="text-gray-600">
                        Instructions: {order.deliveryInstructions}
                      </p>
                    )}
                  </div>
                  <Badge variant="primary">Out for Delivery</Badge>
                </div>
                <Button
                  variant="accent"
                  className="mt-4"
                  onClick={() => updateOrderStatus(order._id, 'delivered')}
                >
                  Mark as Delivered
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}