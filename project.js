const prompt = require("prompt-sync")();

const dep = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepAmount = parseFloat(depositAmount);
        if(isNaN(numberDepAmount) || numberDepAmount <= 0){
            console.log("Try again!!!!");
        }else{
            return numberDepAmount;
        }
    }

};

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
        
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines >3){
            console.log("Try again!!!!");
        }else{
            return numberOfLines;
        }
    }
};


const depositAmount = dep();
console.log(depositAmount);
const numberOfLines = getNumberOfLines();
console.log(numberOfLines);