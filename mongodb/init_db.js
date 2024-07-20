db.createUser({
    user: "user",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "nginx-node-mongo-docker-example",
      },
    ],
  })