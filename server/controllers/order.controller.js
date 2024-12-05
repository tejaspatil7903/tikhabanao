import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js"; // Import MenuItem model to fetch item details
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, phone, deliveryInstructions } =
      req.body;

    // Validate required fields
    if (!items || !totalAmount || !deliveryAddress || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate items and calculate total amount
    let calculatedTotalAmount = 0;
    for (const item of items) {
      if (!item.isExtraItem) {
        // Check if the menuItem exists for non-extra items
        const menuItem = await MenuItem.findById(item.menuItem);
        if (!menuItem) {
          return res
            .status(400)
            .json({ message: `Menu item with ID ${item.menuItem} not found` });
        }
      }

      // Calculate the total amount
      calculatedTotalAmount += item.price * item.quantity;
    }

    const finalTotalAmount = totalAmount || calculatedTotalAmount;

    // Create the order in the database
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount: finalTotalAmount,
      deliveryAddress,
      phone,
      deliveryInstructions,
      status: "pending",
    });

    // Populate the menuItem details for non-extra items
    await order.populate("items.menuItem");

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const query = {};

    if (req.user.role === "user") {
      query.user = req.user._id;
    } else if (req.user.role === "delivery") {
      query.deliveryPerson = req.user._id;
    }

    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.menuItem") // Ensure menuItems are populated here
      .populate("deliveryPerson", "name")
      .sort("-createdAt");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.menuItem") // Ensure menuItems are populated here as well
      .populate("deliveryPerson", "name");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    if (status === "out-for-delivery" && req.user.role === "delivery") {
      order.deliveryPerson = req.user._id;
    }

    await order.save();
    await order.populate("user", "name email");
    await order.populate("items.menuItem"); // Ensure menuItem details are populated here
    await order.populate("deliveryPerson", "name");

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
