export default class ToDoArr {
    myArr = [];

    addToDoVal = function (value) {
        this.myArr.push(value);
    }

    findIndex = function (tempID) {
        let temp = -1;
        this.myArr.map((toDoValue, toDoIndex) => { 
            if (toDoValue.id == tempID) {
                temp = toDoIndex;
            }
         })
         return temp;
    }

    removeToDoVal = function (tempID) {
        let tempIndex = this.findIndex(tempID);

        if (tempIndex > -1) {
            this.myArr.splice(tempIndex, 1);
        }
    }
}