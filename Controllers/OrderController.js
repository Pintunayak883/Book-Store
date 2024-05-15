import { Order } from "../models/OrderSchema.js";

class OrderController {
  static Order = async (req, res) => {
    const { products, total, CName, Address, PaymentId } = req.body;

    try {
      // Create a new order instance using the data from the request body
      const newOrder = new Order({
        products,
        total,
        CName,
        Address,
        PaymentId,
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();

      // Respond with the saved order
      res
        .status(201)
        .json({ message: "Order Placed Successfully", savedOrder });
    } catch (error) {
      // If an error occurs, respond with a 500 status code and the error message
      return res.status(500).json({ error: error.message });
    }
  };

  static GetAllOrders = async (req, res) => {
    try {
      // Retrieve all orders from the database
      const orders = await Order.find();

      // Respond with the list of orders
      res.status(200).json(orders);
    } catch (error) {
      // If an error occurs, respond with a 500 status code and the error message
      return res.status(500).json({ error: error.message });
    }
  };
}

export default OrderController;
