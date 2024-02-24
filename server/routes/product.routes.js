import express from "express";
import { isAdmin, isUser } from "../utils/authentication.middleware.js";
import { productValidationSchema } from "../validation/product.validation.js";
import Product from "../model/product.model.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import mongoose from "mongoose";

const router = express.Router();

// to add data
router.post(
  "/product/add",
  validateReqBody(productValidationSchema),
  isUser,

  async (req, res) => {
    const newProduct = req.body;
    newProduct.email = req.logInUserId;
    await Product.create(newProduct);
    return res.status(200).send({ message: "Product added successfully." });
  }
);

// to edit the data
router.put("/product/edit/:id", async (req, res) => {
  const productId = req.params.id;

  const isValidMongoId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidMongoId) {
    return res.status(401).send({ message: "Invalid mongoId...." });
  }

  const requiredProduct = Product.findOne({ _id: productId });

  if (!requiredProduct) {
    return res.status(402).send({ message: "No such product found..." });
  }

  const newValue = req.body;
  await Product.updateOne({ _id: productId }, { $set: { ...newValue } });

  return res
    .status(201)
    .send({ message: "Product is Updated successfully......" });
});

// to get product details by their id
router.get("/product/details/:id", async (req, res) => {
  const productId = req.params.id;

  const isValidMongoId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidMongoId) {
    return res.status(401).send({ message: "Invalid MongoId..." });
  }

  const requiredProduct = await Product.findOne({ _id: productId });

  if (!requiredProduct) {
    return res.status(401).send({ message: "Product is not found..." });
  }

  return res.status(201).send({
    message: "Here's the product you searched...",
    product: requiredProduct,
  });
});

// to delete the product by their id
router.delete("/product/delete/:id", async (req, res) => {
  const productId = req.params.id;

  const isValidMongoId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidMongoId) {
    return res.status(401).send({ message: "Invalid MongoId...." });
  }

  const requiredProduct = Product.findOne({ _id: productId });

  if (!requiredProduct) {
    return res.status(401).send({ message: "Product not found..." });
  }

  await Product.deleteOne({ _id: productId });
  return res
    .status(201)
    .send({ message: "Product has been deleted successfully." });
});

// get product list for Admin
router.get("/product/list", isAdmin, async (req, res) => {
  const productList = await Product.find();
  return res
    .status(201)
    .send({ message: "Here are the Products..", product: productList });
});

export default router;
