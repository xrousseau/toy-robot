const validation = require('./validations');
const msg = require('./messages');

const X = 0;
const Y = 1;

let coordinate = [0, 0];
let direction = '';
let firstMove = true;
const directions = ['N', 'E', 'S', 'W'];

const move = () => {

    if (firstMove) return [false, msg.errorFirstCmd];

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

    if (firstMove) return [false, msg.errorFirstCmd];

    directionIndex = directions.indexOf(direction);
    directionIndex--;

    // out of array bound. go back to the end or begining of the array
    if (directionIndex < 0) directionIndex = 3;

    direction = directions[directionIndex];
    return [true, direction];
};

const turnRight = () => {

    if (firstMove) return [false, msg.errorFirstCmd];

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
    firstMove = false;
    return [true, ""];
};

const report = () => {
    if (firstMove) return [false, msg.errorFirstCmd];
    
    return [true, `${coordinate[X]},${coordinate[Y]},${msg.getDirectionName(direction)}`];
};

module.exports = { move, place, turnLeft, turnRight, report };