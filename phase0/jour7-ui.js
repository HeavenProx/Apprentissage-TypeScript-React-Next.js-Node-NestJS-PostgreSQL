// ============================================================
//  MODULE "affichage"  (jour7-ui.js)
//  Son seul job : manipuler le DOM. Il ne connaît pas l'API.
// ============================================================

// TODO A : complète le corps de cette fonction (reprends ta logique du Jour 6).
//   Elle doit :
//     - vider la liste :            liste.innerHTML = "";
//     - pour chaque user : créer un <li>, y mettre user.name, l'append à `liste`
//   Le mot-clé `export` devant est déjà là : il rend la fonction importable.
export function afficherUsers(users, liste) {
  liste.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    liste.append(li);
  })

  return liste;
}
