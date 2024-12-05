import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";

function ExtraBreads() {
  const navigate = useNavigate();
  const [extraQuantity, setExtraQuantity] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const selectedBread = cartItems[cartItems.length - 1];
  const extraPrice = 10; // Price per extra bread

  const handleAddExtra = () => {
    if (extraQuantity > 0) {
      // Check if it's an extra bread and omit the menuItem for the extra item
      const itemToAdd = selectedBread.menuItem
        ? {
            menuItem: selectedBread.menuItem, // Regular menu item has menuItem
            name: `Extra ${selectedBread.name}`,
            price: extraPrice,
            quantity: extraQuantity,
            totalPrice: extraPrice * extraQuantity,
            isExtraItem: true, // Mark it as extra
          }
        : {
            name: `Extra ${selectedBread.name}`,
            price: extraPrice,
            quantity: extraQuantity,
            totalPrice: extraPrice * extraQuantity,
            isExtraItem: true, // Mark it as extra
          };

      // Add item to cart
      addItem(itemToAdd);
    }
    navigate("/desserts"); // After adding, navigate to desserts page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Add Extra Breads</h2>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-secondary mb-2">
            Selected: {selectedBread?.name}
          </h3>
          <p className="text-gray-600">
            Default quantity: {selectedBread?.quantity} pieces
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Add Extra Pieces</label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setExtraQuantity(Math.max(0, extraQuantity - 1))}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl font-medium">{extraQuantity}</span>
            <button
              onClick={() => setExtraQuantity(extraQuantity + 1)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            ₹{extraPrice} per additional piece
          </p>
        </div>

        {extraQuantity > 0 && (
          <div className="mb-6 p-4 bg-light rounded-lg">
            <p className="font-medium">Extra Cost Summary:</p>
            <p className="text-gray-600">
              {extraQuantity} × ₹{extraPrice} = ₹{extraQuantity * extraPrice}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
          >
            Back
          </button>
          <button
            onClick={handleAddExtra}
            className="bg-accent text-white px-6 py-2 rounded hover:bg-opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExtraBreads;
