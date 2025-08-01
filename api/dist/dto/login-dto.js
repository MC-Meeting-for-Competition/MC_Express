export class LoginDto {
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
