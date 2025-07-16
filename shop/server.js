import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import engine from 'ejs-locals'
import "./db.js"
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import userRouter from "./routes/user.js";
import itemRouter from "./routes/item.js";
import adminRouter from "./routes/admin.js";
import cartRouter from "./routes/cart.js";
import Item from "./models/Item.js";

// __dirname을 ESM에서 사용하는 방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Redis 클라이언트 생성
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Express 애플리케이션 생성
const app = express();

// 뷰 엔진 설정
app.engine('ejs', engine); // ejs-locals 등록
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 세션 관리 (RedisStore 적용)
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7일
    }
}));

// 라우팅
app.get("/", async (request, response) => {
    try {
        const products = await Item.find({});
        response.render("home", { title: "SHOPPING MALL", products, user: request.session.user });
    } catch (err) {
        response.render("home", { title: "SHOPPING MALL", products: [], user: request.session.user, error: err.message });
    }
});

app.use("/user", userRouter);
app.use("/item", itemRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
// 서버 실행
app.listen(8000, () => {
    console.log("🚀 Server is running on http://localhost:8000");
});