/**
 *
 *  Jest configuration file
 *  @config
 *
 */

const { defaults } = require('jest-config')

module.exports = {
	...defaults,
	roots: ['<rootDir>/tests'],
	coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/providers'],
	modulePathIgnorePatterns: [
		'<rootDir>/tests/integration test/tmpl.test',
		'<rootDir>/tests/unit test/tmpl.test'
	],
	preset: 'ts-jest',
	moduleNameMapper: require('alias-hq').get('jest')
}
