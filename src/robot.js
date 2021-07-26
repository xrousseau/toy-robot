const validation = require('./validations');
const msg = require('./messages');

class Robot {

        #X = 0;
        #Y = 1;
        #coordinate = [0, 0];
        #direction = '';
        #firstMove = true;
        #directions = ['N', 'E', 'S', 'W'];
 
    move() {

        if (this.#firstMove) return [false, msg.errorFirstCmd];
    
        // compute potential coordinate
        let tempCoordinate = this.#coordinate.slice(0);
    
        switch (this.#direction) {
            case 'N':
                tempCoordinate[this.#Y]++;
                break;
            case 'S':
                tempCoordinate[this.#Y]--;
                break;
            case 'W':
                tempCoordinate[this.#X]--;
                break;
            case 'E':
                tempCoordinate[this.#X]++;
                break;
          }
    
        // validate potential coordinate
        if  (!validation.isValidCoordinate(tempCoordinate[this.#X], tempCoordinate[this.#Y])) {
            return [false, 'Action denied: Robot would fall off the board.'];
        };
    
        this.#coordinate[this.#X] = tempCoordinate[this.#X];
        this.#coordinate[this.#Y] = tempCoordinate[this.#Y];
        return [true, ""];
    
    };


    turnLeft() {

        if (this.#firstMove) return [false, msg.errorFirstCmd];
    
        let directionIndex = this.#directions.indexOf(this.#direction);
        directionIndex--;
    
        // out of array bound. go back to the end or begining of the array
        if (directionIndex < 0) directionIndex = 3;
    
        this.#direction = this.#directions[directionIndex];
        return [true, this.#direction];
    };
    
    turnRight() {
    
        if (this.#firstMove) return [false, msg.errorFirstCmd];
    
        let directionIndex = this.#directions.indexOf(this.#direction);
        directionIndex++;
    
        // out of array bound. go back to the end or begining of the array
        if (directionIndex > 3) directionIndex = 0;
    
        this.#direction = this.#directions[directionIndex];
        return [true, this.#direction];
    };
    
    place(newX, newY, newDirection) {
    
        if (!validation.isValidDirection(newDirection)) {
            return [false, 'Invalid direction.'];
        };
    
        if (!validation.isValidCoordinate(newX, newY)) {
            return [false, 'Invalid Coordinate: Robot would fall off the board.'];
        };
    
        this.#coordinate[this.#X] = newX;
        this.#coordinate[this.#Y] = newY;
        this.#direction = newDirection;
        this.#firstMove = false;
        return [true, ""];
    };
    
    report() {
        if (this.#firstMove) return [false, msg.errorFirstCmd];
        
        return [true, `${this.#coordinate[this.#X]},${this.#coordinate[this.#Y]},${msg.getDirectionName(this.#direction)}`];
    };

}

module.exports = { Robot };