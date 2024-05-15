import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema(
  {
    products: [ProductSchema], // Array of products within the order
    total: {
      type: Number,
      required: true,
    },
    CName: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    PaymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
