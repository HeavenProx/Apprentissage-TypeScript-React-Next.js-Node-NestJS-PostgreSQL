// ============================================================
//  PHASE 2 — SESSION 4 : streams & animation
//    npx tsx p2-session4-streams-animation.ts
//
//  Une animation = une SUITE d'images fixes. Pour chaque frame, on
//  calcule l'état à cet instant, puis on le dessine. ffmpeg recolle.
//  Le CALCUL de l'état est de la logique pure -> testable sans image.
// ============================================================


// ------------------------------------------------------------
// 1. Le temps en frames
//    À un framerate donné, chaque frame correspond à un instant.
//    frame N  ->  temps = N / fps  (en secondes)
// ------------------------------------------------------------
const fps = 30;
const dureeSecondes = 3;
const nbFrames = fps * dureeSecondes;   // 90 frames pour 3 s

console.log("1a → nb de frames :", nbFrames);

// TODO 1b : écris une fonction `tempsDeLaFrame(index: number, fps: number): number`
//   qui rend le temps en secondes d'une frame. Teste-la sur la frame 0,
//   la frame 30, la frame 45.
function tempsDeLaFrame(index: number, fps: number): number {
  return index / fps;
}
console.log("1b : ", " 0 : ", tempsDeLaFrame(0, 30), " 30 : ", tempsDeLaFrame(30, 30), " 45 : ", tempsDeLaFrame(45, 30))


// ------------------------------------------------------------
// 2. LOGIQUE PURE : quels items sont visibles à la frame N ?
//    C'est LE calcul central. Aucune image ici, juste des maths.
//    Idée simple : un item apparaît toutes les `fps/2` frames par ex.
//    (un nouvel item toutes les 0,5 s). Donc à la frame N, le nombre
//    d'items visibles = combien d'intervalles se sont écoulés.
// ------------------------------------------------------------
function itemsVisibles(frame: number, framesParItem: number, total: number): number {
  const apparus = Math.floor(frame / framesParItem) + 1;
  return Math.min(apparus, total);   // jamais plus que le total
}

console.log("2a → frame 0  :", itemsVisibles(0, 15, 5));    // 1
console.log("2a → frame 15 :", itemsVisibles(15, 15, 5));   // 2
console.log("2a → frame 120 :", itemsVisibles(120, 15, 5));   // 5 (plafonné)

// Remarque : cette fonction est PURE. On la teste par des console.log,
// sans jamais dessiner. C'est là que doit vivre le timing (archi §7).

// TODO 2b : vérifie ton intuition — à quelle frame le 3e item
//   apparaît-il avec framesParItem = 15 ? Prédis, puis teste avec la
//   fonction. (comprendre la formule, pas juste l'utiliser)
// Il devrait apparaitre à la frame 30 : (30 / 15) + 1 = 3.00


// ------------------------------------------------------------
// 3. La boucle de frames  (le squelette du rendu de séquence)
//    Pour chaque frame : on calcule l'état, on (dessinerait) l'image.
//    Ici on affiche l'état au lieu de dessiner, pour valider la logique.
// ------------------------------------------------------------
function simulerSequence(nbFrames: number, framesParItem: number, total: number): void {
  for (let f = 0; f < nbFrames; f++) {
    const visibles = itemsVisibles(f, framesParItem, total);
    const progressionApparition = parseFloat(((f % framesParItem) / framesParItem).toFixed(2));
    if (f % 15 === 0) {   // on n'affiche qu'une frame sur 15 pour lisibilité
      console.log(`3a → frame ${f} : ${visibles} item(s) visible(s)`);
    } 
    if(f < (total * framesParItem)){
      console.log(`3b → frame ${f} : Apparition du prochain item : ${progressionApparition}`);
    }
  }
}
simulerSequence(90, 15, 5);

// TODO 3b : ajoute un paramètre pour qu'un item, en plus d'apparaître,
//   ait une "progression d'apparition" (0 à 1) sur ses premières frames
//   — utile plus tard pour un fondu. Rends un nombre entre 0 et 1 pour
//   le dernier item qui apparaît. (juste la logique, pas le dessin)
// C'est rajouter dans simulerSequence ;)


// ------------------------------------------------------------
// 4. Nommer les frames pour ffmpeg
//    ffmpeg lit une séquence via un motif : frame-0001.png, frame-0002...
//    Les numéros doivent être ZÉRO-REMPLIS (padding) et dans l'ordre,
//    sinon ffmpeg les assemble mal.
// ------------------------------------------------------------
function nomFrame(index: number): string {
  return `frame-${String(index).padStart(4, "0")}.png`;   // frame-0007.png
}
console.log("4a →", nomFrame(1), nomFrame(42), nomFrame(1000));

// TODO 4b (à raisonner) : pourquoi "0007" et pas "7" ? Que se passerait-il
//   à l'assemblage si tu avais frame-1.png, frame-2.png … frame-10.png
//   triés par ordre alphabétique ? (indice : "10" vient avant "2")
// ffmpeg colleerai les frames dans le mauvais ordre... Comme l'indice le montre
// frame-10.png viendrait avant frame-2.png car 1 < 2 et donc ça casserait l'animation 
// Alors que 0010 et 0002, rassemble l'ordre alphabétique avec l'ordre numérique et les trie vraiment
// alphabétique : 1 < 11 < 17 < 2 < 23 < 3
// numérique : 0001 < 0002 < 0003 < 0011 < 0017 < 0023


// ------------------------------------------------------------
// 5. Streams : écrire sans saturer la mémoire  (survol)
//    Générer 90 fichiers, ça va. Générer des milliers de gros buffers
//    d'un coup en mémoire, non. Les streams écrivent au fil de l'eau.
//    Pour l'instant, retiens le PRINCIPE : on produit et on écrit frame
//    par frame, on ne garde pas tout en mémoire.
// ------------------------------------------------------------
// (pas de TODO — notion de fond ; skia-canvas + writeFile par frame
//  suffisent à ton échelle. Les streams deviennent critiques sur de
//  gros volumes, à connaître pour la culture back-end.)


// ============================================================
//  APPLICATION PROJET → voir le guide dédié (p2-session4-projet-guide.md)
//  En bref : mettre la logique de timing (itemsVisibles) dans core/,
//  faire que le renderer dessine UNE frame pour un "état" donné, puis
//  générer la SÉQUENCE complète de PNG dans out/frames/.
// ============================================================


// ============================================================
//  Validé quand : tu sais qu'une animation = suite de frames, tu sais
//  calculer un état à la frame N (logique pure), et tu sais pourquoi
//  le padding des noms de fichiers est indispensable.
//  Deux commits : phase2 (exos) + ranking-shorts (séquence de frames).
//  git commit -m "phase2 session4 : streams & animation"
// ============================================================
