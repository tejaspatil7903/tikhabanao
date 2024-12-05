import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";
import toast from "react-hot-toast";
import { createOrder } from "../../api/order.js";

function Cart() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCartStore();
  const user = useAuthStore((state) => state.user);

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    phone: "",
    instructions: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      // Map items to include the menuItem ObjectId and ensure valid data
      const orderData = {
        items: items.map((item) => ({
          menuItem: item.isExtraItem
            ? undefined
            : item._id || item.menuItem?._id, // Ensure menuItem._id is valid, or leave undefined for extra items
          quantity: item.quantity,
          price: item.price,
          isExtraItem: item.isExtraItem || false, // Add this property to the order data
        })),
        totalAmount,
        deliveryAddress: deliveryDetails.address,
        phone: deliveryDetails.phone,
        deliveryInstructions: deliveryDetails.instructions,
      };

      // Call the createOrder API
      const response = await createOrder(orderData);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/user");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Your Cart is Empty
          </h2>
          <button
            onClick={() => navigate("/select-food")}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
          >
            Start Ordering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Your Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-4 border-b last:border-0"
              >
                <div>
                  <h3 className="font-semibold text-secondary">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-primary">
                  ₹{totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Delivery Details
            </h3>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  name="instructions"
                  value={deliveryDetails.instructions}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                  rows="2"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-opacity-90"
                >
                  Place Order (₹{totalAmount})
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
