interface Todo {
  readonly id: number,
  text: string,
  fait: boolean
}

let todos: Todo[] = [
  { id: 1, text: "tache1", fait: true},
  { id: 2, text: "tache2", fait: false}
];