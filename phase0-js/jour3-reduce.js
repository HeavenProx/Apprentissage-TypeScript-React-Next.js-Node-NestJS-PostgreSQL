// ============================================================
//  PHASE 0 — JOUR 3 : méthodes de tableau (partie 2)
//  find / reduce / chaînage
//  Lance avec :  node jour3-reduce.js
//  Rappel :
//    find    → rend UN élément (le 1er qui passe le test) ou undefined
//              (≠ filter qui rend toujours un TABLEAU)
//    reduce  → réduit tout le tableau à UNE valeur (total, max, compteur...)
// ============================================================


const motos = [
  { nom: "DR-Z400S", prix: 6800, type: "trail",       dispo: true  },
  { nom: "CRF300L",  prix: 6000, type: "trail",       dispo: true  },
  { nom: "WR250R",   prix: 7200, type: "trail",       dispo: false },
  { nom: "Sur-Ron",  prix: 4500, type: "electrique",  dispo: true  },
  { nom: "Talaria",  prix: 5000, type: "electrique",  dispo: false },
];


// ------------------------------------------------------------
// 1. find   →   le PREMIER élément qui passe le test
// ------------------------------------------------------------
const premiereElec = motos.find((m) => m.type === "electrique");
console.log("1a →", premiereElec.nom);        // attendu : Sur-Ron

// TODO 1b : trouve la moto qui s'appelle "WR250R" et affiche son prix.
// const wr = ...
// console.log("1b →", wr.prix);              // attendu : 7200
const wr = motos.find((moto) => moto.nom === "WR250R");
console.log("1b →", wr.prix);

// TODO 1c : trouve la première moto dont le prix est supérieur à 7000,
//           et affiche son nom.
// const chere = ...
// console.log("1c →", chere.nom);            // attendu : WR250R
const chere = motos.find((moto) => moto.prix > 7000);
console.log("1c →", chere.nom);

// ------------------------------------------------------------
// 2. reduce   →   tout le tableau réduit à UNE valeur
//    reduce( (acc, element) => nouvelAcc,  valeurDeDepart )
//    Ici on part de 0, et on ajoute chaque prix à l'accumulateur.
// ------------------------------------------------------------
const total = motos.reduce((acc, m) => acc + m.prix, 0);
console.log("2a → total :", total);           // attendu : 29500

// TODO 2b : avec reduce, trouve le prix le plus ÉLEVÉ.
//           Indice : compare l'accumulateur au prix courant à chaque tour
//           (Math.max t'aide). Pars de 0.
// const prixMax = ...
// console.log("2b → max :", prixMax);        // attendu : 7200
const prixMax = motos.reduce((acc, moto) => acc < moto.prix ? moto.prix : acc, 0);
console.log("2b → max :", prixMax); 

// TODO 2c (bonus) : avec reduce, COMPTE combien de motos sont dispo.
//           Indice : à chaque tour, +1 si m.dispo est vrai, sinon inchangé.
//           Pars de 0.
// const nbDispo = ...
// console.log("2c → nb dispo :", nbDispo);   // attendu : 3
const nbDispo = motos.reduce((acc, moto) => moto.dispo === true ? acc + 1 : acc, 0);
console.log("2c → nb dispo :", nbDispo); 

// ------------------------------------------------------------
// 3. Chaînage   →   on enchaîne les méthodes, de gauche à droite
//    Chaque méthode rend un nouveau tableau, sur lequel on rappelle la suivante.
// ------------------------------------------------------------
const nomsDispo = motos
  .filter((m) => m.dispo)
  .map((m) => m.nom);
console.log("3a →", nomsDispo);
// attendu : [ 'DR-Z400S', 'CRF300L', 'Sur-Ron' ]

// TODO 3b : les NOMS des motos dont le prix est < 6000, en chaînant filter + map.
// const abordables = ...
// console.log("3b →", abordables);           // attendu : [ 'Sur-Ron', 'Talaria' ]
const abordables = motos.filter((moto) => moto.prix < 6000).map((moto) => moto.nom);
console.log("3b →", abordables);  

// TODO 3c : le prix TOTAL des motos de type "trail" seulement,
//           en chaînant filter (garder les trails) + reduce (sommer les prix).
// const totalTrails = ...
// console.log("3c → total trails :", totalTrails);   // attendu : 20000
const totalTrails = motos.filter((moto) => moto.type === "trail").reduce((acc, moto) => acc + moto.prix, 0);
console.log("3c → total trails :", totalTrails);

// ============================================================
//  Validé quand toutes les sorties matchent leur "attendu".
//  Le vrai boss de la phase, c'est 2b/2c (reduce) et 3c (filter+reduce).
//  Puis :  git add . && git commit -m "phase0 jour3 : find/reduce/chaînage"
// ============================================================
