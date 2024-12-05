import { useOrderStore } from "../../stores/orderStore";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export default function OrderList() {
  const { orders, updateOrderStatus } = useOrderStore();

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "preparing":
        return "primary";
      case "ready":
        return "accent";
      case "delivered":
        return "success";
      default:
        return "primary";
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order._id}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Order #{order._id.slice(-6)}
              </h3>
              <p className="text-gray-600">
                {/* Check if order.user is available before accessing name */}
                Customer: {order.user?.name || "Unknown Customer"}
              </p>
              <p className="text-gray-600">Total: ₹{order.totalAmount}</p>
            </div>
            <Badge variant={getStatusBadgeVariant(order.status)}>
              {order.status}
            </Badge>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Items:</h4>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li key={item._id} className="text-gray-600">
                  {/* Check if item.menuItem exists before accessing its name */}
                  {item.quantity}x {item.menuItem?.name || "Unknown Item"}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex justify-end space-x-4">
            {order.status === "pending" && (
              <Button
                variant="primary"
                onClick={() => updateOrderStatus(order._id, "preparing")}
              >
                Start Preparing
              </Button>
            )}
            {order.status === "preparing" && (
              <Button
                variant="accent"
                onClick={() => updateOrderStatus(order._id, "ready")}
              >
                Mark Ready
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
