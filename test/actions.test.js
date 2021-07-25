const action = require('../src/actions');

describe('PLACE ROBOT', () => {

    test('Valid robot placement action', () => {
        expect(action.placeRobot('0,0,N')).toEqual([0, 0, "N", true]);
    });

    test('Invalid cordinate in robot placement action', () => {
        expect(action.placeRobot('-1,6,E')).toEqual([null, null, null, false]);
    });

    test('Invalid direction in robot placement action', () => {
        expect(action.placeRobot('0,0,F')).toEqual([null, null, null, false]);
    });

});

describe('MOVE ROBOT', () => {

    test('Valid robot movement action', () => {
        expect(action.moveRobot('N', [0,0])).toEqual([0, 1, 'N', true]);
    });

    test('Invalid robot movement action moving W', () => {
        expect(action.moveRobot('W', [0,0])).toEqual([0, 0, 'W', false]);
    });

    test('Invalid robot movement action moving E', () => {
        expect(action.moveRobot('E', [4,0])).toEqual([4, 0, 'E', false]);
    });

    test('Invalid robot movement action moving N', () => {
        expect(action.moveRobot('N', [0,4])).toEqual([0, 4, 'N', false]);
    });

    test('Invalid robot movement action moving S', () => {
        expect(action.moveRobot('S', [0,0])).toEqual([0, 0, 'S', false]);
    });

});

describe('TURN ROBOT', () => {

    test('Looking N -> turning LEFT', () => {
        expect(action.turnRobot('N', 'LEFT')).toBe('W');
    });

    test('Looking N -> turning RIGHT', () => {
        expect(action.turnRobot('N', 'RIGHT')).toBe('E');
    });

    test('Looking W -> turning LEFT', () => {
        expect(action.turnRobot('W', 'LEFT')).toBe('S');
    });

    test('Looking W -> turning RIGHT', () => {
        expect(action.turnRobot('W', 'RIGHT')).toBe('N');
    });

    test('Looking WEST -> turning RIGHT', () => {
        expect(action.turnRobot('WEST', 'RIGHT')).toBe('N');
    });

});