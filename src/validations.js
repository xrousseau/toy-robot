const chalk = require('chalk');

// High level sequence and syntax validation
const isValidCmd = (cmd, firstMove) => {
    let isValid = true;
    let msg = null;
  
    //ensure first cmd is PLACE
    if (firstMove === 0 && !isValidFirstPlaceCmd(cmd)) {
        msg = 'First command must be "PLACE <X>,<Y>,<DIRECTION>"';
        isValid = false;
    }
    else if (!isValidSubsequentCmd(cmd)) {
        msg = 'Invalid command: Available commands are: PLACE, MOVE, LEFT, REPORT';
        isValid = false;
    } 
    return [isValid, msg];
};

// test for direction to be a valid value
const isValidDirection = direction => {
    let testDirection = ['N', 'S', 'E', 'W'].includes(direction)
    if (!testDirection) {
        console.log(chalk.redBright(`Invalid direction: "${direction}". Possible directions are [(N)ORTH, (S)OUTH ,(E)AST ,(W)EST]`));
    }
    return testDirection;
}

// test for coordinates to be within board bondaries
const isValidCoordinate = (coordX, coordY) => {

    const testX = coordX >= 0 && coordX <= 4;
    const testY = coordY >= 0 && coordY <= 4;

    if (!testX || !testY) {
        console.log(chalk.redBright('Action denied: robot would fall off the board.'));
    }
    return (testX && testY);
}

const isValidFirstPlaceCmd = cmd => {
    return /PLACE\s\S{5}/.test(cmd);
};

const isValidSubsequentCmd = cmd => {
    return /PLACE\s\S{5}|MOVE|LEFT|RIGHT|REPORT/.test(cmd) === true;
};

module.exports = {  isValidCmd, isValidDirection, isValidCoordinate};