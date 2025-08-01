import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "expressdb",
    synchronize: true,
    logging: false,
    entities: [
        User
    ],
    migrations: [],
    subscribers: [],
});