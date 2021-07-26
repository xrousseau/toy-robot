const robot = require('../src/actions');

describe('PLACE ROBOT', () => {

    test('Valid robot placement action', () => {
        expect(robot.place(0,0,'N')).toEqual([true, null]);
    });

    test('Invalid cordinate in robot placement action', () => {
        expect(robot.place(-1,6,'E')).toEqual([false, "invalid coordinate"]);
    });

    test('Invalid direction in robot placement action', () => {
        expect(robot.place(0,0,'F')).toEqual([false, "invalid direction"]);
    });

});

describe('MOVE ROBOT', () => {

    test('Valid robot movement action', () => {
        robot.place(0,0,'N');
        expect(robot.move()).toEqual([true, null]);
    });

    test('Invalid robot movement action moving W', () => {
        robot.place(0,0,'W');
        expect(robot.move()).toEqual([false, ""]);
    });

    test('Invalid robot movement action moving E', () => {
        robot.place(4,0,'E');
        expect(robot.move()).toEqual([false, ""]);
    });

    test('Invalid robot movement action moving N', () => {
        robot.place(0,4,'N');
        expect(robot.move()).toEqual([false, ""]);
    });

    test('Invalid robot movement action moving S', () => {
        robot.place(0,0,'S');
        expect(robot.move()).toEqual([false, ""]);
    });

});


describe('TURN ROBOT', () => {

    test('Looking N -> turning LEFT', () => {
        robot.place(0,0,'N');
        expect(robot.turnLeft()).toEqual([true, 'W']);
    });

    test('Looking N -> turning RIGHT', () => {
        robot.place(0,0,'N');
        expect(robot.turnRight('N')).toEqual([true, 'E']);
    });

    test('Looking W -> turning LEFT', () => {
        robot.place(0,0,'W');
        expect(robot.turnLeft('W')).toEqual([true, 'S']);
    });

    test('Looking W -> turning RIGHT', () => {
        robot.place(0,0,'W');
        expect(robot.turnRight('W')).toEqual([true, 'N']);
    });

});