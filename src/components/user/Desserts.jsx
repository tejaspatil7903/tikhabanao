import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import { useMenuStore } from "../../stores/menuStore";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

function Desserts() {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { items, fetchMenuItems } = useMenuStore();
  const [selectedDessert, setSelectedDessert] = useState(null);

  useEffect(() => {
    fetchMenuItems("dessert");
  }, [fetchMenuItems]);

  const handleSelect = (dessert) => {
    const quantity = dessert.defaultQuantity || 1; // Default to 1 if quantity is not set
    const price = dessert.price || 0; // Ensure price is set

    // Make sure price and quantity are valid
    if (price <= 0 || quantity <= 0) {
      console.error("Invalid price or quantity for dessert:", dessert);
      return;
    }

    // Calculate total price for the selected dessert
    const totalPrice = price * quantity;

    setSelectedDessert(dessert);

    addItem({
      ...dessert,
      quantity, // Ensure quantity is passed correctly
      totalPrice, // Correctly set total price
    });
  };

  const handleContinue = () => {
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Select Dessert</h2>
      <p className="text-gray-600 mb-6">
        Complete your meal with a delicious dessert
      </p>

      {items.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">No desserts available</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((dessert) => (
            <Card
              key={dessert._id}
              className={`flex flex-col ${
                selectedDessert?._id === dessert._id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
            >
              <img
                src={dessert.image}
                alt={dessert.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {dessert.name}
                </h3>
                <p className="text-gray-600 mb-4">{dessert.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">₹{dessert.price}</span>
                  <span className="text-sm text-gray-500">
                    Quantity: {dessert.defaultQuantity}{" "}
                    {dessert.defaultQuantity === 1 ? "piece" : "pieces"}
                  </span>
                </div>
                <Button
                  variant={
                    selectedDessert?._id === dessert._id ? "accent" : "primary"
                  }
                  className="w-full"
                  onClick={() => handleSelect(dessert)}
                >
                  {selectedDessert?._id === dessert._id ? "Selected" : "Select"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="accent" onClick={handleContinue}>
          {selectedDessert ? "Continue to Cart" : "Skip Dessert"}
        </Button>
      </div>
    </div>
  );
}

export default Desserts;
