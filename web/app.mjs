import express from "express";
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

// const HOST = "0.0.0.0";
const PORT = 2222;

const methodNotAllowed = (req, res, next) => res.status(405).send();

// トップページ
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.all("/", methodNotAllowed);

// ログイン画面
app.get("/login", (req, res) => {
  res.render("login.ejs");
});


app.post("/api/v1/login", (req, res) => {
  if (true) {
    // 認証成功
    res.render("index.ejs");
  } else {
    // 認証失敗
    res.render("index.ejs");
  }
  res.send("Welcome to about page");
});

// サーバー設定
const start = () => {
  app.listen(PORT, () => {
    // console.log(`Server started at ${HOST}:${PORT}`);
    console.log(`Server started at ${PORT}`);
  });
};

start();
