import { User } from "../models/User.js";
export class CreateUserDto {
    name;
    email;
    password;
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    toEntity() {
        const user = new User();
        user.name = this.name;
        user.email = this.email;
        user.password = this.password;
        return user;
    }
}
