import { CreateUserDto } from "../dto/create-user-dto.js";
import { LoginDto } from "../dto/login-dto.js";
import { User } from "../models/User.js"
import * as userRepository from "../repositories/userRepository.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const findByEmail = async (email: string): Promise<User> => {
    const user = await userRepository.findOneByEmail(email);

    if (!user) {
        throw new Error(`User with email ${email} not found`);
    }

    return user;
}

/***
 * 사용자 저장
 * 
 * 사용자의 이름, 이메일, 비밀번호가 모두 있는지 확인하고,
 * 이메일이 중복되지 않는지 확인한 후, 비밀번호를 해시화하여
 * 사용자 정보를 저장합니다.
 */
export const save = async (user: CreateUserDto): Promise<User> => {
    // 입력된 사용자의 이름, 이메일, 비밀번호가 모두 있는지 확인
    if (!user.name || !user.email || !user.password) {
        throw new Error("User name, email, and password are required");
    }

    // 이메일이 이미 존재하는지 확인
    // findOneByEmail 메서드를 사용하여 이메일로 사용자 검색
    // 만약 존재한다면 에러를 던짐
    const existUser = await userRepository.findOneByEmail(user.email);
    if (existUser) {
        throw new Error(`User with email ${user.email} already exists`);
    }

    // 존재하지 않는다면 비밀번호를 해시하고 저장
    // bcrypt를 사용하여 비밀번호 해시
    // userRepository.save 메서드를 사용하여 사용자 저장
    // 저장된 사용자 엔티티를 반환
    user.password = bcrypt.hashSync(user.password, 10);

    return await userRepository.save(user.toEntity());
}

export const login = async (loginDto: LoginDto): Promise<string> => {
    // 이메일로 사용자 검색
    const user = await userRepository.findOneByEmail(loginDto.email);

    // 사용자가 존재하지 않으면 에러를 던짐
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // 입력된 비밀번호와 저장된 비밀번호를 비교
    const isPasswordValid = bcrypt.compareSync(loginDto.password, user.password);

    // 비밀번호가 일치하지 않으면 에러를 던짐
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        "jwt_secret_key_abcdefghijklmnopqrstuvwxyz", // 비밀 키는 환경 변수로 관리하는 것이 좋습니다.
        { expiresIn: "1d" }
    );

    return token;
}

export const verifyToken = async (token: string): Promise<User> => {
    const decoded =
        jwt.verify(token, "jwt_secret_key_abcdefghijklmnopqrstuvwxyz") as { id: string, email: string };
    const user = await findByEmail(decoded.email);
   

    if (!user) {
        throw new Error("Invalid token");
    }

    return user;
}