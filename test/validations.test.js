const val = require('../src/validations');

describe('VALIDATE DIRECTIONS', () => {

    test('Valid directions', () => {
        expect(val.isValidDirection('N')).toBeTruthy();
        expect(val.isValidDirection('E')).toBeTruthy();
        expect(val.isValidDirection('S')).toBeTruthy();
        expect(val.isValidDirection('W')).toBeTruthy();
    });

    test('Invalid directions', () => {
        expect(val.isValidDirection('D')).toBeFalsy();
    });

});

describe('VALIDATE COORDINATES', () => {

    test('Out of bound negative coodinates', () => {
        expect(val.isValidCoordinate(-1, -1)).toBeFalsy();
    });

    test('Out of bound positive coordinates', () => {
        expect(val.isValidCoordinate(5, 5)).toBeFalsy();
    });

    test('In bound positive coordinates', () => {
        expect(val.isValidCoordinate(2, 1)).toBeTruthy();
        expect(val.isValidCoordinate(0, 4)).toBeTruthy();
        expect(val.isValidCoordinate(4, 0)).toBeTruthy();
        expect(val.isValidCoordinate(0, 0)).toBeTruthy();
    });
    
});

describe('VALIDATE COMMAND', () => {

    test('First command is "PLACE"', () => {
        expect(val.isValidCmd("PLACE 0,0,N", 0)).toEqual([true, '']);
    });

    test('Next command is a "PLACE"', () => {
        expect(val.isValidCmd("PLACE 4,4,W", 1)).toEqual([true, '']);
    });

    test('Next command is invalid', () => {
        expect(val.isValidCmd("DESTROY", 1)).toEqual([false, 'Invalid command: Available commands are: PLACE, MOVE, LEFT, RIGHT, REPORT']);
    });

    test('Next commands are valid', () => {
        expect(val.isValidCmd("MOVE", 1)).toEqual([true, '']);
        expect(val.isValidCmd("LEFT", 1)).toEqual([true, '']);
        expect(val.isValidCmd("RIGHT", 1)).toEqual([true, '']);
        expect(val.isValidCmd("REPORT", 1)).toEqual([true, '']);
    });

});
