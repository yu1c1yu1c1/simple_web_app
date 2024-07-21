import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

// const HOST = "0.0.0.0";
const PORT = 2222;

const methodNotAllowed = (req, res, next) => res.status(405).send();

// connect to the DB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// create the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "enter username"],
    trim: true,
    maxlength: [20, "max length: 20 letters"],
  },
  password: {
    type: String,
    required: [true, "enter password"],
    trim: true,
    minlength: [4, "min length: 4 letters"],
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
  .post(async (req, res) => {
    //登録処理
    try {
      const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
      });

      const user = await newUser.save();

      return res.status(200).json(user);
      // 成功した場合はlogin.ejsへ
      // const res = await User.create(req.body.username, req.body.password);
      // res.json(res).status(200);
      // res.render("login.ejs").status(200);
    } catch (err) {
      // 失敗した場合はsignup.ejsへ

      res.status(500).json(err);
      // res.render("signup.ejs").status(500);
    }
  });

// ログイン画面
app
  .route("/login")
  .get((req, res) => {
    res.render("login.ejs");
  })
  .post((req, res) => {
    try {
      const tmpUser = User.find({ username: req.body.username });

      if (req.body.password === tmpUser.password) {
        // 認証成功
        res.json({ name: tmpUser.username });
        // res.render("index.ejs", { name: tmpUser.username });
      } else {
        // 認証失敗
        res.json({ msg: "no user" }).status(401);
        // res.render("index.ejs").status(401);
      }
    } catch (err) {
      res.json(err).status(500);
    }
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
