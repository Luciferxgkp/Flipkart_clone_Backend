const cart = require("../models/cart");
const Order = require("../models/order");
const Cart = require("../models/cart");
exports.addOrder = (req, res) => {
  Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
    if (result) {
      req.body.user = req.user._id;
      req.body.orderStatus=[
        {
          type:"ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type:"packed",
          isCompleted: false,
        },
        {
          type:"shipped",
          isCompleted: false,
        },
        {
          type:"delivered",
          isCompleted: false,
        }
      ];
      const order = new Order(req.body);
      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) return res.status(201).json({ order });
      });
    }
  });
};

exports.getOrder = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus items")
    .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) return res.status(200).json({ orders });
    });
};