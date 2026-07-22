// ============================================================
//  PHASE 1 — SESSION 4 : génériques + typage du DOM
//    npx tsx session4-generiques-dom.ts   -> parties 1 à 3 (logique)
//    npx tsc --noEmit                     -> vérifie tout
//
//  NOTE : les parties 4-5 (DOM) n'ont de sens que dans le navigateur.
//  Tu peux les vérifier avec tsc, mais pour les VOIR tourner, relie ce
//  fichier à une page HTML via Vite (comme en Phase 0). Le typage se
//  raisonne surtout avec tsc de toute façon.
// ============================================================


// ------------------------------------------------------------
// 1. Tu utilises déjà des génériques sans le savoir
//    Array<T> et Promise<T> SONT des génériques.
//    Ces deux écritures sont identiques :
// ------------------------------------------------------------
const a: string[] = ["x", "y"];
const b: Array<string> = ["x", "y"];   // même chose, notation générique
console.log("1a →", a.length, b.length);

// Le <string> est le "paramètre de type" : il dit ce que contient le tableau.

// TODO 1b : déclare `notes` avec la notation Array<number> et 3 valeurs.
const notes: Array<number> = [14, 11, 18];
console.log("1b →",notes)


// ------------------------------------------------------------
// 2. Écrire une fonction générique
//    <T> = un type que l'appelant fixera. Ici, premier() renvoie un
//    élément du MÊME type que le tableau reçu — quel qu'il soit.
// ------------------------------------------------------------
function premier<T>(tableau: T[]): T | undefined {
  return tableau[0];
}

const n = premier([10, 20, 30]);      // TS déduit : number | undefined
const s = premier(["a", "b"]);        // TS déduit : string | undefined
console.log("2a →", n, s);

// Sans générique, il aurait fallu écrire premierNombre, premierTexte, etc.
// Le générique factorise : une fonction, tous les types.

// TODO 2b : écris `dernier<T>(tableau: T[]): T | undefined` qui renvoie
//   le dernier élément. Teste-la avec un tableau de nombres et de chaînes.
function dernier<T>(tableau: T[]): T | undefined {
  return tableau.at(-1);
}
const t1 = dernier([10, 20, 30]);  // tu donnes des number → T devient "number" → rend number | undefined
const t2 = dernier(["numero1", "numero2", "numero3"]);  // tu donnes des string → T devient "string" → rend string | undefined
console.log("2b →", t1, t2);


// ------------------------------------------------------------
// 3. Un générique contraint (extends)
//    Ici on n'accepte QUE des types qui ont une propriété `id: number`.
//    Utile pour écrire du code réutilisable mais pas "n'importe quoi".
// ------------------------------------------------------------
interface AvecId {
  id: number;
}

function parId<T extends AvecId>(elements: T[], id: number): T | undefined {
  return elements.find((e) => e.id === id);
}

const users = [
  { id: 1, nom: "Hugo" },
  { id: 2, nom: "Alex" },
];
console.log("3a →", parId(users, 2)?.nom);   // Alex

// TODO 3b : appelle parId avec un tableau de motos { id, nom } et un id.
//   Puis essaie de l'appeler avec un tableau d'objets SANS `id` :
//   observe que TS refuse, grâce à la contrainte `extends AvecId`.
const motos = [
  {id: 1, nom: "CRF300L"},
  {id: 2, nom: "NinjaXR"},
  {id: 3, nom: "S1000RR"},
]
// const motos2 = [
//   {nom: "CRF300L"},
//   {nom: "NinjaXR"},
//   {nom: "S1000RR"},
// ]
console.log("3b1 →", parId(motos, 2));
// console.log("3b2 →", parId(motos2, 2));
// Argument of type '{ nom: string; }[]' is not assignable to parameter of type 'AvecId[]'.
// Property 'id' is missing in type '{ nom: string; }' but required in type 'AvecId'.ts(2345)


// ------------------------------------------------------------
// 4. Typage du DOM : le null possible
//    querySelector renvoie `Element | null` : l'élément peut ne pas exister.
//    TS t'oblige donc à traiter le cas avant de t'en servir.
// ------------------------------------------------------------

// Ces lignes ne s'exécutent QUE dans le navigateur ; ici on raisonne le type.
// (avec tsx en Node, `document` n'existe pas — c'est normal)

// const brut = document.querySelector("#champ");
// brut.value;   // ERREUR : brut peut être null

// Solution 1 : vérifier (garde) avant d'utiliser
// const champ = document.querySelector("#champ");
// if (champ) { /* ici TS sait que champ n'est pas null */ }

// TODO 4a (à raisonner / commenter) : explique en une ligne pourquoi TS
//   refuse d'accéder à .value directement. (indice : le "| null")*
// Il refuse d'accéder à .value car si !champ alors il y aura une erreur qui peut faire planter
// En vérifiant que champ existe, on peut essayer d'accéder à sa value


// ------------------------------------------------------------
// 5. Préciser le TYPE d'élément du DOM
//    querySelector renvoie un Element générique, qui n'a pas .value.
//    Pour lire .value, TS doit savoir que c'est un <input>.
//    Deux façons de le lui dire :
// ------------------------------------------------------------

// Façon A — le générique de querySelector :
//   const champ = document.querySelector<HTMLInputElement>("#champ");
//   -> champ est HTMLInputElement | null, donc champ.value existe (après garde)

// Façon B — l'assertion `as` (tu AFFIRMES le type ; à utiliser avec prudence) :
//   const champ = document.querySelector("#champ") as HTMLInputElement;

// TODO 5 (à raisonner / commenter) : entre A et B, laquelle est la plus sûre,
//   et pourquoi ? (repense à la mise en garde sur `any` et sur le fetch :
//   `as` = tu promets, TS te croit ; le générique + garde = tu prouves)
// Le as assure qu'il est un input et continuera son fonctionnement ce qui pourrait casser dans la suite du programme
// Alors qu'avec <HTMLInputElement> on controle directement le type et on passe que si c'est un input


// ============================================================
//  Validé quand : `npx tsc --noEmit` est propre, tu sais LIRE un
//  générique dans une signature, et tu sais expliquer pourquoi
//  querySelature peut être null.
//  git commit -m "phase1 session4 : génériques + typage du DOM"
// ============================================================
