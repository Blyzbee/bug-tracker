const apiURL = "http://greenvelvet.alwaysdata.net/bugTracker/api";
const url = "http://localhost:5500";
const token = window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");

// DATE PARSING
export const dateParser = (date) => {
  let newDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return newDate;
};

// FETCH ALL BUGS ON LOAD
document.addEventListener(
  "DOMContentLoaded",
  async () => {
    fetch(`${apiURL}/list/${token}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result.status !== "done")
          alert(
            "Impossible de récupérer la liste de bugs, veuillez vous reconnecter"
          );
        else displayBugs(data.result.bug);
      });
  },
  false
);

// DISPLAY ALL BUGS
const recapBugs = document.getElementById("recap-bugs");
const bugsList = document.getElementById("bugs-list");

const displayBugs = async (bugs) => {
  const allUsers = await getAllUsers();
  let bugCount = 0;
  let pendingBugs = 0;
  let doneBugs = 0;
  bugs.forEach((bug) => {
    bugCount++;
    if (bug.state === 1) pendingBugs++;
    else if (bug.state === 2) doneBugs++;
    let newBug = document.createElement("li");
    newBug.id = `bug-${bug.id}`;
    newBug.innerHTML = `
      <h2>${bug.title}</h2>
      <select id="bug-state">
        <option value="notDone" ${
          bug.state === 0 ? "selected" : ""
        }>En cours</option>
        <option value="pending" ${
          bug.state === 1 ? "selected" : ""
        }>En cours</option>
        <option value="done" ${
          bug.state === 2 ? "selected" : ""
        }>Traité</option>
      </select>
      <span class="material-symbols-outlined"> close </span>
      <p>${bug.description}</p>
      <span>${bug.user_id}</span>
      <span>${dateParser(bug.timestamp)}</span>
    `;
    bugsList.appendChild(newBug);
  });
  recapBugs.innerHTML = `${bugCount} bugs, ${pendingBugs} en cours, ${doneBugs} traité${
    doneBugs > 1 ? "s" : ""
  }`;
};

// DISPLAY ERROR
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

// GET ALL USERS
const getAllUsers = async () => {
  await fetch(`${apiURL}/users/${token}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.result.status !== "done") return;
      console.log(data.result.user);
      return data.result.user;
    });
};

// LOGOUT
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => logout());

const logout = () => {
  fetch(`${apiURL}/logout/${token}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.result.status !== "done") alert(data.result.message);
    })
    .catch((error) => console.log(error));
  window.localStorage.setItem("token", "");
  window.localStorage.setItem("userId", "");
  window.location.replace(`${url}/`);
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
  fetch(`${apiURL}/add/${token}/${userId}`, {
    method: "POST",
    body: JSON.stringify({ title, message }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => setError(error));
});

// CHANGE BUGS DATA
const bugInput = document.getElementById("bug-state");

bugInput.addEventListener("change", (e) => {
  const state = Number(e.target.value);
  console.log(e);
  // fetch(`${apiURL}/state/${token}/${bugId}/${state}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
});

// DELETE BUG
