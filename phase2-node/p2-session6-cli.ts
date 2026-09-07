// ============================================================
//  PHASE 2 — SESSION 6 : la CLI & assemblage V1
//    npx tsx p2-session6-cli.ts unFichier.json --out video.mp4
//
//  Une CLI = un programme qui lit des arguments et orchestre un travail.
//  Aujourd'hui on assemble TOUT le pipeline derrière une commande.
// ============================================================


// ------------------------------------------------------------
// 1. Lire les arguments
//    process.argv = tableau des arguments. Les DEUX premiers sont
//    toujours [chemin de node, chemin du script] -> on les ignore
//    en prenant .slice(2).
// ------------------------------------------------------------
const args = process.argv.slice(2);
console.log("1a → arguments reçus :", args);

// lance avec :  npx tsx p2-session6-cli.ts demo.json --out video.mp4
// et observe ce que contient `args`.

// TODO 1b : affiche le PREMIER argument (le fichier d'entrée) séparément.
//   S'il n'y a aucun argument, affiche un message d'usage et arrête-toi
//   (process.exit avec un code non nul).
const premierArg = args[0];
if(!premierArg){
  console.error("Usage : ranking-shorts <spec.json> [--out f.mp4] [--fps 30]");
  process.exit(1)
} else {
  console.log("1b → arguments reçus :", premierArg);
}


// ------------------------------------------------------------
// 2. Un argument positionnel + une option nommée
//    Positionnel : sa place compte (le 1er = fichier d'entrée).
//    Option nommée : introduite par --nom, sa valeur suit ou est collée.
//    Ici on cherche --out et la valeur juste après.
// ------------------------------------------------------------
function lireOption(args: string[], nom: string, defaut: string): string {
  const i = args.indexOf(nom);
  const arg1 = args[i + 1];
  if (i !== -1 && arg1) return arg1;
  return defaut;
}

const entree = args[0];
const sortie = lireOption(args, "--out", "out/final.mp4");
console.log("2a → entrée :", entree, "| sortie :", sortie);

// TODO 2b : ajoute la lecture d'une option --fps avec 30 par défaut.
//   Attention : lireOption rend une string. Un fps doit être un number
//   (souviens-toi de Number(...) et du cas où la conversion échoue).
const fps = lireOption(args, "--fps", "30");
const nbFps = Number(fps);
if(Number.isNaN(nbFps)){
  console.error("Usage : --fps data is not a number");
  process.exit(1)
} else {
  console.log("2b → entrée :", entree, "| sortie :", nbFps);
}


// ------------------------------------------------------------
// 3. Valider les arguments AVANT de travailler
//    Une bonne CLI échoue vite et clairement si l'entrée est absurde,
//    plutôt que de planter au milieu du rendu.
// ------------------------------------------------------------
function verifierEntree(entree: string | undefined): string {
  if (!entree) {
    console.error("Usage : ranking-shorts <spec.json> [--out fichier.mp4]");
    process.exit(1);
  }
  if (!entree.endsWith(".json")) {
    console.error("Erreur : le fichier d'entrée doit être un .json");
    process.exit(1);
  }
  return entree;
}

// TODO 3b : rien à coder — note le motif : on VALIDE les args d'abord,
//   on TRAVAILLE ensuite. Échouer en 10 ms vaut mieux qu'échouer après
//   30 s de rendu.


// ------------------------------------------------------------
// 4. Orchestrer : une fonction main, un seul point d'échec
//    main() enchaîne les étapes. Un seul try/catch autour de tout,
//    qui affiche proprement et fixe le code de sortie.
// ------------------------------------------------------------
async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    const entree = verifierEntree(args[0]);
    console.log("4a → (simulation) pipeline pour :", entree);
    // Dans le projet, ici s'enchaînent :
    //   chargerSpec -> générer la séquence -> composer -> final.mp4
    console.log("4a → ✅ terminé");
  } catch (err) {
    console.error("❌ Échec :", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
await main();

// TODO 4b (à raisonner) : pourquoi un SEUL try/catch dans main() plutôt
//   qu'un try/catch dans chaque fonction du pipeline ? (indice : qui doit
//   décider d'afficher l'erreur et de quitter — une brique, ou le chef
//   d'orchestre ?)
// Chaque fonctionnalité reporte une erreur et arrête tout le processus en cours 
// dans main et affiche l'erreur donné par la brique

// ============================================================
//  APPLICATION PROJET → voir le guide dédié (p2-session6-projet-guide.md)
//  En bref : câbler la VRAIE CLI de ranking-shorts — args, validation,
//  orchestration charger→frames→composer, messages et codes de sortie.
//  À la fin : `ranking-shorts demo.json` produit un MP4. V1 LIVRÉE.
// ============================================================


// ============================================================
//  Validé quand : tu lis des arguments (positionnels + options), tu
//  valides avant de travailler, et tu orchestres dans un main() avec
//  une gestion d'erreurs centralisée.
//  Deux commits : phase2 (exos) + ranking-shorts (CLI V1).
//  git commit -m "phase2 session6 : CLI & assemblage V1"
// ============================================================
