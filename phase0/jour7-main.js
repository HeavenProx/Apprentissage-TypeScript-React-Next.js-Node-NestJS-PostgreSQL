// ============================================================
//  MODULE "chef d'orchestre"  (jour7-main.js)
//  Il importe les autres modules et branche l'interface.
//  `import { X } from "./fichier.js"` récupère ce que le fichier a exporté.
//  (les accolades = import "nommé" : le nom doit correspondre EXACTEMENT
//   à celui qui a été exporté)
// ============================================================

import { fetchUsers } from "./jour7-api.js";
// TODO A : importe aussi `afficherUsers` depuis "./jour7-ui.js"
import { afficherUsers } from "./jour7-ui.js"
import dayjs from "dayjs"


const bouton = document.querySelector("#charger");
const statut = document.querySelector("#statut");
const liste  = document.querySelector("#liste");


bouton.addEventListener("click", async () => {
  // TODO B : dans un try/catch, orchestre le tout :
  //   statut.textContent = "Chargement...";
  //   const users = await fetchUsers();
  //   afficherUsers(users, liste);
  //   statut.textContent = users.length + " utilisateurs";
  //   (dans le catch)  statut.textContent = "Erreur : " + err.message;
  try{
    bouton.disabled = true;
    statut.textContent = "Chargement...";
    const users = await fetchUsers();
    afficherUsers(users, liste);
    statut.textContent = users.length + ' utilisateur(s)';
    statut.textContent += " (chargé à " + dayjs().format("HH:mm:ss") + ")";
  } catch(err){
    statut.textContent = "Erreur : " + err.message;
  } finally {
    bouton.disabled = false;
  }
});


// ------------------------------------------------------------
// TODO C (bonus npm) : installe et utilise ton premier paquet.
//   1) au terminal :   npm install dayjs
//   2) tout en haut de ce fichier :   import dayjs from "dayjs";
//   3) après l'affichage réussi, ajoute l'heure au statut :
//        statut.textContent += " (chargé à " + dayjs().format("HH:mm:ss") + ")";
//   -> tu viens de vivre la boucle complète : installer -> importer -> utiliser.
//      Va voir : le paquet est listé dans package.json et téléchargé dans node_modules.
// ------------------------------------------------------------


// ============================================================
//  Validé quand : l'app refait exactement ce qu'elle faisait au Jour 6,
//  mais le code est réparti proprement en 3 modules.
//  git add . && git commit -m "phase0 jour7 : modules import/export + npm"
// ============================================================
