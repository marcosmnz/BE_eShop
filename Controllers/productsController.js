const Product = require("../Models/productsModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const getData = await Product.find();
  res.status(200).json(getData);
});

const createProduct = asyncHandler(async (req, res) => {
  if (req.user.admin) {
    const { name, description, price, quantity, img, state } = req.body;
    const dataProduct = { name, description, price, quantity, img, state };
    const productExists = await Product.findOne({ name: req.body.name });

    if (productExists) {
      res.status(400).json({
        message: "Product already exists",
      });
    }

    if (!req.body) {
      throw new Error("Please fill all fields");
    } else if (!name || !description || !price || !quantity) {
      throw new Error(
        "Fields name, description, price and quantity are required"
      );
    }
    const productCreated = await Product.create(dataProduct);
    res.status(201).json({
      message: "Product created successfully",
      productCreated,
    });
  } else {
    res
      .status(400)
      .json({ message: "You dont have authotization to create a product" });
  }
});

module.exports = {
  getProducts,
  createProduct,
};
