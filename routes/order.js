const Order = require("../model/order");
const router = require("express").Router();

// create order ----------------------------
router.post("/create", async (req, res) => {
  try {
    const order = new Order({ ...req.body });
    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  } catch (error) {
    const errorType = error.name;

    if (errorType === "ValidationError") {
      res.status(422).json({ message: error.message });
    } else if (errorType === "MongoServerError") {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// update order ----------------------------
router.post("/update", async (req, res) => {
  try {
    const data = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: data.order_id },
      { $set: data },
      { new: true }
    );

    if (updatedOrder === null) {
      return res
        .status(404)
        .json({ order_id: data.order_id, message: "order_id does not exist" });
    }
    return res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// list all orders by order_date ----------------------------
router.get("/list", async (req, res) => {
  try {
    const { order_date } = req.query;
    if (order_date) {
      const orders = await Order.find({ order_date });
      return res.status(200).json(orders);
    }
    return res.status(422).json({
      message: "provide order_date (query param) in yyyy/mm/dd format",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// find an order by order_id ----------------------------
router.get("/search", async (req, res) => {
  try {
    const { order_id } = req.query;

    const order = await Order.findOne({ order_id });
    if (order === null) {
      return res
        .status(404)
        .json({ order_id, message: "order_id does not exist" });
    }
    return res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete an order by order_id ----------------------------
router.delete("/delete", async (req, res) => {
  try {
    const { order_id } = req.query;

    const order = await Order.findOneAndDelete({ order_id });
    if (order === null) {
      return res
        .status(404)
        .json({ order_id, message: "order_id does not exist" });
    }
    return res.status(200).json({ message: "order removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
