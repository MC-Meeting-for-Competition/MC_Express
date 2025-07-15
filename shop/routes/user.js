import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Item from "../models/Item.js";

const userRouter = express.Router();

userRouter.get("/register", (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    res.render("register", { title: "REGISTER USER", user: null, error: null })
})

userRouter.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.render("register", { title: "REGISTER USER", user: null, error: "모든 필드를 입력하세요." });
        }
        // username/email 중복 체크
        const existingUser = await User.findOne({ $or: [ { email }, { username } ] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.render("register", { title: "REGISTER USER", user: null, error: "이미 사용 중인 이메일입니다." });
            } else {
                return res.render("register", { title: "REGISTER USER", user: null, error: "이미 사용 중인 아이디입니다." });
            }
        }
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (!email_regex.test(email)) {
            return res.render("register", { title: "REGISTER USER", user: null, error: "올바르지 않은 이메일 형식입니다." });
        }
        // 비밀번호 해시
        const hashedPassword = await bcrypt.hash(password, 10);
        // 유저 생성
        const user = new User({
            username,
            email,
            password: hashedPassword
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
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
        return res.render("login", { title: "LOGIN", user: null, error: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }
    const isCorrectPassword = await bcrypt.compare(password, findUser.password);
    if (!isCorrectPassword) {
        return res.render("login", { title: "LOGIN", user: null, error: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }
    req.session.user = {
        id: findUser._id,
        email: findUser.email,
        username: findUser.username
    }
    // 로그인 성공 시 홈으로 리다이렉트
    return res.redirect("/");
})

userRouter.get("/logout", (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ message: "올바르지 않은 접근입니다." });
    }
    req.session.destroy((err) => {
        if (err) {
            console.log('서버 에러가 발생했습니다.');
            return res.status(500).json({ message: "서버 에러가 발생했습니다." });
        }
        return res.redirect("/");
    })
})

export default userRouter;