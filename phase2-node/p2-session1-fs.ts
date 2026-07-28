// ============================================================
//  PHASE 2 — SESSION 1 : Node & le système de fichiers
//    npx tsx p2-session1-fs.ts
//
//  On est en Node pur : pas de navigateur, pas de DOM.
//  fs/promises = lire/écrire des fichiers en async/await.
//  path        = construire des chemins proprement (multi-OS).
// ============================================================

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";


// ------------------------------------------------------------
// 1. Chemins : absolu vs relatif  (le piège du jour)
//    Un chemin relatif dépend de l'endroit d'où tu LANCES la commande,
//    pas de l'endroit où est le fichier. D'où les surprises.
//    path.join assemble des morceaux avec le bon séparateur.
// ------------------------------------------------------------
const dossierSortie = path.join(process.cwd(), "out");
// process.cwd() = le dossier courant du terminal (Current Working Directory)
console.log("0 → dossier courant :", process.cwd());

console.log("1a → dossier de sortie :", dossierSortie);

// TODO 1b : construis avec path.join un chemin vers "examples/demo.json"
//   à partir de process.cwd(), et affiche-le.
const fileDemo = path.join(process.cwd(), "examples", "demo.json");
console.log("1b → fichier de demo :", fileDemo);


// ------------------------------------------------------------
// 2. Écrire un fichier
//    writeFile crée (ou écrase) un fichier. Tout est asynchrone -> await.
// ------------------------------------------------------------
async function ecrireExemple(): Promise<void> {
  await mkdir(dossierSortie, { recursive: true });   // crée out/ si absent
  const chemin = path.join(dossierSortie, "test.txt");
  await writeFile(chemin, "Bonjour depuis Node", "utf-8");
  console.log("2a → écrit :", chemin);
}
await ecrireExemple();

// TODO 2b : écris une fonction qui crée un fichier "notes.txt" dans out/
//   avec un contenu de ton choix. Vérifie qu'il apparaît sur le disque.
async function ecrireNotes(): Promise<void>{
  const cheminNotes = path.join(dossierSortie, "notes.txt");
  await writeFile(cheminNotes, "Ma petite note !", "utf-8");
}
await ecrireNotes();

// ------------------------------------------------------------
// 3. Lire un fichier
//    readFile rend le CONTENU. Sans encodage, tu obtiens des octets bruts
//    (un Buffer) ; avec "utf-8", tu obtiens une chaîne.
// ------------------------------------------------------------
async function lireExemple(): Promise<void> {
  const chemin = path.join(dossierSortie, "test.txt");
  const contenu = await readFile(chemin, "utf-8");
  console.log("3a → lu :", contenu);
}
await lireExemple();

// TODO 3b : lis le fichier "notes.txt" que tu as créé au 2b et affiche-le.
async function readNotes(): Promise<void> {
  const cheminNotes = path.join(dossierSortie, "notes.txt");
  const contenuNotes = await readFile(cheminNotes, "utf-8");
  console.log("3b → lu :", contenuNotes);
}
await readNotes();


// ------------------------------------------------------------
// 4. Lire du JSON  (le cas réel de ton projet)
//    readFile rend du TEXTE. Pour obtenir un objet, on JSON.parse.
//    Rappel session 7 : le résultat est de type `unknown` — normal,
//    Node ne peut pas deviner la forme d'un fichier.
// ------------------------------------------------------------
async function lireJson(chemin: string): Promise<unknown> {
  const texte = await readFile(chemin, "utf-8");
  return JSON.parse(texte);
}
// (on l'appellera dans l'application projet, sur un vrai demo.json)

// TODO 4b : rien à coder ici — juste noter mentalement : cette fonction
//   rend `unknown`. C'est EXACTEMENT la frontière dont parlait la note
//   d'archi : ce qui sort d'ici doit être validé (Zod) avant d'être utilisé.


// ------------------------------------------------------------
// 5. Gérer l'erreur "fichier absent"
//    Lire un fichier qui n'existe pas LÈVE une erreur. On l'attrape.
// ------------------------------------------------------------
async function lireSur(chemin: string): Promise<string | null> {
  try {
    return await readFile(chemin, "utf-8");
  } catch {
    console.log("5a → introuvable :", chemin);
    return null;
  }
}
await lireSur(path.join(dossierSortie, "nexiste-pas.txt"));

// TODO 5b : liste le contenu du dossier out/ avec readdir, et affiche
//   les noms de fichiers. (readdir rend un tableau de chaînes)
async function lireDossier(chemin: string): Promise<string[] | null> {
  try {
    return await readdir(chemin);
  } catch(err){
    console.log("Error : ", err);
    return null
  }
}
console.log("5b →", await lireDossier(dossierSortie));


// ============================================================
//  APPLICATION PROJET (dans ranking-shorts)
//  Objectif : brancher le chargement de spec sur de VRAIS fichiers,
//  en respectant la note d'archi (le fs vit dans cli, pas dans core).
//
//   1. dans src/cli/, écris une fonction qui :
//      - reçoit un chemin de fichier
//      - le lit (readFile) et le parse (JSON.parse)  -> unknown
//      - passe ce unknown à la validation de ton core (specSchema)
//      - rend la Spec validée, ou affiche une erreur propre si invalide
//   2. teste-la sur examples/demo.json (valide) puis sur un JSON cassé
//   3. c'est le petit DÉPLACEMENT annoncé en section 6 de la note d'archi :
//      la lecture disque quitte le core pour la cli. Le core ne garde
//      que la validation.
//
//  Rappel : montre-moi ce que tu tentes avant que je commente le code.
// ============================================================


// ============================================================
//  Validé quand : tu lis/écris des fichiers, tu construis un chemin
//  avec path, tu gères un fichier absent, et tu sais pourquoi le
//  résultat d'un JSON.parse est `unknown`.
//  Deux commits : phase2 (exos) + ranking-shorts (chargement de spec).
//  git commit -m "phase2 session1 : fs & chemins"
// ============================================================
