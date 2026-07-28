// ============================================================
//  PHASE 1 — SESSION 8 : types dérivés & tsconfig strict
//    npx tsx session8-types-derives.ts   -> exécute
//    npx tsc --noEmit                    -> vérifie les types
//  (nécessite zod, déjà installé en session 7)
// ============================================================

import { z } from "zod";


// ------------------------------------------------------------
// 1. z.infer : dériver le type depuis le schéma
//    Le schéma est la SEULE source de vérité. Le type en découle.
// ------------------------------------------------------------
const MotoSchema = z.object({
  nom: z.string(),
  prix: z.number(),
  dispo: z.boolean(),
  annee: z.number().min(1950)
});

// au lieu d'écrire une interface Moto EN PLUS, on la dérive :
type Moto = z.infer<typeof MotoSchema>;
// Moto vaut exactement { nom: string; prix: number; dispo: boolean }

const m: Moto = { nom: "DR-Z400S", prix: 6800, dispo: true, annee: 2023 };
console.log("1a →", m.nom);

// Le gain : si tu ajoutes un champ au SCHÉMA, le TYPE se met à jour seul.
// Une seule chose à maintenir, jamais de divergence.

// TODO 1b : ajoute un champ `annee: z.number()` au MotoSchema.
//   Sans toucher au type, essaie de créer une Moto sans `annee` :
//   TS la réclame déjà. Le type a suivi le schéma tout seul.
// const m2: Moto = { nom: "CRF300L", prix: 6100, dispo: true };
// Property 'annee' is missing in type '{ nom: string; prix: number; dispo: true; }' 
// but required in type '{ nom: string; prix: number; dispo: boolean; annee: number; }'


// ------------------------------------------------------------
// 2. Partial<T> : tous les champs deviennent optionnels
//    Utile pour une mise à jour partielle ou un brouillon.
// ------------------------------------------------------------
type MotoBrouillon = Partial<Moto>;
const brouillon: MotoBrouillon = { nom: "en cours..." };   // le reste peut manquer
console.log("2a →", brouillon.nom);

// TODO 2b : écris une fonction `mettreAJour(moto: Moto, champs: Partial<Moto>): Moto`
//   qui renvoie une copie de moto avec les champs fournis remplacés.
//   (indice : le spread de la Phase 0 fait exactement ça en une ligne)
function mettreAJour(moto: Moto, champ: Partial<Moto>): Moto {
  // Remplace origine par changement
  return { ...moto,  ...champ }
}
console.log("2b →", mettreAJour(m, { prix: 7400, annee: 2024 }))

// ------------------------------------------------------------
// 3. Pick / Omit : garder ou retirer certains champs
// ------------------------------------------------------------
type MotoResume = Pick<Moto, "nom" | "prix">;   // seulement ces deux champs
type MotoSansDispo = Omit<Moto, "dispo">;        // tout sauf dispo

const resume: MotoResume = { nom: "CRF300L", prix: 6000 };
console.log("3a →", resume);

// TODO 3b : crée un type `MotoPublique` qui reprend Moto SANS le prix,
//   avec Omit. Crée une valeur conforme.
type MotoPublique = Omit<Moto, "prix">;        
const testSansPrix: MotoPublique = { nom: "Ninja", dispo: true, annee: 2024 }
console.log("3b →", testSansPrix);


// ------------------------------------------------------------
// 4. Record<K, V> : un objet dont on connaît le type des clés et valeurs
//    Pratique pour un dictionnaire / une table de correspondance.
// ------------------------------------------------------------
type Filtre = "toutes" | "actives" | "terminees";
const libelles: Record<Filtre, string> = {
  toutes: "Toutes les tâches",
  actives: "À faire",
  terminees: "Terminées",
};
console.log("4a →", libelles.actives);
// Bonus : si tu oublies une clé de l'union, TS refuse. Essaie.

// TODO 4b : crée un Record qui associe chaque valeur "admin" | "membre"
//   à un nombre de permissions (number).
type Role = "admin" | "membre";
const role: Record<Role, number> = {
  admin: 1,
  membre: 2
}
console.log("4b →", role.admin)

// ------------------------------------------------------------
// 5. z.infer + utilitaires ensemble  (le combo réel)
// ------------------------------------------------------------
const ItemSchema = z.object({
  rang: z.number().int(),
  texte: z.string(),
});
type Item = z.infer<typeof ItemSchema>;
type ItemSansRang = Omit<Item, "rang">;   // dérivé d'un dérivé

console.log("5a → ok");

// TODO 5b : rien à coder — vérifie juste que tu sais expliquer la
//   chaîne : schéma Zod -> z.infer -> type -> Omit/Partial. Une seule
//   source (le schéma), tout le reste en découle.
const myItem: Item = {
  rang: 1,
  texte: "mon rang 1"
}
const myItemSansRang: ItemSansRang = {
  texte: "mon rang sans rang mdrr"
}
console.log("5b →", myItem, myItemSansRang);


// ============================================================
//  APPLICATION PROJET — unifier la source de vérité + strict
//  (dans ranking-shorts, voir guide dédié)
//   - remplace tes types Spec/Item/Source écrits à la main (session 6)
//     par des types DÉRIVÉS de tes schémas Zod (session 7) via z.infer
//   - supprime les définitions en double : le schéma devient l'unique vérité
//   - durcis le tsconfig (options strictes supplémentaires) et corrige
//     ce que ça révèle
//  C'est le "à unifier session 8" que tu avais noté hier.
// ============================================================


// ============================================================
//  Validé quand : tu dérives un type d'un schéma, tu manies
//  Partial/Pick/Omit/Record, et ton projet n'a plus qu'UNE source
//  de vérité pour ses types.
//  git commit -m "phase1 session8 : types dérivés + tsconfig strict"
// ============================================================
