const mongoose = require("mongoose");
require("dotenv").config();
const main = async () => {
  try {
    const uri = process.env.DB_URI || "mongodb://localhost:27017/local_db";
    await mongoose.connect(uri);
    console.log("DB Connected");
  } catch (e) {
    console.error(e);
  }
};
main();
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: String,
  updated_at: String,
});
const User = mongoose.model("User", userSchema);
// Add functions that make DB calls here
const addUserHandler = async (req, h) => {
  try {
    const { name, email, password } = req.payload;
    const created_at = Date().toLocaleString();
    const updated_at = created_at;
    const newUser = User({ name, email, password, created_at, updated_at });
    await newUser.save();
    return h
      .response({
        status: "success",
        message: `User ${name} berhasil ditambahkan`,
      })
      .code(201);
  } catch (error) {
    if (error.code === 11000) {
      return h
        .response({
          status: "failed",
          message: `Email sudah terdaftar`,
        })
        .code(409);
    }
    return h
      .response({
        status: "failed",
        message: `Gagal menambahkan user`,
      })
      .code(500);
  }
};
const getUserHandler = async (_, h) => {
  try {
    const data = await User.find({});
    return h
      .response({
        status: "success",
        message: "Berhasil mendapatkan data",
        data: data,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: "failed",
        message: "Gagal mendapatkan data",
        data: data,
      })
      .code(404);
  }
};

const getUserByIDHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    return h
      .response({
        status: "success",
        message: "Berhasil mendapatkan data",
        data: data,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: "failed",
        message: "Gagal mendapatkan data",
        data: data,
      })
      .code(404);
  }
};
const updateUserHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.payload;
    const updated_at = Date().toLocaleString();
    await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
      updated_at,
    });
    return h
      .response({
        status: "success",
        message: "Berhasil mengupdate data",
      })
      .code(200);
  } catch (error) {
    if (error.code === 11000) {
      return h
        .response({
          status: "failed",
          message: `Email sudah terdaftar`,
        })
        .code(409);
    }
    return h
      .response({
        status: "failed",
        message: "Gagal mengupdate data",
        data: data,
      })
      .code(404);
  }
};
const deleteUserHandler = async (req, h) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return h
      .response({
        status: "success",
        message: "Berhasil menghapus data",
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: "failed",
        message: "Gagal menghapus data",
        data: data,
      })
      .code(404);
  }
};
module.exports = {
  addUserHandler,
  getUserHandler,
  getUserByIDHandler,
  updateUserHandler,
  deleteUserHandler,
};
