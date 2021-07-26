const robot = require('./actions.js');
const validation = require('./validations');
const message = require('./messages');
const chalk = require('chalk');

const readInput = () => {
    let stdin = process.openStdin();
    let firstMove = true;
    let msg = null;
    let isValid = false;
    

    stdin.addListener('data', function(d) {
        let cmd = d
          .toString()
          .trim()
          .toUpperCase();
        
        // syntax and command sequence validation
        
        [isValid, msg] = validation.isValidCmd(cmd, firstMove);

        if (isValid) {
            // Check if the cmd is PLACE
            if (/PLACE\s\S{5}/.test(cmd)) {
                // validate placement coordinates

                let placeParams = cmd.split(' ')[1];
                let splitSubCommand = placeParams.split(',');
                let newX = parseInt(splitSubCommand[0]);
                let newY = parseInt(splitSubCommand[1]);
                let newDirection = splitSubCommand[2].substring(0,1); //first letter of direction


                [isValid, msg] = robot.place(newX, newY, newDirection);
                
                if (isValid) { // if valid, set new coordinate and direction
                    coordinate = [newX, newY];
                    direction = newDirection;
                }
            }
            // If not a PLACE command, then look for other commands.
            else {
                switch (cmd) {
                    case "MOVE":
                        [isValid, msg] = robot.move();
                        if (!isValid) console.log(chalk.redBright(msg));
                        break;
                    case ("LEFT"):
                        direction = robot.turnLeft();
                        break;
                    case ("RIGHT"):
                        direction = robot.turnRight();
                        break;
                    case "REPORT":
                        [coordinate, direction] = robot.report();
                        console.info(chalk.green(`${coordinate[0]},${coordinate[1]},${message.getDirectionName(direction)}`));
                } 
            }
        }
        else {
            console.log(chalk.redBright(msg));
        }
    
        if (isValid) firstMove = false;
        
      });  

};

const init = () => {
    message.initMsg()
    readInput();
};

init();