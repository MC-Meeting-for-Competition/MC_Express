// Express 모듈 불러오기
const express = require("express");
const app = express();              // Express 애플리케이션 객체 생성
const PORT = 3000;                  // 서버 포트 설정

// 기본 미들웨어 설정
app.use(express.json());                             // JSON 형식 요청 파싱
app.use(express.urlencoded({ extended: true }));     // URL-encoded 형식 요청 파싱
app.use(express.static("public")); // 정적 파일 제공 (예: index.html, CSS 등)

// 메모리 기반 방명록 데이터 (실제 서비스라면 DB 사용 필요)
let guestbook = [];
let nextId = 1;

// [CREATE] 방명록 글 작성
app.post("/write", (req, res) => {
  const { name, content } = req.body;

  if (!name || !content) {
    return res.status(400).json({ message: "이름과 내용을 모두 입력해주세요." });
  }

  guestbook.push({ id: nextId++, name, content, likes: 0, comments: [] });
  res.redirect("/");
});

// [READ] 전체 방명록 조회
app.get("/guestbook", (req, res) => {
  res.status(200).json(guestbook);
});

// [UPDATE] 좋아요 수 증가
app.post("/likes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = guestbook.find(entry => entry.id === id);

  if (!item) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

  item.likes += 1;
  res.status(200).json({ message: "좋아요가 추가되었습니다.", likes: item.likes });
});

// [UPDATE] 댓글 추가
app.post("/comment/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, content } = req.body;
  const item = guestbook.find(entry => entry.id === id);

  if (!item) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

  item.comments.push({ name, content });
  res.status(200).json({ message: "댓글이 추가되었습니다.", comments: item.comments });
});

// [UPDATE] 글 수정
app.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, content } = req.body;
  const item = guestbook.find(entry => entry.id === id);

  if (!item) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

  item.name = name || item.name;
  item.content = content || item.content;

  res.status(200).json({ message: "게시글이 수정되었습니다.", entry: item });
});

// [DELETE] 글 삭제
app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = guestbook.findIndex(entry => entry.id === id);

  if (index === -1) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

  guestbook.splice(index, 1);
  res.status(200).json({ message: "게시글이 삭제되었습니다." });
});

// [READ] 초기 HTML 제공
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
