import { CreateUserDto } from "../dto/create-user-dto.js";
import * as userService from "../services/userService.js";
import { LoginDto } from "../dto/login-dto.js";
export const createUserHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userDto = new CreateUserDto(name, email, password);
        const user = await userService.save(userDto);
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        console.error("Unexpected error:", error);
    }
};
export const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginDto = new LoginDto(email, password);
        const token = await userService.login(loginDto);
        res.status(200).json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        console.error("Unexpected error:", error);
    }
};
export const getUserInfoHandler = async (req, res) => {
    try {
        const token = req.headers.authorization || "";
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        const withoutBearer = token.replace("Bearer ", "");
        const result = await userService.verifyToken(withoutBearer);
        return res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        console.error("Unexpected error:", error);
    }
};
