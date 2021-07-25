const validation = require('./validations');

const X = 0;
const Y = 1;

const moveRobot = (direction, coordinate) => {

    // compute potential coordinate
    let tempCoordinate = coordinate.slice(0);

    switch (direction) {
        case 'N':
            tempCoordinate[Y] = parseInt((parseInt(tempCoordinate[Y]) + 1).toString());
            break;
        case 'S':
            tempCoordinate[Y] = parseInt((parseInt(tempCoordinate[Y]) - 1).toString());
            break;
        case 'W':
            tempCoordinate[X] = parseInt((parseInt(tempCoordinate[X]) - 1).toString());
            break;
        case 'E':
            tempCoordinate[X] = parseInt((parseInt(tempCoordinate[X]) + 1).toString());
            break;
      }

    // validate potential coordinate
    if  (validation.isValidCoordinate(tempCoordinate[X], tempCoordinate[Y])) {
        return [tempCoordinate[X], tempCoordinate[Y], direction, true];
    };

    return [coordinate[X], coordinate[Y], direction, false];
};

const turnRobot = (direction, cmd) => {
    const directions = ['N', 'E', 'S', 'W'];
    directionIndex = directions.indexOf(direction);

    switch (cmd) {
        case "LEFT":
            directionIndex--;
            break;
        case "RIGHT":
            directionIndex++
            break;
    }

    // out of array bound. go back to the end or begining of the array
    if (directionIndex < 0) directionIndex = 3;
    if (directionIndex > 3) directionIndex = 0;

    return directions[directionIndex]
};

const placeRobot = placeParams => {
    let splitSubCommand = placeParams.split(',');
    let newX = splitSubCommand[0];
    let newY = splitSubCommand[1];
    let newDirection = splitSubCommand[2].substring(0,1);
    let testDirection = validation.isValidDirection(newDirection);
    let testCoordinate = validation.isValidCoordinate(newX, newY);

    if (testCoordinate && testDirection) {
        return [parseInt(newX), parseInt(newY), newDirection, true]
    } else {
        return [null, null, null, false]
    }
}

module.exports = { moveRobot, turnRobot, placeRobot };