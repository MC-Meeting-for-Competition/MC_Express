import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { isAuthentication } from "../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.get("/register", (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    res.render("register", { title: "REGISTER USER", user: null, error: null });
})

userRouter.post("/register", async (req, res) => {
    try {
        const { username, password, gender, birth } = req.body;
        if (!username || !password) {
            return res.render("register", { title: "REGISTER USER", user: null, error: "모든 필드를 입력하세요." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render("register", { title: "REGISTER USER", user: null, error: "이미 사용 중인 아이디입니다." });
        }

        // 비밀번호 해시
        const hashedPassword = await bcrypt.hash(password, 10);
        // 유저 생성
        const user = new User({
            username,
            password: hashedPassword,
            gender, 
            birth
        });
        await user.save();
        // 회원가입 성공 시 홈으로 리다이렉트
        return res.redirect("/");
    } catch (err) {
        return res.render("register", { title: "REGISTER USER", user: null, error: "서버 오류: " + err.message });
    }
});

userRouter.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    res.render("login", { title: "LOGIN", user: null, error: null })
})

userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    if (!findUser) {
        return res.render("login", { title: "LOGIN", user: null, error: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }
    const isCorrectPassword = await bcrypt.compare(password, findUser.password);
    if (!isCorrectPassword) {
        return res.render("login", { title: "LOGIN", user: null, error: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }
    req.session.user = {
        username: findUser.username,
        isAdmin: findUser.role === "admin",
        cart: []
    }
    // 로그인 성공 시 홈으로 리다이렉트
    return res.redirect("/");
})

userRouter.get("/logout", isAuthentication, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('서버 에러가 발생했습니다.');
            return res.status(500).json({ message: "서버 에러가 발생했습니다." });
        }
        return res.redirect("/");
    })
})

export default userRouter;