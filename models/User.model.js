const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    type: {
      type: String,
      required: [true, "type is required."],
    },
    codigo: {
      type: String,
      required: [true, "codigo is required."],

    }, isActive: {
      type: Boolean,
      required: [false],
    },
    secret: {
      type: String,
      required: [false, "secret is required."],
    },
    geolocation: {
      type: Array,
      required: [false],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
