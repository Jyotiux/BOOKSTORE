import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const getUserId = (req) => (req.user?.id || req.user?._id)?.toString();

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const userId = getUserId(req);
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      status: "pending",
    });

    await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders (admin) or user orders
export const getOrders = async (req, res) => {
  try {
    const userId = getUserId(req);
    const filter = req.user.role === "admin" ? {} : { userId };
    const orders = await Order.find(filter).populate("items.bookId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!["pending","confirmed","shipped","delivered"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
