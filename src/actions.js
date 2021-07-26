const validation = require('./validations');

const X = 0;
const Y = 1;

let coordinate = [0, 0];
let direction = '';
let firstCmd = true;
const directions = ['N', 'E', 'S', 'W'];

const move = () => {

    // compute potential coordinate
    let tempCoordinate = coordinate.slice(0);

    switch (direction) {
        case 'N':
            tempCoordinate[Y]++;
            break;
        case 'S':
            tempCoordinate[Y]--;
            break;
        case 'W':
            tempCoordinate[X]--;
            break;
        case 'E':
            tempCoordinate[X]++;
            break;
      }

    // validate potential coordinate
    if  (!validation.isValidCoordinate(tempCoordinate[X], tempCoordinate[Y])) {
        return [false, 'Action denied: Robot would fall off the board.'];
    };

    coordinate[X] = tempCoordinate[X];
    coordinate[Y] = tempCoordinate[Y];
    return [true, ""];

};

const turnLeft = () => {
    directionIndex = directions.indexOf(direction);
    directionIndex--;

    // out of array bound. go back to the end or begining of the array
    if (directionIndex < 0) directionIndex = 3;

    direction = directions[directionIndex];
    return [true, direction];
};

const turnRight = () => {   
    directionIndex = directions.indexOf(direction);
    directionIndex++;

    // out of array bound. go back to the end or begining of the array
    if (directionIndex > 3) directionIndex = 0;

    direction = directions[directionIndex];
    return [true, direction];
};

const place = (newX, newY, newDirection) => {


    if (!validation.isValidDirection(newDirection)) {
        return [false, 'Invalid direction.'];
    };

    if (!validation.isValidCoordinate(newX, newY)) {
        return [false, 'Invalid Coordinate: Robot would fall off the board.'];
    };

    coordinate[X] = newX;
    coordinate[Y] = newY;
    direction = newDirection;
    return [true, ""];
};

const report = () => {
    return [coordinate, direction];
};

module.exports = { move, place, turnLeft, turnRight, report };