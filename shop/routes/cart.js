import express from "express";
import User from "../models/User.js";
import Item from "../models/Item.js";
import { isAuthentication } from "../middlewares/authentication.js";

const cartRouter = express.Router();

// DB 기반 장바구니: User 모델의 cart 필드만 사용
cartRouter.get("/", isAuthentication, async (req, res) => {
    const user = await User.findOne({ username: req.session.user.username }).populate("cart.item");
    if (!user) return res.status(404).send("사용자를 찾을 수 없습니다.");
    const cart = (user.cart || []).map(entry => ({
        id: entry.item._id,
        name: entry.item.name,
        price: entry.item.price,
        quantity: entry.quantity
    }));
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.render("cart", { title: "장바구니", cart, totalPrice, user: req.session.user });
});

cartRouter.post("/add", isAuthentication, async (req, res) => {
    const { productId } = req.body;
    const user = await User.findOne({ username: req.session.user.username });
    const item = await Item.findById(productId);
    if (!item) return res.status(404).send("상품을 찾을 수 없습니다.");
    if (item.stock <= 0) return res.status(400).send("재고가 없습니다.");
    const cartItem = user.cart.find(entry => entry.item.equals(item._id));
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        user.cart.push({ item: item._id, quantity: 1 });
    }
    item.stock -= 1;
    await item.save();
    await user.save();
    res.redirect("/cart");
});

cartRouter.post("/remove", isAuthentication, async (req, res) => {
    const { productId } = req.body;
    const user = await User.findOne({ username: req.session.user.username });
    const cartEntry = user.cart.find(entry => entry.item.equals(productId));
    if (cartEntry) {
        const item = await Item.findById(productId);
        if (item) {
            item.stock += cartEntry.quantity;
            await item.save();
        }
    }
    user.cart = user.cart.filter(entry => !entry.item.equals(productId));
    await user.save();
    res.redirect("/cart");
});

export default cartRouter;
