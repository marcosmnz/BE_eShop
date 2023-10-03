const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Models/usersModel");
const { json } = require("express");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, admin, state, address } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Faltan datos");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("El email está registrado");
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    admin,
    state,
    address,
  });

  if (user) {
    res.status(200).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("Algo salió mal registrando al usuario");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Faltan datos");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "Usuario logeado",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Credenciales incorrectas");
  }
});
const getUserData = asyncHandler(async (req, res) => {
  // res.json({message: "User data"})
  res.json(req.user);
});

const updateUserData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    res.json({ message: "El usuario no fue encontrado" });
  }
  const userUpdated = await User.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json({
    message: "Usuario modificado con exito",
    ok: true,
    userUpdated
  })
  
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60m",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  updateUserData,
};
