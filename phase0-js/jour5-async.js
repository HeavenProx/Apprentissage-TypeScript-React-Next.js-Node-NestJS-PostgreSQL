// ============================================================
//  PHASE 0 — JOUR 5 : l'asynchrone (partie 1) — SANS réseau
//  Lance avec :  node jour5-async.js
//  ATTENTION : les lignes NE s'afficheront PAS dans l'ordre du code.
//  C'est normal et c'est tout le sujet du jour.
//  Rappel :
//    Promise        = "je te rends le résultat plus tard"
//    async function = une fonction qui peut contenir des `await`
//    await          = attends que la promesse soit prête, puis récupère sa valeur
//    (await ne marche QUE dans une fonction async)
// ============================================================


// ------------------------------------------------------------
// 1. Le code n'attend pas   (la révélation du jour)
// ------------------------------------------------------------
console.log("1 → A");
setTimeout(() => console.log("1 → B (après 1s)"), 1000);
console.log("1 → C");
// attendu dans la console : A, puis C, puis (1s plus tard) B
// -> setTimeout n'a PAS bloqué la suite. Le code a continué.


// ------------------------------------------------------------
// 2. Une promesse + async/await
//    `attendre(ms)` renvoie une promesse qui se résout après ms millisecondes.
// ------------------------------------------------------------
const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function demo() {
  console.log("2a → début");
  await attendre(1000);              // met en pause CETTE fonction 1s (sans bloquer le reste)
  console.log("2a → 1 seconde plus tard");
}
demo();

// TODO 2b : écris une fonction async `compteRebours` qui affiche
//   "3", attend 1s, "2", attend 1s, "1", attend 1s, puis "GO !".
//   (plusieurs await à la suite = étapes séquentielles)
// async function compteRebours() { ... }
// compteRebours();
async function compteRebours() {
  const compteur = [3, 2, 1, "GO !"];
  for(let c of compteur){
    console.log(c);
    await attendre(1000);             
  }
}
compteRebours();


// ------------------------------------------------------------
// 3. Une promesse qui RETOURNE une valeur   (répétition du futur `fetch`)
// ------------------------------------------------------------
const chargerUser = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ nom: "Hugo", role: "dev" }), 800);
  });

async function afficherUser() {
  console.log("3a → chargement...");
  const user = await chargerUser();          // user = la valeur passée à resolve(...)
  console.log("3a →", user.nom, "-", user.role);   // attendu (~0.8s) : Hugo - dev
}
afficherUser();

// TODO 3b : crée une fonction `chargerMotos` qui, via une promesse,
//   se résout après 500ms avec le tableau [ "DR-Z400S", "CRF300L", "WR250R" ].
//   Puis une fonction async qui l'await et affiche le NOMBRE de motos (.length).
// const chargerMotos = ...
// async function afficherNbMotos() { ... }
// afficherNbMotos();                         // attendu (~0.5s) : 3
const chargerMotos = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve([ "DR-Z400S", "CRF300L", "WR250R" ]), 500);
  });

async function afficherNbMotos(){
  const motos = await chargerMotos();
  console.log("3b →", motos.length);
}
afficherNbMotos();

// ------------------------------------------------------------
// 4. Gérer les erreurs   (reject + try / catch)
//    Une promesse peut échouer : elle "reject". On attrape ça avec try/catch.
// ------------------------------------------------------------
const operationRisquee = (reussir) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (reussir) resolve("tout est OK");
      else reject(new Error("ça a raté"));
    }, 400);
  });

async function essayer() {
  try {
    const res = await operationRisquee(true);
    console.log("4a →", res);                // attendu : tout est OK
  } catch (err) {
    console.log("4a → attrapé :", err.message);
  }
}
essayer();

// TODO 4b : écris une fonction async qui appelle operationRisquee(false)
//   dans un try/catch, et affiche "attrapé : ça a raté" via le catch.
// async function essayerEchec() { ... }
// essayerEchec();
async function echouer() {
  try {
    const res = await operationRisquee(false);
    console.log("4b →", res);                
  } catch (err) {
    console.log("4b → attrapé :", err.message);
  }
}
echouer();


// ============================================================
//  Validé quand : tu comprends POURQUOI l'ordre d'affichage est mélangé,
//  et que 2b, 3b, 4b marchent.
//  git add . && git commit -m "phase0 jour5 : promises & async/await"
// ============================================================
