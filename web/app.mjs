import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

// const HOST = "0.0.0.0";
const PORT = 2222;

const methodNotAllowed = (req, res, next) => res.status(405).send();


// DB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/users');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// トップページ
app
  .route("/")
  .get((req, res) => {
    res.render("index.ejs");
  })
  .all(methodNotAllowed);

// ログイン画面
app
  .route("/login")
  .get((req, res) => {
    res.render("login.ejs");
  })
  .all(methodNotAllowed);

app.post("/api/v1/login", (req, res) => {
  if (true) {
    // 認証成功
    res.render("index.ejs", { name:"User"});
  } else {
    // 認証失敗
    res.render("index.ejs").status(401);
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
