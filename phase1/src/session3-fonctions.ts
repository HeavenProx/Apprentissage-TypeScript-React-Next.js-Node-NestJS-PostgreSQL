// ============================================================
//  PHASE 1 — SESSION 3 : typer les fonctions
//    npx tsx session3-fonctions.ts   -> exécute
//    npx tsc --noEmit                -> vérifie les types
//
//  Règle du jour :
//    les PARAMÈTRES, on les type toujours (TS ne peut pas les deviner)
//    le RETOUR, TS le déduit souvent — l'annoter reste une bonne pratique
// ============================================================


// ------------------------------------------------------------
// 1. Paramètres et valeur de retour
// ------------------------------------------------------------
function additionner(a: number, b: number): number {
  return a + b;
}

const doubler = (n: number): number => n * 2;

console.log("1a →", additionner(2, 3), doubler(5));

// TODO 1b : écris une fonction `surface` qui prend une largeur et une
//   hauteur (nombres) et retourne leur produit. Type les deux paramètres
//   et le retour.
function surface(largeur: number, hauteur: number): number {
  return largeur*hauteur;
}
console.log("1b →", surface(4, 5));

// TODO 1c : appelle additionner("2", 3) et lis l'erreur.
//   -> en JS pur, cela aurait silencieusement produit "23".
// additionner("2", 3)
// Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)

// ------------------------------------------------------------
// 2. void : la fonction ne retourne rien
//    Typique des fonctions qui font un effet (afficher, envoyer).
// ------------------------------------------------------------
function saluer(nom: string): void {
  console.log(`2a → Bonjour ${nom}`);
}
saluer("Hugo");

// TODO 2b : écris une fonction `logErreur` qui prend un message (string)
//   et l'affiche préfixé de "[ERREUR]". Type son retour en void.
function logErreur(message: string): void {
  console.log("[ERREUR] " + message)
}
logErreur("Erreur produite exprès dans le 2b");

// ------------------------------------------------------------
// 3. Paramètres optionnels et valeurs par défaut
//    ?   -> peut être omis (sa valeur sera alors undefined)
//    =   -> valeur par défaut si l'argument est absent
//    Les paramètres optionnels se placent TOUJOURS en dernier.
// ------------------------------------------------------------
function presenter(nom: string, titre?: string): string {
  return titre ? `${titre} ${nom}` : nom;
}

function saluerAvec(nom: string, salutation: string = "Bonjour"): string {
  return `${salutation} ${nom}`;
}

console.log("3a →", presenter("Hugo"), "|", saluerAvec("Hugo", "Salut"));

// TODO 3b : écris une fonction `formaterPrix` qui prend un montant (number)
//   et une devise optionnelle valant "€" par défaut, et retourne
//   par exemple "6800 €".
function formaterPrix(montant: number, devise: string = "€"): string {
  return montant + " " + devise;
}
console.log("3b →", formaterPrix(6800))

// ------------------------------------------------------------
// 4. Fonctions travaillant sur tes types
//    On réutilise les interfaces de la session 2.
// ------------------------------------------------------------
interface Moto {
  nom: string;
  prix: number;
  dispo: boolean;
}

const catalogue: Moto[] = [
  { nom: "DR-Z400S", prix: 6800, dispo: true },
  { nom: "CRF300L", prix: 6000, dispo: true },
  { nom: "WR250R", prix: 7200, dispo: false },
];

function nomsDisponibles(motos: Moto[]): string[] {
  return motos.filter((m) => m.dispo).map((m) => m.nom);
}

console.log("4a →", nomsDisponibles(catalogue));

// TODO 4b : écris `prixTotal(motos: Moto[]): number` avec reduce.
function prixTotal(motos: Moto[]): number {
  return motos.reduce((m: number, moto: Moto) => m + moto.prix, 0)
}
console.log("4b →", prixTotal(catalogue));

// TODO 4c : écris `trouverParNom(motos: Moto[], nom: string)`.
//   Attention : find peut ne rien trouver. Regarde le type que TS déduit
//   pour le retour — il contient `undefined`. C'est volontaire et correct :
//   annonce-le dans ta signature de retour, et gère le cas à l'appel.
function trouverParNom(motos: Moto[], nom: string): Moto | undefined {
  return motos.find(moto => nom === moto.nom);
}
const resultatParNom = (trouverParNom(catalogue, "CRF300L"));
resultatParNom ? console.log("4c →", resultatParNom) : console.log("4c →", "Pas de motos trouvé pour ce nom...");


// ------------------------------------------------------------
// 5. Fonctions asynchrones
//    Une fonction async retourne TOUJOURS une promesse.
//    Le type s'écrit Promise<CeQuElleRend>.
// ------------------------------------------------------------
async function chargerNom(): Promise<string> {
  return "Hugo";     // pas besoin d'envelopper : async le fait
}

async function demo(): Promise<void> {
  const n = await chargerNom();
  console.log("5a →", n);
}
demo();

// TODO 5b : écris une fonction async `chargerCatalogue` qui retourne
//   le tableau `catalogue`. Quel type de retour dois-tu écrire ?
async function afficherCatalogue(): Promise<void> {
  const catalogueCharger = await chargerCatalogue();
  console.log("5b →", catalogueCharger);
}

async function chargerCatalogue(): Promise<Moto[]> {
  return catalogue;   
}
afficherCatalogue();

// ------------------------------------------------------------
// 6. Typer un fetch  (le vrai sujet du jour)
//    response.json() retourne `any` : TS ne sait pas ce que renvoie
//    l'API. On lui indique la forme attendue via le type de retour.
//    ATTENTION : c'est une PROMESSE que tu fais à TS, pas une garantie.
//    Si l'API change, TS ne s'en apercevra pas. (La vérification réelle
//    des données à l'exécution existe — Zod — mais c'est pour plus tard.)
// ------------------------------------------------------------
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

async function fetchUsers(): Promise<User[]> {
  const reponse = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!reponse.ok) throw new Error("HTTP " + reponse.status);
  return await reponse.json();
}

async function afficherUsers(): Promise<void> {
  const users = await fetchUsers();
  // tape `users[0].` ici : l'autocomplétion connaît maintenant la forme
  console.log("6a →", users.length, users[0].name);
}
afficherUsers();

// TODO 6b : ajoute un champ `username: string` à l'interface User et
//   affiche-le. (l'API le renvoie bien)
async function afficherUsername(): Promise<void> {
  const users = await fetchUsers()
  console.log("6b →", users[0].username);
}
afficherUsername()

// TODO 6c : écris `fetchUser(id: number): Promise<User>` qui appelle
//   .../users/{id} et retourne un seul utilisateur. Appelle-la avec 3.
async function fetchUser(id: number): Promise<User> {
  const reponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!reponse.ok) throw new Error("HTTP " + reponse.status);
  return await reponse.json();
}

async function afficherUser(id: number): Promise<void> {
  const user = await fetchUser(id);
  // tape `users[0].` ici : l'autocomplétion connaît maintenant la forme
  console.log("6c →", user.name);
}
afficherUser(3);

// ============================================================
//  Validé quand : `npx tsc --noEmit` est propre et que tu sais
//  écrire une signature complète (paramètres + retour), y compris
//  pour une fonction async.
//  git commit -m "phase1 session3 : typage des fonctions"
// ============================================================
