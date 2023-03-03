const apiURL = "http://greenvelvet.alwaysdata.net/bugTracker/api";
const url = "http://localhost:5500";

const connectionForm = document.getElementById("connection-form");
const inscriptionBtn = document.getElementById("inscription-btn");
const inscriptionDiv = document.getElementById("inscription-div");
const connexionTitle = document.getElementById("connexion-title");
const errorMsg = document.getElementById("error-msg");

let inscription = false;

// DISPLAY ERROR MESSAGE
const setError = (error) => {
  errorMsg.innerHTML = error;
};

// SWITCH BETWEEN INSCRIPTION AND CONNEXION
inscriptionBtn.addEventListener("click", () => {
  inscription ? (inscription = false) : (inscription = true);
  if (inscription) {
    connexionTitle.innerHTML = "Inscription";
    inscriptionBtn.innerHTML = "J'ai un compte";
    inscriptionDiv.style.display = "flex";
  } else {
    connexionTitle.innerHTML = "Connexion";
    inscriptionBtn.innerHTML = "Je n'ai pas de compte";
    inscriptionDiv.style.display = "none";
  }
});

// HANDLE CONNEXION AND INSCRIPTION
connectionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target[0].value;
  const password = e.target[1].value;
  const passwordConfirm = e.target[2].value;
  const userValid = verifyUsername(username);
  const passwordValid = verifyPassword(password);
  if (!userValid || !passwordValid) return;
  let data;
  try {
    if (inscription) {
      if (password !== passwordConfirm) {
        setError("Les mots de passes ne correspondent pas");
        return;
      }
      const response = await fetch(`${apiURL}/signup/${username}/${password}`);
      data = await response.json();
    } else {
      const response = await fetch(`${apiURL}/login/${username}/${password}`);
      data = await response.json();
    }
  } catch (error) {
    console.log(error);
    setError("Erreur inatendue, Veuillez réessayer plus tard");
  }

  if (data.result.status === "done") {
    setError("");
    window.localStorage.setItem("token", data.result.token);
    window.localStorage.setItem("userId", data.result.id);
    window.location.replace(`${url}/html/dashboard.html`);
  } else {
    setError(data.result.message);
  }
});

// VERIFY USERNAME
const verifyUsername = (username) => {
  if (!username) {
    setError("Veuillez entrez votre nom d'utilisateur");
    return false;
  }
  return true;
};

// VERIFY PASSWORD
const verifyPassword = (password) => {
  if (!password) {
    setError("Veuillez entrez votre mot de passe");
    return false;
  }
  return true;
};
