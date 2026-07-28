// ============================================================
//  PHASE 1 — SESSION 1 : types de base
//
//  DEUX COMMANDES, DEUX RÔLES :
//    npx tsx session1-types.ts   -> EXÉCUTE le fichier (efface les types,
//                                    ne les vérifie PAS)
//    npx tsc --noEmit            -> VÉRIFIE les types, ne produit rien
//
//  Les erreurs de type n'apparaissent donc PAS avec tsx : elles s'affichent
//  dans VS Code (souligné rouge / onglet "Problèmes"), ou via `npx tsc --noEmit`.
//  C'est cette dernière commande qui tourne dans les pipelines CI en entreprise.
// ============================================================
export {};


// ------------------------------------------------------------
// 1. Annotation explicite   ->   nom : type
// ------------------------------------------------------------
const marque: string = "Suzuki";
const cylindree: number = 400;
const dispo: boolean = true;

console.log("1a →", marque, cylindree, dispo);

// TODO 1b : déclare une variable `modele` de type string et une variable
//   `prixMoto` de type number. Affiche-les.
let modele: string = "M3 Competition";
let prixMoto: number = 75000;

console.log("1b →", modele, prixMoto);


// TODO 1c : décommente la ligne suivante et regarde VS Code (pas le terminal).
//   Lis le message en entier, puis re-commente.
// const test: number = "pas un nombre";


// ------------------------------------------------------------
// 2. L'inférence   (TS devine, ne sur-annote pas)
// ------------------------------------------------------------
const ville = "Lyon";        // TS sait déjà : string
let compteur = 0;            // TS sait déjà : number

console.log("2a →", ville, compteur);

// Survole `ville` dans VS Code : l'éditeur affiche son type.
// Règle : on annote les ENTRÉES (paramètres, données externes),
// on laisse TS déduire les variables locales évidentes.

// TODO 2b : déclare `let vitesse = 90;` puis essaie de lui affecter
//   la chaîne "rapide". Observe l'erreur dans l'éditeur : TS a retenu
//   le type déduit au départ.
let vitesse = 90;
console.log("2b →", vitesse);
// vitesse = "rapide";
// Type 'string' is not assignable to type 'number'.ts(2322)
// let vitesse: number

// ------------------------------------------------------------
// 3. Tableaux
//    string[]  = tableau de chaînes     number[] = tableau de nombres
// ------------------------------------------------------------
const noms: string[] = ["DR-Z400S", "CRF300L", "WR250R"];
const prix: number[] = [6800, 6000, 7200];

console.log("3a →", noms.length, prix.length);

// TODO 3b : crée un tableau `disponibilites` de booléens avec 3 valeurs.
const disponibilites: boolean[] = [true, false, true];
console.log("3b →", disponibilites);

// TODO 3c : essaie d'ajouter un nombre dans `noms` (push) et lis l'erreur
//   dans l'éditeur.
//   -> exactement le genre de bug que TS attrape avant l'exécution.
// noms.push(14);
// Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)

// ------------------------------------------------------------
// 4. Union de types   ->   deux valeurs possibles ou plus
//    Très utile pour un état limité à quelques valeurs.
// ------------------------------------------------------------
let filtre: "toutes" | "actives" | "terminees" = "toutes";
filtre = "actives";       // OK
// filtre = "archivees";  // erreur : ne fait pas partie des valeurs autorisées

console.log("4a →", filtre);

// TODO 4b : déclare une variable `statut` qui peut être soit un number,
//   soit la chaîne "inconnu". Affecte-lui les deux valeurs tour à tour
//   pour vérifier que les deux passent.
let statut: number | "inconnu";
statut = 14;
console.log("4b1 →", statut);
statut = "inconnu";
console.log("4b2 →", statut);


// ------------------------------------------------------------
// 5. any  vs  unknown   (le piège de la phase)
//    any     = "TS, ferme les yeux"  -> tu perds tout l'intérêt de TS
//    unknown = "type inconnu"        -> TS t'oblige à vérifier avant usage
// ------------------------------------------------------------
let dangereux: any = "une chaîne";

// Décommente la ligne suivante : TS ne signale RIEN, et pourtant le
// programme plante à l'exécution (TypeError) — et s'arrête là.
// Re-commente ensuite pour que la suite du fichier tourne.
// dangereux.methodeQuiNexistePas();

console.log("5a →", typeof dangereux);

let prudent: unknown = "une chaîne";
// prudent.toUpperCase();           // erreur : il faut d'abord prouver le type
if (typeof prudent === "string") {
  console.log("5b →", prudent.toUpperCase());   // ici TS sait que c'est une string
}

// TODO 5c : déclare une variable `donnee` de type unknown valant 42.
//   Écris un test qui vérifie que c'est un number avant de l'utiliser
//   dans un calcul. (même mécanique que ci-dessus avec typeof)
let donnees: unknown = 42

if (typeof donnees === "number") {
  console.log("5c →", donnees * 2);   // nombre : TS le sait
}

// À retenir : quand une erreur TS t'agace, la réponse n'est presque jamais
// `any`. C'est le raccourci qui vide TypeScript de son intérêt.


// ============================================================
//  Validé quand : `npx tsc --noEmit` ne renvoie plus d'erreur,
//  et que tu as LU les messages des TODO 1c / 2b / 3c au lieu
//  de les contourner.
//  git commit -m "phase1 session1 : types de base"
// ============================================================
