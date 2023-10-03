const { mongoose, Schema } = require("mongoose");

const AdressSchema = Schema({
  street: {
    type: String,
  },
  number: {
    type: Number,
  },
  city: {
    type: String,
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: AdressSchema,
    },
    admin: {
      type: Boolean,
      default: false
    },
    state: {
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
