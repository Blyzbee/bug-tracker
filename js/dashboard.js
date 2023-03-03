const apiURL = "http://greenvelvet.alwaysdata.net/bugTracker/api";
const url = "http://localhost:5500";
const token = window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");

const errorMsg = document.getElementById("error-msg");

const setError = (error) => {
  errorMsg.innerHTML = error;
};

const checkUser = () => {
  if (!token || !userId) {
    alert("Erreur utilisateur, veuillez vous reconnecter");
    logout();
    return false;
  }
  return true;
};

// LOGOUT
const logout = () => {
  fetch(`${apiURL}/logout/${token}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.result.status !== "done") alert(data.result.message);
    })
    .catch((error) => alert(error));
  window.localStorage.setItem("token", "");
};

// TOGGLE ADD BUG DIV
const btnAddBug = document.getElementById("btn-add-bug");
const divAddBug = document.getElementById("add-bug");
const addBugForm = document.getElementById("add-bug-form");

btnAddBug.addEventListener("click", () => {
  divAddBug.style.display = "flex";
});

divAddBug.addEventListener("click", () => {
  divAddBug.style.display = "none";
});

addBugForm.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
});

// ADD BUG
addBugForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!checkUser()) return;
  const title = e.target[0].value;
  const message = e.target[1].value;
  if (!title || !message) {
    setError("Veuillez remplir tous les champs");
    return;
  }
  fetch(`${apiURL}/add/${token}/${userId}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => setError(error));
});
