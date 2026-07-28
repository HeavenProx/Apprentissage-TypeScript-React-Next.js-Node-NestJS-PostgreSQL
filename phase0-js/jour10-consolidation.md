# Phase 0 — Jour 10 : consolidation & auto-évaluation

Pas de nouveau concept aujourd'hui. Objectif : passer de
« j'ai réussi à le faire » à « je sais le faire ».

---

## 1. Nettoyage (~20 min)

Relis ton `jour9-todo.js` avec un œil critique :

- [good] Les noms sont-ils explicites ? (`t`, `x`, `data` → renomme)
- [good] Y a-t-il du code mort, des `console.log` de debug oubliés ?
- [good] Y a-t-il du `liste.append(...)` **en dehors** de `render()` ?
      → si oui, c'est une entorse au pattern, corrige-la.
- [good] Les fonctions font-elles une seule chose ?
      Si `render()` dépasse ~30 lignes, extrais la création d'un `<li>`
      dans sa propre petite fonction.
- [good] Passe le code au format cohérent (indentation, guillemets).

Commit : `refactor: nettoyage todo-list`

---

## 2. LE TEST — réécriture à blanc (~30 min)

Le vrai juge de paix. Règle absolue : **fichier vierge, aucun coup d'œil
à ton code existant, aucune IA.** Tu peux consulter MDN uniquement.

Crée `test-blanc.js` et écris de mémoire :

1. Un tableau `todos` avec 3 objets `{ id, texte, fait }` (en dur).
2. Une fonction `render()` qui redessine une liste `<ul>` depuis ce tableau.
3. Une fonction qui supprime un todo par son `id`.
4. Une fonction qui retourne uniquement les todos non faits.
5. Une fonction `async` qui `fetch` une URL et retourne les données,
   avec la vérification de la réponse et un `try/catch`.

Puis compare avec ton code du Jour 9.

**Grille de lecture :**

| Résultat | Verdict |
|---|---|
| Tout est sorti sans blocage | Phase 0 validée, passe à la Phase 1 |
| 1-2 hésitations, retrouvées seul | Validée aussi — c'est normal |
| Blocage sur `map`/`filter` | Refais le Jour 2-3 avant d'avancer |
| Blocage sur `async`/`fetch` | Refais le Jour 5-6 avant d'avancer |
| Blocage sur le pattern `render()` | Refais le Jour 8 — c'est le plus important |

Un blocage n'est pas un échec : c'est l'information la plus utile de
toute la phase. Mieux vaut le découvrir ici qu'en plein React.

---

## 3. Soigner le repo (~15 min)

Ce repo sera visible en entretien. Écris un vrai `README.md` à la racine :

- Ce qu'est ce repo (parcours d'autoformation, pas un projet client)
- La stack visée : TypeScript → React/Next.js → Node/NestJS → PostgreSQL
- Les phases, avec ✅ sur la Phase 0
- Ce que couvre la Phase 0 (ES6, tableaux, DOM, async/fetch, modules, todo-list)
- Comment lancer : `npm install` puis `npm run dev`

Commit : `docs: README du parcours`

---

## Bilan — ce que tu sais faire maintenant

- Écrire du JS moderne sans jQuery
- Transformer et filtrer des données (`map`, `filter`, `reduce`, `find`)
- Manipuler le DOM en vanilla
- Consommer une API en `async/await` avec gestion d'erreur
- Découper un projet en modules et gérer des paquets npm
- Piloter une UI par un état, via le pattern `render()`

Ce dernier point est **le** prérequis de React. Tu l'as construit à la main :
en Phase 2, tu comprendras exactement ce que React automatise, au lieu de
l'utiliser comme une boîte noire. C'est ton avantage sur ceux qui
commencent directement par React.

---

## Prochaine étape

**Phase 1 — TypeScript.** Plus courte (~4-5 sessions) : types de base,
interfaces, typage des fonctions, un peu de génériques, puis on retype
ta todo-list en TS. Tu verras ton éditeur devenir beaucoup plus bavard —
dans le bon sens.
