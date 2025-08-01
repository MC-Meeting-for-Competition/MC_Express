import { AppDataSource } from "../data-source.js";
import { User } from "../models/User.js";

const userRepository = AppDataSource.getRepository(User);

export const findOneByEmail = async (email: string): Promise<User | null> => {
    return await userRepository.findOne({
        where: {email}
    });
};

export const save = async (user : User): Promise<User> => {
    return await userRepository.save(user);
}

export const findAll = async (): Promise<User[]> => {
    return await userRepository.find();
};

export const findById = async (id: number): Promise<User | null> => {
    return await userRepository.findOne({
        where: {id}
    });
};