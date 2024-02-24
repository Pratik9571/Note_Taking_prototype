import express from "express";
import connectDB from "./Database/connect.mongodb.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// to make app understand json
app.use(express.json());

// register the routes
app.use(userRoutes);
app.use(productRoutes);

// Connecting to the Database
connectDB();

const PORT = 7979;
app.listen(PORT, (req, res) => {
  console.log(`App is listening under port ${PORT}.`);
});
