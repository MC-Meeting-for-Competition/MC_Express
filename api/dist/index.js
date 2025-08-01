import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import express from 'express';
import userRouter from "./routes/userRouter.js";
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    const app = express();
    app.use(express.json());
    app.use("/api/users", userRouter);
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
