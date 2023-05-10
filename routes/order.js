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

module.exports = router;
