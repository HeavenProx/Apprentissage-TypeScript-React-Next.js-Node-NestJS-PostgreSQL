// ============================================================
//  PHASE 2 — SESSION 3 : processus enfants & ffmpeg
//    npx tsx p2-session3-child-process.ts
//  Prérequis système : ffmpeg installé (ffmpeg -version doit répondre)
//
//  Node pilote un programme externe : il le lance, lui passe des
//  arguments, écoute sa sortie, et attend sa fin.
// ============================================================

import { spawn } from "node:child_process";


// ------------------------------------------------------------
// 1. Lancer un programme et écouter sa sortie
//    spawn(programme, [arguments]) démarre un sous-processus.
//    Sa sortie arrive par MORCEAUX (événements "data"), pas d'un bloc.
// ------------------------------------------------------------
function lancerEcho(): void {
  const proc = spawn("echo", ["Bonjour", "depuis", "un", "sous-processus"]);

  proc.stdout.on("data", (chunk) => {
    console.log("1a → sortie :", chunk.toString().trim());
  });

  proc.on("close", (code) => {
    console.log("1a → terminé, code de sortie :", code);   // 0 = succès
  });
}
lancerEcho();

// TODO 1b : lance la commande `ls` avec l'argument "-la" et affiche sa
//   sortie. (même structure : spawn, écoute de stdout, close)
function lancerLsLa(): void {
  const proc = spawn("ls", ["-la"]);

  proc.stdout.on("data", (chunk) => {
    console.log("1b → sortie :", chunk.toString().trim());
  });

  proc.on("close", (code) => {
    console.log("1b → terminé, code de sortie :", code);   // 0 = succès
  });
}
lancerLsLa();

// ------------------------------------------------------------
// 2. stdout vs stderr, et le code de sortie
//    Un programme écrit son résultat sur stdout, ses erreurs sur stderr.
//    Le "code de sortie" dit si ça s'est bien passé : 0 = ok, sinon échec.
//    ffmpeg, lui, écrit TOUTES ses infos sur stderr (déroutant mais normal).
// ------------------------------------------------------------
function ffmpegVersion(): void {
  const proc = spawn("ffmpeg", ["-version"]);
  // const proc = spawn("ffmpeg", ["-version"]);

  proc.stdout.on("data", (d) => console.log("2a → stdout :", d.toString().split("\n")[0]));
  proc.stderr.on("data", (d) => console.log("2a → stderr :", d.toString().split("\n")[0]));
  proc.on("close", (code) => console.log("2a → code :", code));
}
ffmpegVersion();

// TODO 2b : lance `ffmpeg` SANS aucun argument. Observe : il écrit sur
//   stderr et ressort avec un code différent de 0 (il attend des args).
//   -> comprendre ça t'évitera de croire à tort que "ffmpeg a planté".


// ------------------------------------------------------------
// 3. Envelopper dans une promesse  (le motif réutilisable)
//    spawn fonctionne par événements. Pour l'utiliser en async/await,
//    on l'enveloppe dans une Promise : resolve si code 0, reject sinon.
// ------------------------------------------------------------
function executer(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args);
    let erreurs = "";
    proc.stderr.on("data", (d) => (erreurs += d.toString()));
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} a échoué (code ${code}) : ${erreurs.slice(0, 200)}`));
    });
    proc.on("error", reject);   // ex : programme introuvable
  });
}

await executer("echo", ["test promesse ok"]);
console.log("3a → la commande s'est terminée, on peut continuer");

// TODO 3b : appelle `executer("ffmpeg", ["-version"])` dans un try/catch
//   et affiche "ffmpeg présent" si ça passe. Puis appelle-la avec un
//   programme bidon ("programmeInexistant") et vérifie que le catch
//   se déclenche. Ce `executer` est le patron que tu réutiliseras.
try {
  await executer("ffmpeg", ["-version"]);
  console.log("3b1 → ffmpeg présent");
} catch (err){
  console.log("3b1 → Error : ", err);
}

// try {
//   await executer("programmeInexistant", []);
//   console.log("3b2 → ffmpeg présent");
// } catch (err){
//   console.log("3b2 → Error : ", err);
// }
// 3b2 → Error :  Error: spawn programmeInexistant ENOENT
//     at ChildProcess._handle.onexit (node:internal/child_process:285:19)
//     at onErrorNT (node:internal/child_process:483:16)
//     at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'spawn programmeInexistant',
//   path: 'programmeInexistant',
//   spawnargs: []
// }

// ------------------------------------------------------------
// 4. Passer de VRAIS arguments ffmpeg
//    Chaque option et sa valeur sont des éléments SÉPARÉS du tableau.
//    ["-i", "entree.mp4"] et non ["-i entree.mp4"] : spawn ne découpe pas.
// ------------------------------------------------------------
// Exemple (commenté — nécessite un fichier d'entrée réel) :
try {
  await executer("ffmpeg", [
    "-i", "assets/test.mkv",     // fichier d'entrée
    "-t", "3",                   // garder 3 secondes
    "-y",                        // écraser la sortie si elle existe
    "out/extrait.mp4",           // fichier de sortie
  ]);
} catch (error) {
  console.log("4a : ", error);
}

// TODO 4b (à raisonner / commenter) : pourquoi doit-on écrire
//   ["-i", "clip.mp4"] en DEUX éléments et non ["-i clip.mp4"] en un seul ?
//   (indice : spawn passe le tableau tel quel au programme, sans le
//   découper comme le ferait un shell)
// spawn passe chaque élément du tableau tel quel, comme un argument 
// séparé, il ne découpe pas sur les espaces 

// ============================================================
//  APPLICATION PROJET → voir le guide dédié (p2-session3-projet-guide.md)
//  En bref : créer encoder/ avec un helper `executer` (le patron du 3),
//  et l'utiliser pour un PREMIER appel ffmpeg réel — transformer ta
//  séquence/frame en un embryon de vidéo, pour valider la tuyauterie.
// ============================================================


// ============================================================
//  Validé quand : tu lances un programme externe, tu distingues
//  stdout/stderr et le code de sortie, et tu sais envelopper spawn
//  dans une promesse async-friendly.
//  Deux commits : phase2 (exos) + ranking-shorts (encoder/executer).
//  git commit -m "phase2 session3 : child_process & ffmpeg"
// ============================================================
