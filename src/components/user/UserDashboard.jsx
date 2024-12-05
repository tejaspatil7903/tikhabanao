import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useOrderStore } from "../../stores/orderStore";
import { useMenuStore } from "../../stores/menuStore";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export default function UserDashboard() {
  const { user } = useAuthStore();
  const { orders, fetchOrders } = useOrderStore();
  const { items: menuItems, fetchMenuItems } = useMenuStore();

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, [fetchOrders, fetchMenuItems]);

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">
          Welcome, {user ? user.name : "Loading..."}
        </h2>
        <Link
          to="/select-food"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
        >
          Order Food
        </Link>
      </div>

      {/* Today's Menu Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-secondary mb-4">
          Today's Menu Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.length > 0 ? (
            menuItems.slice(0, 3).map((item) => (
              <Card key={item._id} className="flex flex-col">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <Badge
                      variant={item.type === "veg" ? "accent" : "secondary"}
                    >
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.description}
                  </p>
                  <p className="font-medium">₹{item.price}</p>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-gray-600 text-center">Menu is loading...</p>
            </Card>
          )}
        </div>
      </section>

      {/* Orders Section */}
      <section>
        <h3 className="text-xl font-semibold text-secondary mb-4">
          Your Orders
        </h3>
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card key={order._id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Order #{order._id.slice(-6)}
                    </h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-gray-600">
                          {item.quantity}x{" "}
                          {item.menuItem
                            ? item.menuItem.name
                            : item.isExtraItem
                            ? `Extra bread`
                            : "Item not available"}
                        </p>
                      ))}
                    </div>
                    <p className="text-gray-600 mt-2">
                      Total: ₹{order.totalAmount}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-gray-600 text-center">
                No orders yet. Start ordering now!
              </p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
