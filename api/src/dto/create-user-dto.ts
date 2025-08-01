import { User } from "../models/User.js";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    toEntity(): User {
        const user = new User();
        user.name = this.name;
        user.email = this.email;
        user.password = this.password;
        return user;
    }
}