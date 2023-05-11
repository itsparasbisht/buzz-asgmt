const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const Orders = new Schema(
  {
    order_id: {
      type: Number,
      unique: true,
      required: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    order_date: {
      type: Date,
      required: true,
    },
    delivery_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

Orders.plugin(uniqueValidator);
module.exports = mongoose.model("orders", Orders);
