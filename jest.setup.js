// override console.log behavior in jest to output message in a cleaner way.
global.console = {
    log: jest.fn(),
    debug: console.debug,
    trace: console.trace,
}