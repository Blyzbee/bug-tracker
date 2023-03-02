const apiURL = "http://greenvelvet.alwaysdata.net/bugTracker/api";

const connectionForm = document.getElementById("connection-form");
const inscriptionBtn = document.getElementById("inscription-btn");
const inscriptionDiv = document.getElementById("inscription-div");
const connexionTitle = document.getElementById("connexion-title");

let inscription = false;

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
  let res;
  if (inscription) {
    res = await fetch(`${apiURL}/signup/${username}/${password}`);
  } else {
    res = await fetch(`${apiURL}/login/${username}/${password}`);
  }

  console.log(res);
});
