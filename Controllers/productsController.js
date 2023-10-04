const Product = require("../Models/productsModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const getData = await Product.find({state: true});
  res.status(200).json(getData);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity, img, state } = req.body;
  const dataProduct = { name, description, price, quantity, img, state };
  const productExists = await Product.findOne({ name: req.body.name });

  if (req.user.admin) {
    if (productExists) {
      res.status(400).json({
        message: "Product already exists",
      });
    }

    if (!name || !description || !price || !quantity) {
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

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, description, price, quantity, img, state } = req.body;
  const productData = { name, description, price, quantity, img, state };
  const productExists = await Product.findOne({ id: req.body._id });

  if (req.user.admin) {
    if (!productExists) {
      res.status(400).json({ message: "Product not found" });
    }

    if (!name && !description && !price && !quantity && !img && !state) {
      res.status(400);
      throw new Error("Please provide information to update the product");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Product updated successfuly", updatedProduct });
  } else {
    res
      .status(401)
      .json({ message: "You dont have the permissions to update" });
    throw new Error("Authorization denied");
  }
});

const softDeleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const productToDelete = await Product.findById({ _id: id });
  if (req.user.admin) {
    if (!productToDelete.state) {
      res.status(400).json({ message: "This product is already deleted" });
    }
    const deletedProduct = await Product.findByIdAndUpdate(id, {
      state: false,
    });
    res.status(200).json({ message: "Product deleted succesfully" });
  } else {
    res.status(201).json({
      message: "You dont have the permissions to delete this product",
    });
  }
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  softDeleteProduct,
};
