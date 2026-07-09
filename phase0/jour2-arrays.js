// ============================================================
//  PHASE 0 — JOUR 2 : méthodes de tableau (partie 1)
//  forEach / map / filter
//  Lance avec :  node jour2-arrays.js
//  Rappel :
//    forEach  → ne retourne RIEN (fait une action pour chaque élément)
//    map      → retourne un NOUVEAU tableau, transformé (même longueur)
//    filter   → retourne un NOUVEAU tableau, plus court (test à passer)
//    map et filter ne modifient JAMAIS le tableau d'origine.
// ============================================================

// lancer : node jour2-arrays.js


// --- Notre jeu de données pour toute la session ---
const motos = [
  { nom: "DR-Z400S", prix: 6800, type: "trail",       dispo: true  },
  { nom: "CRF300L",  prix: 6000, type: "trail",       dispo: true  },
  { nom: "WR250R",   prix: 7200, type: "trail",       dispo: false },
  { nom: "Sur-Ron",  prix: 4500, type: "electrique",  dispo: true  },
  { nom: "Talaria",  prix: 5000, type: "electrique",  dispo: false },
];


// ------------------------------------------------------------
// 1. forEach   →   faire une action pour chaque élément
// ------------------------------------------------------------
console.log("--- 1a : forEach, afficher chaque nom ---");
motos.forEach((moto) => {
  console.log(moto.nom);                 // attendu : les 5 noms, un par ligne
});

// TODO 1b : avec forEach, affiche pour chaque moto "nom — prix €"
//           (ex : "DR-Z400S — 6800 €"). Utilise un template literal.
console.log("--- 1b ---");
// motos.forEach((moto) => { ... });
motos.forEach((moto) => {
  console.log(`${moto.nom} — ${moto.prix} €`)
});


// ------------------------------------------------------------
// 2. map   →   fabriquer un nouveau tableau transformé
// ------------------------------------------------------------
const noms = motos.map((moto) => moto.nom);
console.log("2a →", noms);
// attendu : [ 'DR-Z400S', 'CRF300L', 'WR250R', 'Sur-Ron', 'Talaria' ]

// TODO 2b : crée un tableau `prixListe` contenant uniquement les prix.
// const prixListe = ...
// console.log("2b →", prixListe);       // attendu : [ 6800, 6000, 7200, 4500, 5000 ]
const prixListe = motos.map((moto) => moto.prix);
console.log("2b →", prixListe);

// TODO 2c : crée un tableau `etiquettes` où chaque élément est la chaîne
//           "nom : prix €" (ex : "DR-Z400S : 6800 €").
// const etiquettes = ...
// console.log("2c →", etiquettes);
const etiquettes = motos.map((moto) => `${moto.nom} : ${moto.prix} €`);
console.log("2c →", etiquettes);

// ------------------------------------------------------------
// 3. filter   →   garder seulement ce qui passe le test
// ------------------------------------------------------------
const dispos = motos.filter((moto) => moto.dispo === true);
console.log("3a → nb dispo :", dispos.length);   // attendu : 3

// TODO 3b : crée un tableau `trails` avec seulement les motos de type "trail".
// const trails = ...
// console.log("3b → nb trails :", trails.length);   // attendu : 3
const trails = motos.filter((moto) => moto.type === "trail");
console.log("3b → nb trails :", trails.length);

// TODO 3c : crée un tableau `abordables` avec les motos dont le prix
//           est strictement inférieur à 6000.
// const abordables = ...
// console.log("3c → noms abordables :", abordables.map((m) => m.nom));
// attendu : [ 'Sur-Ron', 'Talaria' ]
const abordables = motos.filter((moto) => moto.prix < 6000);
console.log("3c → noms abordables :", abordables.map((m) => m.nom));


// ============================================================
//  Objectif validé quand :
//   - 1b affiche bien "nom — prix €" pour les 5 motos
//   - 2b et 2c retournent les bons tableaux
//   - 3b = 3 motos, 3c = [ 'Sur-Ron', 'Talaria' ]
//  Puis :  git add . && git commit -m "phase0 jour2 : forEach/map/filter"
// ============================================================
