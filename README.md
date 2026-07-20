# Apprentissage — TypeScript / React / Next.js / Node / NestJS / PostgreSQL

Parcours d'autoformation structuré pour passer d'un stack web classique
(HTML/CSS, jQuery, PHP, SQL) à l'écosystème JavaScript/TypeScript moderne.

Ce dépôt n'est pas un projet client : c'est un carnet de bord d'apprentissage.
Chaque session correspond à un commit, du premier exercice au projet final.

## Stack visée

| Couche | Techno |
|---|---|
| Langage | TypeScript |
| Front | React, Next.js |
| Back | Node.js, NestJS |
| Base de données | PostgreSQL |
| Outillage | Vite, npm, Git |

## Progression

- [x] **Phase 0 — Socle JavaScript moderne**
- [ ] Phase 1 — TypeScript
- [ ] Phase 2 — React (Vite)
- [ ] Phase 3 — Next.js
- [ ] Phase 4 — Node / Express / NestJS
- [ ] Phase 5 — PostgreSQL + Prisma
- [ ] Phase 6 — Projet full-stack & déploiement

## Phase 0 — contenu

Reprise des fondamentaux JavaScript sans jQuery, en 10 sessions.

| Session | Sujet |
|---|---|
| 1 | ES6+ : `const`/`let`, arrow functions, template literals, déstructuration, spread |
| 2 | Méthodes de tableau : `forEach`, `map`, `filter` |
| 3 | `find`, `reduce`, chaînage de méthodes |
| 4 | DOM en vanilla : `querySelector`, `addEventListener`, `createElement`, `classList` |
| 5 | Asynchrone : promesses, `async`/`await`, `try`/`catch` |
| 6 | `fetch` sur une API REST, gestion des erreurs HTTP |
| 7 | Modules `import`/`export`, découpage en couches, npm |
| 8–9 | Projet : todo-list en JS pur (état, `render()`, ajout, suppression, filtres, `localStorage`) |
| 10 | Consolidation et auto-évaluation |

**Fil conducteur du projet final :** l'interface est pilotée par un état unique
(un tableau `todos`) et une fonction `render()` qui redessine l'affichage à
partir de cet état. Aucune manipulation directe du DOM en dehors du rendu —
le même modèle mental que celui utilisé ensuite par React.

## Lancer le projet

```bash
cd phase0
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:5173`.
Les exercices de logique pure se lancent directement avec Node :

```bash
node scratch.js
```

## Convention de commits

[Conventional Commits](https://www.conventionalcommits.org/) :
`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.
