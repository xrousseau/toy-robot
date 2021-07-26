const chalk = require('chalk');

const getDirectionName = shortCode => {
  switch (shortCode) {
      case 'N':
          return 'NORTH';
      case 'S':
          return 'SOUTH';
      case 'E':
          return 'EAST';
      case 'W':
          return 'WEST';
  }
};

const errorFirstCmd = 'First command must be "PLACE <X>,<Y>,<DIRECTION>"';

const initMsg = () => {
    console.log(chalk.white('\nToy Robot Programming Challenge\n'));
    console.log(chalk.white('Move robot on a 5X5 board.\n'));
    console.log(chalk.white('Supported commands:\n'));
    console.log(chalk.green('PLACE 2,3,WEST\nLEFT\nRIGHT\nMOVE\nREPORT\n'));
    console.log(chalk.white('Start typing your commands below:\n'));
  };

  module.exports = { initMsg, getDirectionName, errorFirstCmd };