import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    max_length: 50,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    max_length: 150,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
