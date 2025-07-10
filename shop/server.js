import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import engine from 'ejs-locals'

// __dirname을 ESM에서 사용하는 방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express 애플리케이션 생성
const app = express();

// 뷰 엔진 설정
app.engine('ejs', engine); // ejs-locals 등록
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// 라우팅
app.get("/", (request, response) => {
    response.render("home", { title: "SHOPPING MALL" });
});

// 서버 실행
app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});
