const Order = require("../model/order");

const router = require("express").Router();

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

module.exports = router;
