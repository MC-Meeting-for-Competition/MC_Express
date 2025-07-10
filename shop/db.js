import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    mongoose.connection.once("open", () => {
        console.log("🌉 MongoDB is connected.");
    });
} catch (error) {
    console.error(`MongoDB Connection Error : ${error}`);
}