import ToDo from "../model/ToDo.js";
import ToDoArr from "../model/ToDoArr.js";
import CompleteArr from "../model/CompleteArr.js";
// import "./CompleteTaskFnc.js";

let todoArr = new ToDoArr();
let completeArr = new CompleteArr();


export let getELE = id => document.getElementById(id);

//? Show on UI
let showToDo = (myArr) => {
    let content = "";
    let toDoID = 0;
    myArr.map((value) => {
        content += `
            <li id= "${toDoID++}">
                ${value.content}
                <div>
                    <button onclick= "removeToDo()" class= "remove__btn">
                        <i class="far fa-trash-alt"></i>
                    </button> 
                    <button onclick= "checkDoneToDo(${value.id})" class= "check__btn">
                        <i class="far fa-check-circle"></i>
                    </button>
                </div>
            </li>
        `;
        getELE("todo").innerHTML = content;
    })
}

//? Create todo local storage
let setToDoLocal = () => localStorage.setItem("ToDoLocal", JSON.stringify(todoArr.myArr));

let setComplLocal = () => localStorage.setItem("ComplTaskLocal", JSON.stringify(completeArr.myArr));

//? Get todo local storage
let getToDoLocal = () => {
    if (localStorage.getItem("ToDoLocal") != undefined) {
        todoArr.myArr = JSON.parse(localStorage.getItem("ToDoLocal"));
    }
    showToDo(todoArr.myArr);
}
getToDoLocal();

//? Add ToDo 
let addToDo = () => {
    //? Input
    let inputString = getELE("newTask").value;
    //? Process

    let toDoObj = new ToDo(inputString);
    todoArr.addToDoVal(toDoObj);

    for (let i = 0; i < todoArr.myArr.length; i++) {
        todoArr.myArr[i].id = i;
    }

    setToDoLocal();
    showToDo(todoArr.myArr);
    getELE("newTask").value = "";
}
getELE("addItem").onclick = addToDo;
window.addToDo = addToDo;


//? Checkdone todo
let checkDoneToDo = (id) => {

    let getToDoVal = document.querySelectorAll("#todo li");
    
    for (let i = 0; i < getToDoVal.length; i++) {
        if (id == getToDoVal[i].id) {
            let toDoStyle = (getToDoVal[i].id);
            getELE(toDoStyle).style.backgroundColor = "gray";
            getELE(toDoStyle).remove();
            completeArr.addCompleteVal(todoArr.myArr[id]);

            setComplLocal();
        }
    }

    if (todoArr.myArr.length === completeArr.myArr.length) {
        localStorage.removeItem("ToDoLocal");
    }

}

window.checkDoneToDo = checkDoneToDo;


