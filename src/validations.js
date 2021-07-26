// High level sequence and syntax validation
const isValidCmd = (cmd) => {
    
    if (/PLACE\s\S{5}|MOVE|LEFT|RIGHT|REPORT/.test(cmd) === false) {
        msg = 'Invalid command: Available commands are: PLACE, MOVE, LEFT, RIGHT, REPORT';
        return [false, msg];
    };

    return [true, ''];

};

// test for direction to be a valid value
const isValidDirection = direction => {

    let testDirection = ['N', 'S', 'E', 'W'].includes(direction)
    return testDirection

}

// test for coordinates to be within board bondaries
const isValidCoordinate = (coordX, coordY) => {

    const testX = coordX >= 0 && coordX <= 4;
    const testY = coordY >= 0 && coordY <= 4;

    return (testX && testY);
    
}

module.exports = { isValidCmd, isValidDirection, isValidCoordinate};