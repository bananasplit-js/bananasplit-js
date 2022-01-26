/**
 * 
 *  Jest configuration file
 *  @config
 * 
 */
const hq = require( 'alias-hq' )
const { defaults } = require( 'jest-config' )


module.exports = {
	...defaults,
	roots: [ "<rootDir>/tests" ],
	coveragePathIgnorePatterns: [ "/node_modules/", "<rootDir>/src/providers" ],
	preset: 'ts-jest',
	moduleNameMapper: hq.get( 'jest' )
}
