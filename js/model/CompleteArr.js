export default class CompleteArr {
    myArr = [];

    addCompleteVal = function (value) {
        this.myArr.push(value);
    }

    findIndexComplVal = function (tempID) {
        let indexTemp = -1;
        this.myArr.map((complValue, complIndex) => { 
            if (complValue.id == tempID) {
                indexTemp = complIndex;
            }
         })
         return indexTemp;
    }     

    removeComplVal = function (tempID) {
        let indexTemp = this.findIndexComplVal(tempID);

        if (indexTemp > -1) {
            this.myArr.splice(indexTemp, 1);
        }
    }
}