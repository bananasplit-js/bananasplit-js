/**
 * 
 *  Jest configuration file
 *  @config
 * 
 */

const { defaults } = require("jest-config")

module.exports = {
	...defaults,
	roots: ["<rootDir>/tests"],
	coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/src/providers"],
	preset: "ts-jest",
	moduleNameMapper: require("alias-hq").get("jest")
}
