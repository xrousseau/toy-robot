const robotModule = require('../src/robot');
const msg = require('../src/messages');

describe('PLACE ROBOT', () => {

    test('PLACE as a first command is valid', () => {
        const robot = new robotModule.Robot();
        expect(robot.place(0,0,'N')).toEqual([true, '']);
        expect(robot.report()).toEqual([true, '0,0,NORTH']);
    });


    test('PLACE (0,0,N), MOVE, REPORT', () => {
        const robot = new robotModule.Robot();
        expect(robot.place(0,0,'N')).toEqual([true, '']);
        expect(robot.move()).toEqual([true, '']);
        expect(robot.report()).toEqual([true, '0,1,NORTH']);
    });

    test('REPORT before PLACE is invalid', () => {
        const robot = new robotModule.Robot();
        expect(robot.report()).toEqual([false, msg.errorFirstCmd]);
        expect(robot.place(0,0,'N')).toEqual([true, '']);
    });

    test('PLACE(0,0,NORTH), TURN RIGHT, MOVE and block', () => {
        const robot = new robotModule.Robot();
        expect(robot.place(0,0,'N')).toEqual([true, '']);
        expect(robot.turnLeft()).toEqual([true, 'W']);
        expect(robot.move()).toEqual([false, 'Action denied: Robot would fall off the board.']);
    });

    test('PLACE first, REPORT then PLACE again and REPORT', () => {
        const robot = new robotModule.Robot();
        expect(robot.place(0,0,'N')).toEqual([true, '']);
        expect(robot.report()).toEqual([true, '0,0,NORTH']);
        expect(robot.place(4,4,'S')).toEqual([true, '']);
        expect(robot.report()).toEqual([true, '4,4,SOUTH']);
    });


});
