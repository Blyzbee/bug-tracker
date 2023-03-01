import { login } from "./axios";

const connectionForm = document.getElementById("connection-form");

connectionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target[0].value;
  const password = e.target[1].value;
  login(username, password)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
});
