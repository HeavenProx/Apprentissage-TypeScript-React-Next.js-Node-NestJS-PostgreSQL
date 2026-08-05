// ============================================================
//  PHASE 2 — SESSION 5 : composition ffmpeg (option B)
//    npx tsx p2-session5-composition.ts
//  Prérequis : ffmpeg installé + le helper `executer` de la session 3
//
//  Option B : ffmpeg compose. Le clip vidéo est le FOND, ta séquence
//  d'overlays PNG passe PAR-DESSUS, on garde le son du clip.
//  Tu ne décodes jamais une frame toi-même -> pas de piège de synchro.
// ============================================================

import { spawn } from "node:child_process";


// petit helper local (réutilise ton executer de la session 3)
function executer(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args);
    let err = "";
    proc.stderr.on("data", (d) => (err += d.toString()));
    proc.on("close", (c) => (c === 0 ? resolve() : reject(new Error(err.slice(-300)))));
    proc.on("error", reject);
  });
}


// ------------------------------------------------------------
// 1. Deux entrées dans une commande ffmpeg
//    Chaque -i ajoute une "entrée", numérotée dans l'ordre : 0, 1, 2...
//    Entrée 0 = le clip. Entrée 1 = ta séquence de PNG.
//    Une séquence se déclare avec le motif de nom + le framerate.
// ------------------------------------------------------------
// Forme générale (commentée — nécessite tes vrais fichiers) :
//
// await executer("ffmpeg", [
//   "-i", "assets/clip.mp4",                    // entrée 0 : le fond vidéo
//   "-framerate", "30",
//   "-i", "out/frames/frame-%04d.png",          // entrée 1 : tes overlays
//   ...filtre de composition...
//   "-y", "out/final.mp4",
// ]);

// TODO 1a (à raisonner / commenter) : dans quel ORDRE mettre les deux -i,
//   et pourquoi ? (indice : dans le filtre overlay, qui doit être le
//   fond et qui doit être au-dessus ? l'entrée 0 ou l'entrée 1 ?)
// On met le clip en premier et ensuite les frames vont se poser dessus avant la sortie -y

// ------------------------------------------------------------
// 2. Le filtre overlay
//    Le filtre "overlay" superpose une entrée sur une autre.
//    On l'exprime dans l'option -filter_complex, en référençant les
//    entrées par [0:v] (vidéo de l'entrée 0) et [1:v] (entrée 1).
//    Syntaxe de base : "[0:v][1:v]overlay=0:0"
//      -> pose l'entrée 1 sur l'entrée 0, coin haut-gauche (0,0)
// ------------------------------------------------------------

// TODO 2a (à raisonner) : que représente "overlay=0:0" ? Et si tu voulais
//   décaler l'overlay de 100px vers le bas, qu'est-ce qui changerait ?
//   (cherche la doc du filtre overlay : les deux nombres sont x:y)
// C'est les coordonnées précis où on placera les entrées
// Si on voulait décaler de 100px en bas : "overlay=0:100"


// ------------------------------------------------------------
// 3. Gérer le son
//    Par défaut, mélanger des entrées peut perdre l'audio. On indique
//    explicitement quelle piste audio garder : celle du clip (entrée 0).
//    -> on "mappe" : la vidéo vient du filtre, l'audio vient de [0:a].
// ------------------------------------------------------------

// TODO 3a (à raisonner) : ton overlay (PNG) n'a pas de son. Le clip, si.
//   Quelle entrée fournit l'audio ? Comment dire à ffmpeg "prends la
//   vidéo composée + l'audio de l'entrée 0" ? (cherche l'option -map)
// L'entrée 0 fourni l'audio
// -filter_complex "[0:v][1:v]overlay=0:0[v]"   
// -map "[v]" -map 0:a:0     

// ------------------------------------------------------------
// 4. Construire la commande dans du code
//    On assemble le tableau d'arguments proprement, à partir des infos
//    de la Spec (framerate) et des chemins. C'est du pur assemblage
//    de chaîne/tableau — pas de programmation vidéo.
// ------------------------------------------------------------
function argsComposition(clip: string, motifFrames: string, fps: number, sortie: string): string[] {
  return [
    "-i", clip,
    "-framerate", String(fps),
    "-i", motifFrames,
    "-filter_complex", "[0:v][1:v]overlay=0:0[v]",
    // TODO 4a : ajoute ici le -map pour garder l'audio du clip (entrée 0)
    "-map", "[v]",
    "-map", "0:a:0",  
    "-y", sortie,
  ];
}

console.log("4b → args construits :", argsComposition(
  "assets/test.mp4", "out/frames/frame-%04d.png", 30, "out/final.mp4",
).join(" "));

// TODO 4b : complète argsComposition (le -map audio), puis — quand tu
//   auras un vrai clip dans assets/ — appelle
//   `await executer("ffmpeg", argsComposition(...))` et regarde le MP4.
try {
  await executer("ffmpeg", argsComposition(
    "assets/test.mp4", "out/frames/frame-%04d.png", 30, "out/final.mp4",
  ));
} catch (error) {
  if (error instanceof Error) {
    console.error("Error while create the video :", error.message);
  } else {
      console.error("Other error while created the video :", error);
  }
}

// ------------------------------------------------------------
// 5. Le garde-fou du timebox
// ------------------------------------------------------------
// Si tu passes des JOURS à te battre avec la synchro (les overlays qui
// ne tombent pas en face des bonnes frames du clip, des décalages, des
// durées qui ne collent pas), STOP. C'est le signal du timebox.
// Dis-le-moi, on bascule sur Remotion et on avance. L'encodage vidéo
// n'est PAS ton objectif d'employabilité.


// ============================================================
//  APPLICATION PROJET → voir le guide dédié (p2-session5-projet-guide.md)
//  En bref : dans encoder/, une fonction `composer(spec, clip, sortie)`
//  qui superpose ta séquence de frames sur le clip et garde le son.
//  Résultat : une vraie vidéo "ranking".
// ============================================================


// ============================================================
//  Validé quand : tu comprends les entrées numérotées, le filtre
//  overlay [0:v][1:v], et le mappage audio — et tu produis une vidéo
//  où l'overlay animé se superpose au clip avec son.
//  Deux commits : phase2 (exos) + ranking-shorts (composition).
//  git commit -m "phase2 session5 : composition ffmpeg"
// ============================================================
