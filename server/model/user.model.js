import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max_length: 25,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    max_length: 25,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    max_length: 55,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["User", "Admin"],
  },
});

// create a table
const User = mongoose.model("User", userSchema);
export default User;
