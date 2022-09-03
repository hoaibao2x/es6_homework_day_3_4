import ToDo from "../model/ToDo.js";
import ToDoArr from "../model/ToDoArr.js";
import CompleteArr from "../model/CompleteArr.js";

//? ------------------------------- Global vars ------------------------------- //

let todoArr = new ToDoArr();
let completeArr = new CompleteArr();

//? ------------------------------- End global vars ------------------------------- //





//? ------------------------------- Global functions ------------------------------- //

let getELE = id => document.getElementById(id);


let autoReload = (arr) => {
    if (arr.length == 0) {
        window.location.reload();
    }
}

//? ------------------------------- End global functions ------------------------------- //





//? ------------------------------- Todo list functions ------------------------------- //

// Auto format id todo list value
let formatIDToDo = () => {
    for (let i = 0; i < todoArr.myArr.length; i++) {
        todoArr.myArr[i].id = i;
    }
    setToDoLocal();
}

// Show on UI
let showToDo = myArr => {
    let content = "";
    let toDoID = 0;
    myArr.map(value => {
        content += `
            <li class= "" id= "${toDoID++}">
                ${value.content}
                <div>
                    <button onclick= "removeToDo(${value.id})" class= "remove__btn">
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

// Create todo local storage
let setToDoLocal = () => localStorage.setItem("ToDoLocal", JSON.stringify(todoArr.myArr));

// Get todo local storage
let getToDoLocal = () => {
    if (localStorage.getItem("ToDoLocal") != undefined) {
        todoArr.myArr = JSON.parse(localStorage.getItem("ToDoLocal"));
    }
    showToDo(todoArr.myArr);
}
getToDoLocal();

// Add ToDo 
let addToDo = () => {
    let inputString = getELE("newTask").value;
    let toDoObj = new ToDo(inputString);

    todoArr.addToDoVal(toDoObj);
    formatIDToDo();

    showToDo(todoArr.myArr);
    getELE("newTask").value = "";
}
getELE("addItem").onclick = addToDo;
window.addToDo = addToDo;

// Remove ToDo
let removeToDo = id => {
    todoArr.removeToDoVal(id);
    formatIDToDo();
    showToDo(todoArr.myArr);

    autoReload(todoArr.myArr);
}
window.removeToDo = removeToDo;

// Checkdone todo
let checkDoneToDo = id => {

    let getToDoVal = document.querySelectorAll("#todo li");

    for (let i = 0; i < getToDoVal.length; i++) {
        if (id == getToDoVal[i].id) {

            completeArr.addCompleteVal(todoArr.myArr[id]);
            setComplLocal();
            showComplete(completeArr.myArr);


            todoArr.removeToDoVal(id);
            formatIDToDo();
            showToDo(todoArr.myArr);

            autoReload(todoArr.myArr);
        }
    }
}
window.checkDoneToDo = checkDoneToDo;

// Sort todo arr A -> Z
let shortAToZ = () => {
    let cloneToDoArr = [];
    for (let i = 0; i < todoArr.myArr.length; i++) {
        cloneToDoArr.push(todoArr.myArr[i].content);
    }
    cloneToDoArr.sort();

    for (let k = 0; k < todoArr.myArr.length; k++) {
        todoArr.myArr[k].content = cloneToDoArr[k];
        setToDoLocal();
    }
    showToDo(todoArr.myArr);
}
getELE("two").onclick = shortAToZ;
window.shortAToZ = shortAToZ;

// Sort todo arr Z -> A
let shortZBackA = () => {
    let cloneToDoArr = [];
    for (let i = 0; i < todoArr.myArr.length; i++) {
        cloneToDoArr.push(todoArr.myArr[i].content);
    }
    cloneToDoArr.sort();
    cloneToDoArr.reverse();

    for (let k = 0; k < todoArr.myArr.length; k++) {
        todoArr.myArr[k].content = cloneToDoArr[k];
        setToDoLocal();
    }
    showToDo(todoArr.myArr);
}
getELE("three").onclick = shortZBackA;
window.shortZBackA = shortZBackA;

// One click = all todo check done
let checkAllDone = () => {
    for (let i = 0; i < todoArr.myArr.length; i++) {
        completeArr.myArr.push(todoArr.myArr[i]);
    }
    setComplLocal();
    showComplete(completeArr.myArr);

    todoArr.myArr = [];
    setToDoLocal();
    showToDo(todoArr.myArr);

    autoReload(todoArr.myArr);
}
getELE("one").onclick = checkAllDone;
window.checkAllDone = checkAllDone;

//? ------------------------------- End todo list functions ------------------------------- //





//? ------------------------------- Completed list functions ------------------------------- //

// Create complete local storage
let setComplLocal = () => localStorage.setItem("ComplTaskLocal", JSON.stringify(completeArr.myArr));

// Get complete local storage
let getComplLocal = () => {
    if (localStorage.getItem("ComplTaskLocal") != undefined) {
        completeArr.myArr = JSON.parse(localStorage.getItem("ComplTaskLocal"));
    }
}
getComplLocal();

// Show Complete Todo on UI
let showComplete = complArr => {
    let content = "";
    complArr.map(value => {
        content += `
            <li>
                ${value.content}
                <div>
                    <button onclick= "removeCompl(${value.id})" class= "remove__btn">
                        <i class="far fa-trash-alt"></i>
                    </button> 
                    <button onclick= "" class= "check__btn">
                        <i class="far fa-check-circle"></i>
                    </button>
                </div>
            </li>
        `;
        getELE("completed").innerHTML = content;
    })
}
showComplete(completeArr.myArr);

// Remove complete value
let removeCompl = id => {
    completeArr.removeComplVal(id);
    setComplLocal();
    showComplete(completeArr.myArr);

    autoReload(completeArr.myArr);
}
window.removeCompl = removeCompl;

// Auto format id when complete list array have value
let formatIDCompl = () => {
    if (completeArr.myArr.length > 0) {
        for (let i = 0; i < completeArr.myArr.length; i++) {
            completeArr.myArr[i].id = i;
            setComplLocal();
        }
    }
}
formatIDCompl();

//? ------------------------------- End completed list functions ------------------------------- //