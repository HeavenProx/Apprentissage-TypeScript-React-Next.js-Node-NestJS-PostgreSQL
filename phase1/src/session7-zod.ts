// ============================================================
//  PHASE 1 — SESSION 7 : Zod & validation à l'exécution
//
//  Installation (dans phase1 pour les exos, ET dans ranking-shorts) :
//    npm install zod
//
//    npx tsx session7-zod.ts   -> exécute
//    npx tsc --noEmit          -> vérifie les types
//
//  Idée : TypeScript vérifie AVANT l'exécution (à la compilation) mais
//  disparaît ensuite. Zod vérifie PENDANT l'exécution, sur des données
//  réelles et inconnues. Les deux sont complémentaires.
// ============================================================

import { z } from "zod";


// ------------------------------------------------------------
// 1. Un premier schéma
//    On DÉCRIT la forme attendue, puis on confronte une donnée à elle.
// ------------------------------------------------------------
const MotoSchema = z.object({
  nom: z.string(),
  prix: z.number(),
  dispo: z.boolean(),
});

const brut = { nom: "DR-Z400S", prix: 6800, dispo: true };
const moto = MotoSchema.parse(brut);   // renvoie la donnée validée, ou LÈVE une erreur
console.log("1a →", moto.nom);

// TODO 1b : crée un objet `brut` volontairement invalide (prix en string,
//   ou champ manquant) et passe-le à .parse(). Observe l'erreur levée :
//   Zod dit EXACTEMENT quel champ et pourquoi. Compare avec un plantage
//   JS classique, illisible.
const brutFalse = { nom: "DR-Z400S", prix: "6800", dispo: "yes" };

try {
  const moto2 = MotoSchema.parse(brutFalse);   
  console.log("1b → ok", moto2);
} catch(err){
  console.log("1b → invalide :", err);
}


// ------------------------------------------------------------
// 2. parse vs safeParse
//    parse      -> lève une exception si invalide (à envelopper d'un try)
//    safeParse  -> ne lève rien, renvoie { success, data } ou { success, error }
//    safeParse est souvent plus pratique : pas de try/catch, tu testes success.
// ------------------------------------------------------------
const resultat = MotoSchema.safeParse({ nom: "X", prix: "cher", dispo: true });
if (resultat.success) {
  console.log("2a → ok", resultat.data);
} else {
  console.log("2a → invalide :", resultat.error.issues[0].message);
}

// TODO 2b : réécris l'exemple de la section 1 avec safeParse au lieu de
//   parse + try/catch. Affiche un message différent selon success.
const resultat2 = MotoSchema.safeParse(brutFalse);
if (resultat2.success) {
  console.log("2b → ok", resultat2.data);
} else {
  console.log("2b → invalide :", resultat2.error.issues[0].message);
}




// ------------------------------------------------------------
// 3. Contraintes plus fines
//    Zod valide bien plus que le type : bornes, formats, valeurs permises.
// ------------------------------------------------------------
const UserSchema = z.object({
  id: z.number().int().positive(),
  nom: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0).max(120).optional(),
  role: z.enum(["admin", "membre"]).optional()
});

console.log("3a →", UserSchema.safeParse({ id: 1, nom: "Hugo", email: "a@b.co" }).success);

// TODO 3b : ajoute au schéma un champ `role` qui n'accepte QUE
//   "admin" ou "membre". (indice : z a un équivalent des unions
//   littérales de la session 2 — cherche "enum" ou "literal" dans
//   la doc zod ; je ne te donne pas le nom exact exprès)
console.log("3b →", UserSchema.safeParse({ id: 2, nom: "Hugo2", email: "a@b2.co", role: "admin" }).success);




// ------------------------------------------------------------
// 4. Schémas imbriqués, tableaux, unions
//    Un schéma peut en contenir d'autres — exactement comme tes interfaces.
// ------------------------------------------------------------
const AdresseSchema = z.object({
  ville: z.string(),
  codePostal: z.string(),
});

const ClientSchema = z.object({
  nom: z.string(),
  adresse: AdresseSchema,           // schéma imbriqué
  commandes: z.array(z.number()),   // tableau
});

console.log("4a →", ClientSchema.safeParse({
  nom: "Hugo",
  adresse: { ville: "Lyon", codePostal: "69000" },
  commandes: [1, 2],
}).success);

// TODO 4b : crée un schéma `SourceSchema` qui reproduit TON union
//   discriminée de la session 6 (la source d'un item).
//   Indice : Zod sait faire des unions discriminées, cherche la méthode
//   dédiée (elle prend le nom du champ discriminant en argument).
//   -> c'est le pont direct vers la tâche projet du jour.
type Source = z.infer<typeof SourceSchema>;

const SourceSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("file"), chemin: z.string() }),
  z.object({ type: z.literal("url"), lien: z.string() }),
  z.object({ type: z.literal("color"), hex: z.string() }),
]);

console.log("4b →", SourceSchema.safeParse({
  type: "file",
  chemin:"lienTest" 
}).success);



// ------------------------------------------------------------
// 5. Valider une entrée "du monde réel"
//    Simule la lecture d'un fichier JSON : la donnée arrive en `unknown`.
//    C'est le cas typique où TS seul ne te protège pas.
// ------------------------------------------------------------
function lireDonnee(entree: unknown) {
  const r = MotoSchema.safeParse(entree);
  if (!r.success) {
    // ici tu refuses proprement plutôt que de laisser planter plus loin
    console.log("5a → refusé :", r.error.issues.map((i) => i.path.join(".") + ": " + i.message));
    return null;
  }
  return r.data;   // à partir d'ici, TS SAIT que c'est une Moto valide
}

lireDonnee({ nom: "OK", prix: 5000, dispo: false });
lireDonnee({ nom: "KO", prix: "beaucoup" });   // provoque le refus

// TODO 5b : rien à écrire — relis cette fonction et assure-toi de
//   comprendre pourquoi `r.data` est correctement typé APRÈS le if.
//   C'est ça, le pont entre "unknown" et "typé, prouvé".
// Il fait du narrowing, comment il y a un r.success, il sait où le placer


// ============================================================
//  APPLICATION PROJET — valider la spec (à faire dans ranking-shorts)
//  Voir le guide dédié. En résumé :
//   - un specSchema Zod qui valide une Spec complète
//     (réutilise/imbrique le SourceSchema du TODO 4b)
//   - une petite fonction qui lit examples/demo.json et le valide :
//     JSON valide -> ok ; JSON cassé -> message clair, pas un plantage
//  Rappel : c'est l'aboutissement de "affirmer vs prouver". Ton fetch/
//  ta lecture de fichier ne MENT plus à TypeScript : Zod PROUVE la forme.
// ============================================================


// ============================================================
//  Validé quand : tu sais écrire un schéma, choisir parse/safeParse,
//  et transformer un `unknown` en donnée typée prouvée.
//  git commit -m "phase1 session7 : validation avec Zod"
// ============================================================
