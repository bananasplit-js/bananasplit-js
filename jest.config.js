/**
 * 
 *  Jest configuration file
 *  @config
 * 
 */
const { defaults } = require( 'jest-config' )


module.exports = {
    ... defaults,
    roots: [ "<rootDir>/src/tests" ],
    coveragePathIgnorePatterns: [ "/node_modules/", "<rootDir>/src/providers" ],
    preset: 'ts-jest'
}
