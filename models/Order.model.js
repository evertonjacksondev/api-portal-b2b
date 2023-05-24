const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    orderId: {
      type: String,
      required: [false, "orderId is required."],
    },
    status: {
      type: String,
      required: [false, "Status is required."],
    },
    cliente: {
      type: Object,
      required: [false, "cliente is required."],
    },
    transport: {
      type: String,
      required: [false, "transport is required."],
    },
    message: {
      type: String,
      required: [false, "message is required."],
    },
    paymentTime: {
      type: String,
      required: [false, "paymentTime is required."],
    },
    payment: {
      type: String,
      required: [false, "payment is required."],
    },
    items: {
      type: Array,
      required: [false, "items is required."],
    },
  },
  {

    timestamps: true,
  }

);

const Order = model("Order", userSchema);

module.exports = Order;
