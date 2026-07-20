// 1. Un tableau `todos` avec 3 objets `{ id, texte, fait }` (en dur).
// 2. Une fonction `render()` qui redessine une liste `<ul>` depuis ce tableau.
// 3. Une fonction qui supprime un todo par son `id`.
// 4. Une fonction qui retourne uniquement les todos non faits.
// 5. Une fonction `async` qui `fetch` une URL et retourne les données,
//    avec la vérification de la réponse et un `try/catch`.

// 1
let todos = [
    {id: 1, texte: "texte1", fait: true},
    {id: 2, texte: "texte2", fait: false},
    {id: 3, texte: "texte3", fait: true},
]

// 2 (+3 appel function)
const liste = document.querySelector("#liste");

function render(){
    liste.innerHTML = "";
    const ul = document.createElement("ul");

    todos.forEach((todo) => {
        const li = document.createElement("li");
        const checkboxTodo = document.createElement("input");
        checkboxTodo.type = "checkbox"
        checkboxTodo.checked = todo.fait;

        const textTodo = document.createElement("span");
        textTodo.textContent = todo.texte;

        const btnDeleteTodo = document.createElement("button");
        btnDeleteTodo.textContent = "x";

        li.append(checkboxTodo, textTodo, btnDeleteTodo);

        ul.append(li);

        // 3.a
        btnDeleteTodo.addEventListener("click", () => deleteTodo(todo.id));
    });

    liste.append(ul);
}

// 3.b
function deleteTodo(todoId){
    todos = todos.filter((todo) => todo.id !== todoId);
    render();
}

// 4
function noTodo(){
    const noTodos = todos.filter((todo) => todo.fait !== true);
    return noTodos;
}

// 5
const API_URL = "http://test"
const statut = document.querySelector("#statut");
async function fetchUrl(){
    try{
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error("HTTP " + response.status)

        const datas = await response.json();

        statut.textContent = "Datas récupérées !";
        return datas;
        
    }catch(err){
        statut.textContent = "Error : " + err.message;
    }
}

