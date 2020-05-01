const { defaults } = require( 'jest-config' )

module.exports = {
    ... defaults,
    roots: [ "<rootDir>/src/tests" ],
    preset: 'ts-jest',
}
