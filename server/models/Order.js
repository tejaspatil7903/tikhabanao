import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: function () {
            return !this.isExtraItem; // menuItem is required only if it's not an extra item
          },
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        isExtraItem: {
          type: Boolean,
          default: false, // Mark extra items with this flag
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "out-for-delivery", "delivered"],
      default: "pending",
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    deliveryInstructions: String,
    deliveryPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
