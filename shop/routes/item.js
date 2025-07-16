import express from "express";
import Item from "../models/Item.js";
import { hasAdminRole, isAuthentication } from "../middlewares/authentication.js";

const itemRouter = express.Router();

itemRouter.get("/", async (req, res) => {
    const items = await Item.find({});
    res.render("products", { title: "상품 목록", items, user: req.session.user });
});

// 상품 상세
itemRouter.get("/:id", async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("상품을 찾을 수 없습니다.");
    res.render("product-detail", { title: item.name, item, user: req.session.user });
});

// (관리자) 상품 등록 폼
itemRouter.get("/admin/new", hasAdminRole, (req, res) => {
    res.render("product-form", { title: "상품 등록", item: null, user: req.session.user });
});

// (관리자) 상품 등록
itemRouter.post("/admin/new", hasAdminRole, async (req, res) => {
    const { name, price, image, description, stock, category } = req.body;
    await Item.create({ name, price, image, description, stock, category });
    res.redirect("/products");
});

// (관리자) 상품 수정 폼
itemRouter.get("/admin/edit/:id", hasAdminRole, async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("상품을 찾을 수 없습니다.");
    res.render("product-form", { title: "상품 수정", item, user: req.session.user });
});

// (관리자) 상품 수정
itemRouter.post("/admin/edit/:id", hasAdminRole, async (req, res) => {
    const { name, price, image, description, stock, category } = req.body;
    await Item.findByIdAndUpdate(req.params.id, { name, price, image, description, stock, category });
    res.redirect("/products");
});

// (관리자) 상품 삭제
itemRouter.post("/admin/delete/:id", hasAdminRole, async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/products");
});

export default itemRouter;