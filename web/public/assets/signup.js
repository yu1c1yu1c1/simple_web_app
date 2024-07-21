const loginBtn = document.getElementsById("signupBtn");
const usernameInputDOM = document.getElementsById("username");
const passwordInputDOM = document.getElementsById("password");

loginBtn.addEventlistner("submit", async (event) => {
  event.preventDefault();

  const data = {
    username: usernameInputDOM.value,
    password: passwordInputDOM.value,
  };
  try {
    await axios
      .post("/signup", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({ data }) => {
        console.log(data);
      });
  } catch (err) {
    console.log(err);
  }
});
