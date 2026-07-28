// ============================================================
//  PHASE 1 — SESSION 6 : unions discriminées & narrowing
//    npx tsx session6-unions.ts   -> exécute
//    npx tsc --noEmit             -> vérifie les types
//
//  Union discriminée = plusieurs formes possibles + un champ commun
//  (le "discriminant") dont la valeur dit laquelle. TS s'en sert pour
//  savoir, dans chaque branche, à quelle forme il a affaire.
// ============================================================


// ------------------------------------------------------------
// 1. Narrowing : TS affine un type selon les vérifications
//    Tu l'as déjà pratiqué en session 1 avec `unknown` + typeof.
//    Ici on formalise : après un test, TS "réduit" le type.
// ------------------------------------------------------------
function longueur(x: string | number): number {
  if (typeof x === "string") {
    return x.length;      // ici TS SAIT que x est une string
  }
  return x;               // ici il ne reste que number
}
console.log("1a →", longueur("hello"), longueur(42));

// TODO 1b : écris `formater(x: string | number): string` qui renvoie
//   x.toUpperCase() si c'est une chaîne, et x.toFixed(2) si c'est un
//   nombre. Laisse le narrowing te guider : chaque branche débloque
//   les méthodes du bon type.
function formater(x: string | number): string {
  if(typeof(x) === "string"){
    return x.toUpperCase();
  }
  return x.toFixed(2);
}
console.log("1b →", formater("hello"), formater(42));

// ------------------------------------------------------------
// 2. Le problème SANS discriminant
//    Un simple "tout optionnel" laisse passer des objets incohérents.
// ------------------------------------------------------------
interface SourceFloue {
  chemin?: string;
  url?: string;
}
// rien n'empêche : { } (aucun des deux) ou { chemin, url } (les deux).
// C'est exactement ce qu'on veut éviter.

// (pas de TODO ici — juste constater le problème)


// ------------------------------------------------------------
// 3. L'union discriminée : chaque forme est explicite
//    Le champ `type` est le discriminant.
// ------------------------------------------------------------
interface SourceFichier {
  type: "fichier";
  chemin: string;
}
interface SourceUrl {
  type: "url";
  url: string;
}
interface SourceCouleur { 
  type: "couleur"; 
  hex: string 
}

type Source = SourceFichier | SourceUrl | SourceCouleur;

// Impossible de créer une source incohérente : si type vaut "fichier",
// TS EXIGE `chemin` et INTERDIT `url`.

function decrire(source: Source): string {
  switch (source.type) {
    case "fichier":
      // return `Fichier local : ${source.url}`;   // .url refusé ici
      return `Fichier local : ${source.chemin}`;
    case "url":
      return `Distant : ${source.url}`;
    case "couleur":
      return `Couleur : ${source.hex}`;
  }
}

const s1: Source = { type: "fichier", chemin: "./clip.mp4" };
const s2: Source = { type: "url", url: "https://exemple.com/clip.mp4" };
console.log("3a →", decrire(s1));
console.log("3b →", decrire(s2));

// TODO 3c : dans le case "fichier", essaie d'accéder à source.url.
//   Lis l'erreur : dans cette branche, ce champ n'existe pas. C'est
//   toute la valeur du discriminant.


// ------------------------------------------------------------
// 4. Exhaustivité avec `never`
//    Astuce clé : dans le `default`, on assigne à une variable never.
//    Si un jour tu ajoutes une variante et oublies de la gérer,
//    TS refuse de compiler. Le compilateur devient ton relecteur.
// ------------------------------------------------------------
function decrireStrict(source: Source): string {
  switch (source.type) {
    case "fichier":
      return source.chemin;
    case "url":
      return source.url;
    case "couleur":
      return source.hex
    default: {
      const _exhaustif: never = source;   // erreur ici si un cas manque
      return _exhaustif;
    }
  }
}
console.log("4a →", decrireStrict(s1));

// TODO 4b : ajoute une 3e variante à Source, `SourceCouleur`
//   ({ type: "couleur"; hex: string }) — un fond uni plutôt qu'une vidéo.
//   NE TOUCHE PAS encore aux fonctions. Lance `npx tsc --noEmit` :
//   observe que decrireStrict() casse au `never`. TS vient de te dire
//   exactement où tu as oublié de gérer le nouveau cas. Corrige ensuite.


// ------------------------------------------------------------
// 5. Narrowing par "in" et égalité
//    D'autres façons pour TS d'affiner, utiles selon les cas.
// ------------------------------------------------------------
type Reponse =
  | { statut: "ok"; donnees: string[] }
  | { statut: "chargement"; donnees: string[] }
  | { statut: "erreur"; message: string };

function traiter(r: Reponse): string {
  if (r.statut === "ok") {
    return `${r.donnees.length} éléments`;
  } else if (r.statut === "chargement") {
    return "en cours...";
  }
  return `Erreur : ${r.message}`;
}
console.log("5a →", traiter({ statut: "ok", donnees: ["a", "b"] }));

// TODO 5b : ajoute une variante { statut: "chargement" } à Reponse et
//   gère-la dans traiter(). (retourne par ex. "en cours...")


// ============================================================
//  APPLICATION PROJET — modéliser la source d'un item
//  (à faire dans ranking-shorts/src/core, PAS ici)
//
//  Dans le core du projet, définis le type `Source` d'un item de ranking
//  en union discriminée. Pour la V1, une seule variante te suffit :
//  le fichier local. MAIS écris l'union de façon à ce qu'ajouter la
//  variante "url" plus tard ne demande qu'un ajout, pas une réécriture.
//
//  -> commence avec `type Source = { type: "fichier"; chemin: string }`
//     (une union à un seul membre, c'est valide et volontaire)
//  -> intègre-la dans ton interface d'item : { rang, source, ... }
//  -> utilise un switch exhaustif (never) là où tu consommes la source,
//     pour que le futur ajout d'"url" te soit signalé automatiquement.
//
//  Rappel de la règle : tu APPLIQUES ici ce que les exercices ci-dessus
//  t'ont fait comprendre. Si le switch exhaustif n'est pas clair, refais
//  la section 4 avant de toucher au projet.
// ============================================================


// ============================================================
//  Validé quand : `npx tsc --noEmit` est propre, tu sais expliquer
//  le rôle du discriminant, et le truc du `never` pour l'exhaustivité.
//  Deux commits : un côté phase1 (exercices), un côté ranking-shorts.
//  git commit -m "phase1 session6 : unions discriminées"
// ============================================================
