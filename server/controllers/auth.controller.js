import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Add these new controller functions to the existing file

export const removeDeliveryPerson = async (req, res) => {
  try {
    const { id } = req.params;

    const deliveryPerson = await User.findById(id);
    if (!deliveryPerson || deliveryPerson.role !== "delivery") {
      return res.status(404).json({ message: "Delivery person not found" });
    }

    // Check if they have any active orders
    if (deliveryPerson.currentOrders.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot remove delivery person with active orders" });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "Delivery person removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDeliveryPersons = async (req, res) => {
  try {
    const deliveryPersons = await User.find({ role: "delivery" })
      .select("-password")
      .populate("currentOrders");
    res.json(deliveryPersons);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminCode } = req.body;

    // Check if admin code matches (you should store this securely)
    if (adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
      return res
        .status(401)
        .json({ message: "Invalid admin registration code" });
    }

    const adminExists = await User.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const registerDeliveryPerson = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Check if the delivery person already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create delivery person user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "delivery", // Set role as 'delivery'
    });

    res
      .status(201)
      .json({ message: "Delivery person registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};