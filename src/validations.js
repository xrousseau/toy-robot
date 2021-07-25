const chalk = require('chalk');

const isValidCmd = (cmd, counter) => {
    let isValid = true;
  
    //ensure 1st cmd is always "PLACE"
    if (counter === 0 && !isValidFirstPlaceCmd(cmd)) {
        console.log(chalk.redBright('First command must be "PLACE <X>,<Y>,<DIRECTION>"'));
        isValid = false;
    }
    else if (counter > 0 && !isValidSubsequentCmd(cmd)) {
        console.log(chalk.redBright('Invalid command: Available commands are: PLACE, MOVE, LEFT, REPORT'));
        isValid = false;
    } 
  
    return isValid;
};

const isValidDirection = direction => {
    let testDirection = ['N', 'S', 'E', 'W'].includes(direction)
    if (!testDirection) {
        console.log(chalk.redBright(`Invalid direction: "${direction}". Possible directions are [(N)ORTH, (S)OUTH ,(E)AST ,(W)EST]`));
    }
    return testDirection;
}

const isValidCoordinate = (coordX, coordY) => {
    // test if coordinates are within board bondaries
    const testX = parseInt(coordX) >= 0 && parseInt(coordX) < 5;
    const testY = parseInt(coordY) >= 0 && parseInt(coordY) < 5;

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