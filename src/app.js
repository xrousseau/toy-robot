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
        
        // first check if command inputed is valid
        let isValid = validation.isValidCmd(cmd, counter);

        if (isValid) {
            // use a REGEX to check if the command is PLACE (with params)
            if (/PLACE\s\S{5}/.test(cmd)) {
                // validate placement coordinates
                [newX, newY, newDirection, isValid] = action.placeRobot(cmd.split(' ')[1]);
                
                if (isValid) { // if valid, set new coordinate and direction
                    coordinate = [newX, newY];
                    direction = newDirection;
                }
            }
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
                        // set new direction
                        direction = action.turnRobot(direction, cmd);
                        break;
                    case ("RIGHT"):
                        direction = action.turnRobot(direction, cmd);
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