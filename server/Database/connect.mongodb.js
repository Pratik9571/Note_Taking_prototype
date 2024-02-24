import mongoose from "mongoose";

const dbName = "Subscription";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://praatik:pratik11@cluster0.lpem50d.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export default connectDB;
