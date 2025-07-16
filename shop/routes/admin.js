import express from "express";
import {hasAdminRole} from "../middlewares/authentication.js";
import User from "../models/User.js";
import Item from "../models/Item.js";

const adminRouter = express.Router();
const usersRouter = express.Router();

// 관리자 인증 미들웨어 전체 적용
adminRouter.use(hasAdminRole);

// 사용자 목록 및 단일 사용자 조회
usersRouter
    .route("/")
    .get(async (req, res) => {
        try {
            const users = await User.find({});
            const result = users.map((user, idx) => {
                return {
                    username: user.username,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    cart: user.cart,
                }
            })

            res.json(result);
        } catch (error) {
            res.status(500).json({ message: "서버 오류" });
        }
    });

usersRouter
    .route("/:id")
    .get(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: "사용자 없음" });
            res.json({
                username: user.username,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                cart: user.cart,
            });
        } catch (error) {
            res.status(500).json({ message: "서버 오류" });
        }
    })
    .patch(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: "사용자 없음" });
            const {birth, gender} = req.body;

            await User.updateOne({username: user.name}, {$set: {birth, gender}})

            res.json({
                username: user.username,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                cart: user.cart,
            });
        } catch (error) {
            res.status(500).json({ message: "서버 오류" });
        }
    })
    .delete(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: "사용자 없음" });

            await User.deleteOne({username: user.username});
        }catch (error) {
            res.status(500).json({ message: "서버 오류" });
        }
    })

// /admin/users 하위 라우터 연결
adminRouter.use("/users", usersRouter);

// 관리자 홈
adminRouter.route("/")
    .get(async (req, res) => {
        try {
            const users = await User.find({});
            const products = await Item.find({});
            res.render("admin", {
                title: "WELCOME ADMIN PAGE",
                user: req.session.user,
                users: users, 
                products: products,
                error: null,
            });
        } catch (error) {
            res.status(500).json({ message: "서버 오류" });
        }
    });

adminRouter.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});
adminRouter.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "사용자 없음" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});
// 사용자 수정 (API)
adminRouter.patch("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: "사용자 없음" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});
// 사용자 삭제 (API)
adminRouter.delete("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "사용자 없음" });
        res.json({ message: "삭제 완료" });
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});
// 상품 목록 (API)
adminRouter.get("/api/products", async (req, res) => {
    try {
        const products = await Item.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});
// 상품 상세 (API)
adminRouter.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Item.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "상품 없음" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});
// 상품 수정 (API)
adminRouter.patch("/api/products/:id", async (req, res) => {
    try {
        const product = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "상품 없음" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});
// 상품 삭제 (API)
adminRouter.delete("/api/products/:id", async (req, res) => {
    try {
        const product = await Item.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "상품 없음" });
        res.json({ message: "삭제 완료" });
    } catch (error) {
        res.status(500).json({ message: "서버 오류" });
    }
});

export default adminRouter;