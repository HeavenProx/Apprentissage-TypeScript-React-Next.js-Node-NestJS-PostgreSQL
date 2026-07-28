// ============================================================
//  PHASE 0 — JOUR 1 : refresh ES6+
//  Lance ce fichier avec :  node scratch.js
//  Règle : tu écris le code toi-même. L'IA explique, ne résout pas.
//  Chaque section = 1 exemple qui marche, puis 1 TODO à compléter.
// ============================================================

// lancer : node scratch.js


// ------------------------------------------------------------
// 1. const / let   (on n'utilise JAMAIS var)
//    const = valeur qui ne sera pas réaffectée.  let = valeur qui change.
// ------------------------------------------------------------
const marque = "Suzuki";     // ne changera pas
let vitesse = 0;             // va changer
vitesse = 90;
console.log("1a →", marque, vitesse);          // attendu : Suzuki 90

// TODO 1b : déclare une const `annee` = 2026 et une let `km` = 0,
//           puis réaffecte km à 12000. Affiche les deux.
// console.log("1b →", annee, km);             // attendu : 2026 12000
const annee = 2026;
let km = 0;
km = 12000;
console.log("1b →", annee, km);


// ------------------------------------------------------------
// 2. Arrow functions   () => {}
// ------------------------------------------------------------
function doubleOld(n) { return n * 2; }
const doubleNew = (n) => n * 2;                 // return implicite
console.log("2a →", doubleOld(5), doubleNew(5));   // attendu : 10 10

// TODO 2b : écris une arrow function `surface` qui prend une largeur
//           et une hauteur, et retourne leur produit. Affiche surface(4, 5).
// const surface = ...
// console.log("2b →", surface(4, 5));         // attendu : 20
function surfaceOld(l, h) { return l * h ;}
const surfaceNew = (l, h) => l * h;
console.log("2b →", surfaceNew(4, 5));


// ------------------------------------------------------------
// 3. Template literals   `texte ${variable}`   (backticks, pas guillemets)
// ------------------------------------------------------------
const nom = "DR-Z400";
console.log(`3a → La ${nom} est dispo.`);       // attendu : La DR-Z400 est dispo.

// TODO 3b : avec `annee` et `km` de l'étape 1, affiche une phrase du style
//           "Moto de 2026 avec 12000 km" en utilisant un template literal.
// console.log(`3b → ...`);                     // attendu : Moto de 2026 avec 12000 km
console.log(`3b → Moto de ${annee} avec ${km} km`);


// ------------------------------------------------------------
// 4. Déstructuration   (extraire des champs d'un objet d'un coup)
// ------------------------------------------------------------
const moto = { modele: "CRF300L", prix: 6000, type: "trail" };
const { modele, prix } = moto;
console.log("4a →", modele, prix);              // attendu : CRF300L 6000

// TODO 4b : extrais `type` de l'objet `moto` par déstructuration, et affiche-le.
// const { ... } = moto;
// console.log("4b →", type);                   // attendu : trail
const { type } = moto;
console.log("4b →", type);


// ------------------------------------------------------------
// 5. Spread   ...   (copier/étaler un objet ou un tableau)
// ------------------------------------------------------------
const base = { modele: "WR250R", prix: 7000 };
const complet = { ...base, dispo: true };       // copie base + ajoute un champ
console.log("5a →", complet);                   // attendu : { modele:'WR250R', prix:7000, dispo:true }

// TODO 5b : crée un tableau `a = [1, 2, 3]`, puis un tableau `b`
//           qui contient tout `a` suivi des valeurs 4 et 5, via le spread.
// const a = ...
// const b = [ ... ];
// console.log("5b →", b);                      // attendu : [ 1, 2, 3, 4, 5 ]
const a = [ 1, 2, 3 ];
const b = [ ...a, 4, 5 ];
console.log("5b →", b);  

// ============================================================
//  Fini quand : tous les TODO sont décommentés/remplis
//  et chaque sortie correspond à son "attendu".
//  Puis :  git add . && git commit -m "phase0 jour1 : refresh ES6"
// ============================================================
