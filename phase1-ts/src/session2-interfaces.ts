// ============================================================
//  PHASE 1 — SESSION 2 : interface & type
//    npx tsx session2-interfaces.ts   -> exécute
//    npx tsc --noEmit                 -> vérifie les types
//
//  On passe du typage de variables isolées au typage des DONNÉES.
// ============================================================


// ------------------------------------------------------------
// 1. interface : décrire la forme d'un objet
// ------------------------------------------------------------
interface Moto {
  nom: string;
  prix: number;
  dispo: boolean;
}

const drz: Moto = { nom: "DR-Z400S", prix: 6800, dispo: true };
console.log("1a →", drz.nom);

// Dans VS Code : tape `drz.` et regarde l'autocomplétion. C'est le
// bénéfice immédiat d'avoir décrit la forme.
// drz. -> propose de compléter avec les attributs donnés : nom, prix, dispo (property Moto)

// TODO 1b : crée une deuxième moto `crf` conforme à Moto.
//   Puis essaie d'en créer une à qui il manque `prix`, et lis l'erreur.
const crf: Moto = { nom: "CRF", prix: 6500, dispo: true };
// const ninja: Moto = { nom: "N2", dispo:false }


// TODO 1c : essaie d'ajouter une propriété non prévue (ex: `couleur`)
//   dans un objet typé Moto. Observe : TS refuse ce qu'il ne connaît pas.
// const crf450: Moto = { nom: "N2", prix: 10500, dispo:false, couleur: "red" }


// ------------------------------------------------------------
// 2. Propriétés optionnelles ( ? ) et lecture seule (readonly)
//    ?        -> la propriété peut être absente
//    readonly -> elle ne peut plus être réaffectée après création
// ------------------------------------------------------------
interface Utilisateur {
  readonly id: number;
  nom: string;
  email?: string;        // facultatif
  telephone?: string;
}

const u: Utilisateur = { id: 1, nom: "Hugo" };   // pas d'email : valide
console.log("2a →", u.nom, u.email);             // undefined

// u.id = 2;   // erreur : readonly

// TODO 2b : ajoute un `telephone` optionnel à Utilisateur, crée un
//   utilisateur qui en a un, et un autre qui n'en a pas.
const user2: Utilisateur = {id: 2, nom: "user2", telephone: "0612345678"}
const user3: Utilisateur = {id: 3, nom: "user3"}

// TODO 2c : essaie d'afficher la longueur de u.email (u.email.length).
//   TS refuse : la propriété peut être absente. Corrige avec une
//   vérification préalable (if) — c'est le réflexe à acquérir.
console.log("2c1 → ", u.email?.length)
if(u.email){
  console.log("2c2 → ", u.email.length)
}

// ------------------------------------------------------------
// 3. type : alias, unions, objets aussi
//    Pour un objet, interface et type sont quasi équivalents.
//    Pour une union, seul `type` fonctionne.
// ------------------------------------------------------------
type Filtre = "toutes" | "actives" | "terminees";
type Identifiant = string | number;

let filtreActif: Filtre = "toutes";
const ref: Identifiant = 42;
console.log("3a →", filtreActif, ref);

// TODO 3b : crée un type `Statut` valant "brouillon" | "publie" | "archive",
//   et une variable qui l'utilise. Teste une valeur interdite.
type Statut = "brouillon" | "publie" | "archive";
let varNormal: Statut = "publie";
// let varInterdite: Statut = 42;


// ------------------------------------------------------------
// 4. Imbrication et tableaux d'objets
//    Une interface peut contenir une autre interface, ou des tableaux.
// ------------------------------------------------------------
interface Adresse {
  ville: string;
  codePostal: string;
}

interface Client {
  nom: string;
  adresse: Adresse;
  commandes: number[];
}

const client: Client = {
  nom: "Hugo",
  adresse: { ville: "Lyon", codePostal: "69000" },
  commandes: [1001, 1002],
};

console.log("4a →", client.adresse.ville, client.commandes.length);

// TODO 4b : déclare un tableau `catalogue` de type Moto[] avec 3 motos,
//   puis récupère les noms des motos disponibles (filter + map).
//   Observe l'autocomplétion à l'intérieur du filter : TS sait déjà
//   que chaque élément est une Moto.
const catalogue: Moto[] = [
  {nom: "HondaXR", prix: 22500, dispo: true},
  {nom: "NinjaH2R", prix: 27800, dispo: true},
  {nom: "250YZ", prix: 14000, dispo: false},
  {nom: "S1000RR", prix: 36400, dispo: true},
]

const nomDispo = catalogue.filter((c) => c.dispo === true).map((c) => c.nom)
console.log("4b →", nomDispo);


// ------------------------------------------------------------
// 5. extends : réutiliser une interface
//    Pratique pour éviter de répéter des propriétés communes.
// ------------------------------------------------------------
interface Vehicule {
  marque: string;
  annee: number;
}

interface MotoDetaillee extends Vehicule {
  cylindree: number;
}

const wr: MotoDetaillee = { marque: "Yamaha", annee: 2024, cylindree: 250 };
console.log("5a →", wr.marque, wr.cylindree);

// TODO 5b : crée une interface `Admin` qui étend Utilisateur en ajoutant
//   un champ `role: string`. Crée un admin conforme.
interface Admin extends Utilisateur {
  role: string;
}

const admin1: Admin = { id:4, nom: "Duperthuy", email: "duperthuy@gmail.com", role: "Dev" }


// ------------------------------------------------------------
// 6. Le type qui te servira à la session 5
// ------------------------------------------------------------
// TODO 6 : écris l'interface `Todo` de ton projet du Jour 9 :
//   un identifiant, un texte, et l'état "fait" ou non.
//   Puis déclare `let todos: Todo[] = [];` et ajoute-lui 2 éléments.
//   -> tu viens d'écrire la première ligne de ta todo-list en TypeScript.
interface TodoSession {
  readonly id: number,
  text: string,
  fait: boolean
}

let todos: TodoSession[] = [
  { id: 1, text: "tache1", fait: true},
  { id: 2, text: "tache2", fait: false}
];


// ============================================================
//  Validé quand : `npx tsc --noEmit` est propre, et que tu as vu
//  l'autocomplétion se déclencher sur tes objets typés.
//  git commit -m "phase1 session2 : interface & type"
// ============================================================
