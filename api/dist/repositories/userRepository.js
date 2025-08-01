import { AppDataSource } from "../data-source.js";
import { User } from "../models/User.js";
const userRepository = AppDataSource.getRepository(User);
export const findOneByEmail = async (email) => {
    return await userRepository.findOne({
        where: { email }
    });
};
export const save = async (user) => {
    return await userRepository.save(user);
};
export const findAll = async () => {
    return await userRepository.find();
};
export const findById = async (id) => {
    return await userRepository.findOne({
        where: { id }
    });
};
