const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}
const SYMBOL_VALUE = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

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

const getBet = (balance , lines) => {
    while(true){
        const bet = prompt("Enter total bet per lines: ");
        const numberBets = parseFloat(bet);
        
        if(isNaN(numberBets) || numberBets <= 0 || numberBets > balance/lines){
            console.log("Try again!!!!");
        }else{
            return numberBets;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
            
        }
    }
    const reels = [];
    for (let j = 0; j < COLS; j++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let k = 0; k < ROWS; k++ ){
            const randIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randIndex];
            reels[j].push(selectedSymbol);
            reelSymbols.slice(randIndex, 1);
        }
        
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS ; i++){
        rows.push([]);
        for(let j = 0 ; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWin = (rows, bet, lines) => {
    let winnings = 0;
    for(let i = 0; i < lines; i++){
        const symbols = rows[i];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUE[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {
    let balance = dep();
    while(true){
        console.log(`You have a balance of ${balance}$`)
        const numberOfLines = getNumberOfLines();
        console.log(numberOfLines);
        const bet = getBet(balance,numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWin(rows,bet,numberOfLines);
        balance += winnings;
        console.log("You won, "+ winnings.toString() + "$")
        if(balance <= 0){
            console.log(`You ran out of money!`)
            break;
        }
        const playAgain = prompt(`Do you want to play again(Y/N)!?: `);
        if(playAgain != "y") break;
    }
};
game();
