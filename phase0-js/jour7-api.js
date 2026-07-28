// ============================================================
//  MODULE "données"  (jour7-api.js)
//  Son seul job : parler à l'API. Il ne touche jamais au DOM.
//  `export` rend fetchUsers() utilisable depuis les autres fichiers.
//  -> Ce fichier est FOURNI complet : il te sert de modèle d'export.
// ============================================================

const URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
  const reponse = await fetch(URL);
  if (!reponse.ok) throw new Error("HTTP " + reponse.status);
  return await reponse.json();
}
