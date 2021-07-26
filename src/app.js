const robotModule = new require('./robot.js');
const validation = require('./validations');
const message = require('./messages');
const chalk = require('chalk');

const readInput = () => {
    let stdin = process.openStdin();
    let isValid = false;
    let msg = "";
    const robot = new robotModule.Robot();

    stdin.addListener('data', function(d) {
        let cmd = d
          .toString()
          .trim()
          .toUpperCase();
        
        [isValid, msg] = validation.isValidCmd(cmd);

        if (/PLACE\s\S{5}/.test(cmd)) {

            let placeParams = cmd.split(' ')[1];
            let splitSubCommand = placeParams.split(',');
            let newX = parseInt(splitSubCommand[0]);
            let newY = parseInt(splitSubCommand[1]);
            let newDirection = splitSubCommand[2].substring(0,1); //first letter of direction

            [isValid, msg] = robot.place(newX, newY, newDirection);
            
            if (isValid) { // if valid, set new coordinate and direction
                coordinate = [newX, newY];
                direction = newDirection;
                firstMove = false
            }
            else {
                console.log(chalk.redBright(msg));
            }
        }
        // If not a PLACE command, then look for other commands.
        else {
            switch (cmd) {
                case "MOVE":
                    [isValid, msg] = robot.move();
                    break;
                case ("LEFT"):
                    [isValid, msg] = robot.turnLeft();
                    break;
                case ("RIGHT"):
                    [isValid, msg] = robot.turnRight();
                    break;
                case "REPORT":
                    [isValid, msg] = robot.report();
                    if (isValid) console.info(chalk.green(msg));
                    break;
            }
            if (!isValid) console.log(chalk.redBright(msg));
        }
        
    });  

};

const init = () => {
    message.initMsg()
    readInput();
};

init();