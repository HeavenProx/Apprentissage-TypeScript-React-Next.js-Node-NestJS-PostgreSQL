// ============================================================
//  PHASE 2 — SESSION 2 : le canvas côté serveur
//    npx tsx p2-session2-canvas.ts
//  Nécessite : npm install skia-canvas
//
//  Même API 2D que le canvas du navigateur, mais on exporte en PNG
//  au lieu d'afficher. La transparence = ne PAS peindre le fond.
// ============================================================

import { Canvas } from "skia-canvas";


// ------------------------------------------------------------
// 1. Créer une surface, dessiner, exporter
//    new Canvas(largeur, hauteur) -> getContext("2d") -> on dessine
//    -> toFile(chemin) écrit le PNG (format déduit de l'extension)
// ------------------------------------------------------------
async function premierDessin(): Promise<void> {
  const canvas = new Canvas(400, 200);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "tomato";        // couleur de remplissage
  ctx.fillRect(50, 50, 300, 100);  // x, y, largeur, hauteur

  await canvas.toFile("out/1-rectangle.png");
  console.log("1a → out/1-rectangle.png");
}
await premierDessin();

// TODO 1b : crée un canvas 300x300 et dessine deux rectangles de
//   couleurs différentes qui se chevauchent. Exporte en 1b-rects.png.
//   Observe l'ordre : le dernier dessiné passe DEVANT.
async function deuxRect(): Promise<void> {
  const canvas = new Canvas(300, 300);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "blue";
  ctx.fillRect(25, 25, 200, 200);

  ctx.fillStyle = "orange";
  ctx.fillRect(100, 100, 175, 175);

  await canvas.toFile("out/1b-rectangle.png")
}
await deuxRect()


// ------------------------------------------------------------
// 2. Écrire du texte
//    font  = "poids taille police"  (ex : "bold 48px Sans")
//    textAlign / textBaseline positionnent le point d'ancrage.
//    fillText(texte, x, y) dessine au point choisi.
// ------------------------------------------------------------
async function texte(): Promise<void> {
  const canvas = new Canvas(600, 200);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 600, 200);          // fond sombre pour voir le texte clair

  ctx.fillStyle = "white";
  ctx.font = "bold 48px Sans";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Top 5 Motos", 300, 100); // centré dans le canvas

  await canvas.toFile("out/2-texte.png");
  console.log("2a → out/2-texte.png");
}
await texte();

// TODO 2b : écris ton prénom en gros, aligné à GAUCHE, en changeant
//   la couleur et la taille. Joue avec textAlign pour comprendre l'ancrage.
async function myName(): Promise<void> {
  const canvas = new Canvas(600, 200);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 600, 200);         

  ctx.fillStyle = "white";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("Hugo Duperthuy", 300, 100); 

  await canvas.toFile("out/2b-name.png");
  console.log("2b → out/2b-name.png");
}
await myName();

// ------------------------------------------------------------
// 3. La transparence  (le point clé pour l'overlay)
//    On NE peint PAS le fond. Ce qui n'est pas dessiné reste transparent.
//    Ouvre le PNG dans une visionneuse : tu verras le damier = transparent.
// ------------------------------------------------------------
async function overlayTransparent(): Promise<void> {
  const canvas = new Canvas(500, 300);
  const ctx = canvas.getContext("2d");
  // <-- volontairement : aucun fillRect de fond ici

  ctx.fillStyle = "white";
  ctx.font = "bold 40px Sans";
  ctx.fillText("Texte flottant", 40, 160);

  await canvas.toFile("out/3-transparent.png");
  console.log("3a → out/3-transparent.png (fond transparent)");
}
await overlayTransparent();

// TODO 3b : reprends le 3a et ajoute une pastille semi-transparente
//   DERRIÈRE le texte : un fillRect avec une couleur en rgba(...) dont
//   le dernier nombre (alpha) est < 1. Dessine la pastille AVANT le texte.
async function overlaySemiTransparent(): Promise<void> {
  const canvas = new Canvas(500, 300);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(20, 120, 350, 60);   

  ctx.fillStyle = "black";
  ctx.font = "bold 40px Sans";
  ctx.fillText("Texte flottant", 40, 160);

  await canvas.toFile("out/3b-semi-transparent.png");
  console.log("3b → out/3-semi-transparent.png");
}
await overlaySemiTransparent();

// ------------------------------------------------------------
// 4. Mesurer le texte pour se positionner
//    measureText renvoie la largeur d'un texte -> utile pour centrer,
//    encadrer, ou empiler des éléments proprement.
// ------------------------------------------------------------
async function mesure(): Promise<void> {
  const canvas = new Canvas(600, 150);
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 40px Sans";
  const texte = "Mesure-moi";
  const largeur = ctx.measureText(texte).width;
  console.log("4a → largeur du texte :", Math.round(largeur), "px");

  ctx.fillStyle = "gold";
  ctx.fillText(texte, 20, 90);
  await canvas.toFile("out/4-mesure.png");
}
await mesure();

// TODO 4b : dessine un texte, mesure sa largeur, et trace un rectangle
//   d'exactement cette largeur juste en dessous (comme un soulignage).
async function mesureAndTrace(): Promise<void> {
  const canvas = new Canvas(600, 300);
  const ctx = canvas.getContext("2d");

  ctx.font = "bold 24px sans-serif";
  const texte = "Le texte a mesuré !";
  ctx.fillStyle = "gold";
  ctx.fillText(texte, 250, 120);

  const largeur = ctx.measureText(texte).width;
  ctx.fillStyle = "silver";
  ctx.fillRect(250, 125, largeur, 5);
  console.log("4b → largeur du texte :", Math.round(largeur), "px");

  await canvas.toFile("out/4b-mesure-and-trace.png");
}
await mesureAndTrace();

// ------------------------------------------------------------
// 5. Empiler des éléments  (répétition directe de ta liste 1->5)
//    Une boucle qui dessine plusieurs lignes espacées verticalement.
// ------------------------------------------------------------
async function liste(): Promise<void> {
  const canvas = new Canvas(600, 500);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.font = "bold 44px Sans";

  const items = ["Alpha", "Bravo", "Charlie"];
  items.forEach((item, i) => {
    const y = 80 + i * 80;                 // chaque ligne 80px plus bas
    ctx.fillText(`${i + 1}. ${item}`, 40, y);
  });

  await canvas.toFile("out/5-liste.png");
  console.log("5a → out/5-liste.png");
}
await liste();

// TODO 5b : reprends le 5a mais numérote de façon stylée : le numéro
//   dans une couleur différente du texte (deux fillText par ligne,
//   avec un décalage horizontal pour le texte). C'est le brouillon
//   direct de ton overlay projet.
function randomRgbColor(): string {
  const min = 125;
  const max = 225;
  const r = Math.floor(Math.random() * (max - min + 1)) + min;
  const g = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;
  return `rgb(${r}, ${g}, ${b})`;
}

async function bestListe(): Promise<void> {
  const canvas = new Canvas(600, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 44px Sans";

  const items = ["Alpha", "Bravo", "Charlie", "Delta", "Epsilon"];
  items.forEach((item, i) => {
    ctx.fillStyle = "red";
    const y = 80 + i * 80;   // chaque ligne 80px plus bas
    const number = `${i + 1}.`;
    ctx.fillText(number, 40, y);

    ctx.fillStyle = randomRgbColor();
    const largeur = ctx.measureText(number).width;
    ctx.fillText(item, 60 + largeur, y);
  });

  await canvas.toFile("out/5b-liste.png");
  console.log("5b → out/5b-liste.png");
}
await bestListe();

// ============================================================
//  APPLICATION PROJET → voir le guide dédié (p2-session2-projet-guide.md)
//  En bref : générer UNE frame d'overlay complète (titre + liste 1->5)
//  sur fond transparent, à partir de ta Spec validée.
// ============================================================


// ============================================================
//  Validé quand : tu dessines formes + texte, tu maîtrises la
//  transparence (fond non peint), et tu sais empiler une liste.
//  Deux commits : phase2 (exos) + ranking-shorts (frame d'overlay).
//  git commit -m "phase2 session2 : canvas & PNG"
// ============================================================
