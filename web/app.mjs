import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

// const HOST = "0.0.0.0";
const PORT = 2222;

const methodNotAllowed = (req, res, next) => res.status(405).send();

// connect to the DB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://mongodb:27017/users");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// create the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter task name"],
    trim: true,
    maxlength: [20, "max length: 20 letters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// create the model

const User = mongoose.model("User", userSchema);

// トップページ
app
  .route("/")
  .get((req, res) => {
    res.render("index.ejs");
  })
  .all(methodNotAllowed);

// 新規登録
app
  .route("/signup")
  .get((req, res) => {
    res.render("signup.ejs");
  })
  .post((req, res) => {
    //登録処理
  });

// ログイン画面
app
  .route("/login")
  .get((req, res) => {
    res.render("login.ejs");
  })
  .post((req, res) => {
    if (true) {
      // 認証成功
      res.render("index.ejs", { name: "User" });
    } else {
      // 認証失敗
      res.render("index.ejs").status(401);
    }
    res.send("Welcome to about page");
  })
  .all(methodNotAllowed);

app.post("/api/v1/login", (req, res) => {
  if (true) {
    // 認証成功
    res.render("index.ejs", { name: "User" });
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
