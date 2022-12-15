const touches = [...document.querySelectorAll("button")];
const listeKeyCode = touches.map((touche) => touche.dataset.key);

const afficheEcran = (grille, joueurActif) => {
  for (let i = 0; i < 42; i++) {
    if (grille[i] == 1) {
      document.getElementById("cell" + (i + 1)).style.backgroundColor =
        "rgb(237,206,69)";
    } else if (grille[i] == 2) {
      document.getElementById("cell" + (i + 1)).style.backgroundColor =
        "rgb(255,0,0)";
    } else {
      document.getElementById("cell" + (i + 1)).style.background =
        "rgb(255,255,255)";
    }
  }
  if (joueurActif == 1) {
    document.getElementById("jetonJouerJoueur1").style.visibility = "visible";
    document.getElementById("jetonJouerJoueur2").style.visibility = "hidden";
  } else {
    document.getElementById("jetonJouerJoueur1").style.visibility = "hidden";
    document.getElementById("jetonJouerJoueur2").style.visibility = "visible";
  }
};

function premierJoueur() {
  let aleatoire = Math.floor(Math.random() * 2 + 1);
  if (aleatoire === 1) {
    document.getElementById("jetonJouerJoueur2").style.visibility = "hidden";
    document.getElementById("jetonJouerJoueur1").style.visibility = "visible";
    return 1;
  } else {
    document.getElementById("jetonJouerJoueur1").style.visibility = "hidden";
    document.getElementById("jetonJouerJoueur2").style.visibility = "visible";

    return 2;
  }
}

const resetGrille = (grille) => {
  for (let i = 0; i < 42; i++) {
    grille[i] = 0;
  }
};

if (typeof grille == "undefined") {
  var grille = [];
  for (let i = 0; i < 42; i++) {
    grille[i] = 0;
  }
  var joueurActif = premierJoueur();
  var partieFinie = false;
}

function gagner() {
  //Regarder si on gagne verticalement
  for (let i = 0; i < 21; i++) {
    if (grille[i] != 0) {
      if (
        grille[i] == grille[i + 7] &&
        grille[i] == grille[i + 14] &&
        grille[i] == grille[i + 21]
      ) {
        return grille[i];
      }
    }
  }

  //Regarder si on gagne horizontalement
  for (let i = 0; i < 36; i += 7) {
    for (let j = 0; j < 4; j++) {
      if (grille[i + j] != 0) {
        if (
          grille[i + j] == grille[i + j + 1] &&
          grille[i + j] == grille[i + j + 2] &&
          grille[i + j] == grille[i + j + 3]
        ) {
          return grille[i + j];
        }
      }
    }
  }

  //Regarder si on gagne diagonalement de droite à gauche
  for (let i = 3; i < 18; i += 7) {
    for (let j = 0; j < 4; j++) {
      if (grille[i + j] != 0) {
        if (
          grille[i + j] == grille[i + j + 6] &&
          grille[i + j] == grille[i + j + 12] &&
          grille[i + j] == grille[i + j + 18]
        ) {
          return grille[i + j];
        }
      }
    }
  }

  //Regarder si on gagne diagonalement de gauche à droite
  for (let i = 0; i < 15; i += 7) {
    for (let j = 0; j < 4; j++) {
      if (grille[i + j] != 0) {
        if (
          grille[i + j] == grille[i + j + 8] &&
          grille[i + j] == grille[i + j + 16] &&
          grille[i + j] == grille[i + j + 24]
        ) {
          return grille[i + j];
        }
      }
    }
  }

  return 0;
}

function grillePleine() {
  for (let i = 0; i < 42; i++) {
    if (grille[i] == 0) {
      return 0;
    }
  }
  return 1;
}

const amenerJetonEnBas = (numeroCase) => {
  if (numeroCase < 35) {
    if (grille[numeroCase + 7] == 0) {
      grille[numeroCase + 7] = grille[numeroCase];
      grille[numeroCase] = 0;
      amenerJetonEnBas(numeroCase + 7);
    }
  }
};

const jeu = (ligneCliquer) => {
  if (grille[ligneCliquer - 1] == 0) {
    if (joueurActif == 1) {
      grille[ligneCliquer - 1] = 1;
      joueurActif++;
    } else {
      grille[ligneCliquer - 1] = 2;
      joueurActif -= 1;
    }
    amenerJetonEnBas(ligneCliquer - 1);
    afficheEcran(grille, joueurActif);

    if (gagner() == 1) {
      partieFinie = true;

      document.querySelector("#scoreJoueur1").textContent += "+ 1";
      let score = eval(document.querySelector("#scoreJoueur1").textContent);
      document.querySelector("#scoreJoueur1").textContent = score;

      setTimeout(function () {
        window.alert("Joueur 1 a gagné !");
      }, 1000);
    } else if (gagner() == 2) {
      partieFinie = true;

      document.querySelector("#scoreJoueur2").textContent += "+ 1";
      let score = eval(document.querySelector("#scoreJoueur2").textContent);
      document.querySelector("#scoreJoueur2").textContent = score;

      setTimeout(function () {
        window.alert("Joueur 2 a gagné !");
      }, 1000);
    } else if (grillePleine() == 1) {
      partieFinie = true;
      setTimeout(function () {
        window.alert("Egalité !");
      }, 1000);
    }
  }
};

document.addEventListener("click", (event) => {
  const boutonCliquer = event.target.dataset.key;
  if (listeKeyCode.includes(boutonCliquer) && partieFinie == false) {
    jeu(boutonCliquer);
  }
});

document.querySelector(".boutonReset").addEventListener("click", (event) => {
  partieFinie = false;
  resetGrille(grille);
  joueurActif = premierJoueur();
  afficheEcran(grille, joueurActif);
});
