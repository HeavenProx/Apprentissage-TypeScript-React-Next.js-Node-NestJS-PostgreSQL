# Phase 1 — Session 5 : retyper la todo-list en TypeScript

Objectif : reprendre ta todo-list du Jour 9 (Phase 0) et la passer
entièrement en TypeScript. Aucune notion nouvelle — tu appliques
les sessions 1 à 4 sur ton propre code.

Travaille dans `phase1`. Crée une page (`todo.html`) + un fichier
`todo.ts`, relié en `<script type="module" src="/todo.ts">`.
Vérifie en continu avec `npx tsc --noEmit` et lance avec `npm run dev`.

---

## Étape 1 — L'interface Todo

Reprends l'interface écrite en session 2 (TODO 6). Un todo a un
identifiant, un texte, un état "fait". Place-la en haut du fichier.

C'est le contrat de toute la suite : tout le reste s'y réfère.

## Étape 2 — L'état, typé

- `let todos: Todo[] = [];`
- `let filtreActif` : réutilise le type union de la session 2
  (`"toutes" | "actives" | "terminees"`) plutôt qu'un simple string.
  -> ainsi une faute de frappe sur un filtre devient une erreur TS.

## Étape 3 — Récupérer les éléments du DOM (le piège du jour)

C'est ici que TS va râler, et c'est voulu. `querySelector` renvoie
`... | null`, et un input générique n'a pas de `.value`.

- type chaque élément : `querySelector<HTMLInputElement>("#champ")`,
  `<HTMLUListElement>` pour la liste, etc.
- gère le `null` : soit une garde en début de fichier (if : si un
  élément manque, on arrête), soit la façon que tu juges la plus
  propre. Repense à "prouver plutôt qu'affirmer".

## Étape 4 — Typer les fonctions

Reprends chaque fonction et complète sa signature :

- `render(): void`
- l'ajout, la suppression, le basculement : paramètres typés
  (un `id: number`, un `texte: string`...), retour `void`.
- la fonction qui calcule la liste visible : `(): Todo[]`.

Laisse TS déduire ce qui est évident ; annote les entrées et les
retours des fonctions importantes.

## Étape 5 — Chasser les bugs que TS révèle

Une fois `npx tsc --noEmit` lancé, lis CHAQUE erreur au lieu de la
contourner. Les plus probables :

- l'élément trouvé par `find` peut être `undefined` -> tu dois gérer
  le cas (l'objet cherché pourrait ne pas exister).
- un `id` lu depuis le DOM est une string, comparé à un `id` number :
  TS te le signale (souviens-toi, `"1" === 1` est faux).
- une propriété optionnelle utilisée sans vérification.

Chaque erreur corrigée = un bug de production évité. Ne mets JAMAIS
`any` ou `as` juste pour faire taire le rouge : demande-toi ce que TS
essaie de te dire.

## Étape 6 — (bonto) découper en modules typés

Si tu veux pousser : sépare comme en Phase 0 jour 7, mais en .ts —
`types.ts` (l'interface Todo, exportée), `storage.ts`, `ui.ts`,
`main.ts`. Les types s'importent comme le reste :
`import type { Todo } from "./types.ts";`

---

## Validation de la session ET de la Phase 1

- [ ] `npx tsc --noEmit` ne renvoie AUCUNE erreur
- [ ] zéro `any`, zéro `as` de confort dans ton code
- [ ] l'app fonctionne exactement comme la version JS
- [ ] tu as corrigé au moins un cas que TS a révélé
- [ ] commit : `feat: todo-list typée en TypeScript`

Si tu coches tout ça, la Phase 1 est terminée.

---

## Ce que tu sauras faire, et la suite

Tu sais maintenant lire et écrire du TypeScript : typer des données
(interface/type), des fonctions (paramètres, retours, async, Promise),
lire un générique, et traiter les cas `null`/`undefined` que le
langage t'oblige à voir.

**Prochaine étape — Phase 2 : React.** Et la bonne nouvelle : tu y
arrives avec les deux prérequis déjà en main. Le pattern état -> render,
tu l'as construit à la main en Phase 0. Le typage des props et de
l'état, tu viens de l'acquérir. React ne sera pas une découverte de
plus, mais l'assemblage de deux choses que tu connais déjà.
