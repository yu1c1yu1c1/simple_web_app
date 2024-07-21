// DBユーザーの作成
db.createUser({
  user: "dbUser",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "app",
    },
  ],
});

// "users"コレクションを作成
db.createCollection("users");

// "users"コレクションにデータを追加
db.runCommand({
  insert: "users",
  documents: [
    {
      username: "admin",
      password: "admin",
    },
    {
      username: "user1",
      password: "user1",
    },
  ],
});
