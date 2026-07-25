# Apprentissage — TypeScript / React / Next.js / Node / NestJS / PostgreSQL

Parcours d'autoformation structuré pour passer d'un stack web classique
(HTML/CSS, jQuery, PHP, SQL) à l'écosystème JavaScript/TypeScript moderne.

Ce dépôt n'est pas un projet client : c'est un carnet de bord d'apprentissage.
Chaque session correspond à un commit, du premier exercice au projet final.

## Méthode : concept → application

Une règle guide tout le parcours : **je ne découvre jamais une notion
directement dans un projet.**

1. Exercice isolé sur la notion, hors contexte
2. Vérification qu'elle est comprise
3. **Ensuite seulement**, application dans le projet fil rouge

Les exercices vivent ici. Le projet fil rouge vit dans son propre dépôt
(voir ci-dessous) : c'est là que chaque notion apprise est mise à l'épreuve
sur du code qui doit réellement fonctionner.

## Projet fil rouge — ranking-shorts

Générateur de vidéos « ranking » (format vertical 1080×1920 : un titre
stylisé et une liste numérotée révélée progressivement par-dessus des clips).
Reconstruction personnelle d'un équivalent de viblo.ai.

Le projet avance par versions montrables, chacune fonctionnelle de bout en bout :

| Version | Contenu | Phase associée |
|---|---|---|
| **V1** | CLI : un JSON en entrée, un MP4 en sortie | Phases 1–2 |
| **V2** | Éditeur Next.js avec preview | Phases 3–4 |
| **V3** | API NestJS, queue, PostgreSQL, auth, tests, CI | Phases 5–6 |
| **V4** | Déployé, URL publique | Phase 7 |

Dépôt du projet : `<lien vers ranking-shorts>`

## Stack visée

| Couche | Techno |
|---|---|
| Langage | TypeScript |
| Rendu / outils | Node.js, ffmpeg |
| Front | React, Next.js |
| Back | NestJS |
| Base de données | PostgreSQL |
| Outillage | Vite, npm, Git |

## Progression

- [x] **Phase 0 — Socle JavaScript moderne**
- [ ] Phase 1 — TypeScript *(en cours)*
- [ ] Phase 2 — Node : renderer, ffmpeg, CLI → **V1**
- [ ] Phase 3 — React : fondamentaux + composants de l'éditeur
- [ ] Phase 4 — Next.js : éditeur assemblé → **V2**
- [ ] Phase 5 — NestJS : API, queue, validation
- [ ] Phase 6 — PostgreSQL, authentification, tests, CI/CD → **V3**
- [ ] Phase 7 — Déploiement → **V4**

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

## Phase 1 — contenu

Ajout d'une couche de types au JavaScript, en 8 sessions.
Les tâches d'application amorcent la modélisation de la spec du projet.

| Session | Sujet | Application projet |
|---|---|---|
| 1 | Types de base, inférence, `any` vs `unknown` | — |
| 2 | `interface` & `type`, unions, propriétés optionnelles | — |
| 3 | Typage des fonctions, `Promise<T>`, typage d'un `fetch` | — |
| 4 | Génériques, typage du DOM (`null`, prouver vs affirmer) | — |
| 5 | Migration de la todo-list en TypeScript | Bootstrap du dépôt projet, première interface `Spec` |
| 6 | Unions discriminées & narrowing, `never` | Modélisation de la source d'un item |
| 7 | Zod : validation à l'exécution | Schéma de validation de la spec + CLI qui refuse un JSON invalide |
| 8 | Types dérivés (`z.infer`, `Partial`/`Pick`/`Omit`), `tsconfig` strict | Une seule source de vérité pour les types du projet |

## Lancer les exercices

```bash
cd phase1
npm install
npx tsx <fichier>.ts     # exécuter
npx tsc --noEmit         # vérifier les types (sans produire de fichier)
```

Les exercices navigateur (DOM) se lancent avec `npm run dev` sur
`http://localhost:5173`.

## Convention de commits

[Conventional Commits](https://www.conventionalcommits.org/) :
`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.