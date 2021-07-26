const action = require('./actions.js');
const validation = require('./validations');
const message = require('./messages')

const readInput = () => {
    let stdin = process.openStdin();
    let coordinate = [0, 0];
    let direction = '';
    let counter = 0;
    

    stdin.addListener('data', function(d) {
        let cmd = d
          .toString()
          .trim()
          .toUpperCase();
        
        // syntax and command sequence validation
        let isValid = validation.isValidCmd(cmd, counter);

        if (isValid) {
            // Check if the cmd is PLACE
            if (/PLACE\s\S{5}/.test(cmd)) {
                // validate placement coordinates
                [newX, newY, newDirection, isValid] = action.placeRobot(cmd.split(' ')[1]);
                
                if (isValid) { // if valid, set new coordinate and direction
                    coordinate = [newX, newY];
                    direction = newDirection;
                }
            }
            // If not a PLACE command, then look for other commands.
            else {
                switch (cmd) {
                    case "MOVE":
                        [newX, newY, newDirection, isValid] = action.moveRobot(direction, coordinate);

                        if (isValid) { // when valid, set new computed coordinate
                            coordinate = [newX, newY];
                            direction = newDirection;
                        }
                        break;
                    case ("LEFT"):
                        direction = action.turnLeftRobot(direction);
                        break;
                    case ("RIGHT"):
                        direction = action.turnRightRobot(direction);
                        break;
                    case "REPORT":
                        console.info(`OUTPUT: ${coordinate[0]},${coordinate[1]},${message.getDirectionName(direction)}`);
                } 
            }
            
        }
    
        if (isValid) counter++;
        
      });  

};

const init = () => {
    message.initMsg()
    readInput();
};

init();