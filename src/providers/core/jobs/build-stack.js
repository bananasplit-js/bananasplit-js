/**
 * 
 *  Build Stack
 *  @script src/providers/core/jobs/build-stack
 * 
 *  @description cross-platform solution for build the entire bananasplit stack
 *  @author diegoulloao
 * 
 */

const { spawnSync } = require( "child_process" )
const fs = require( "fs" )
const path = require( "path" )


/**
 * 
 *  Abort the execution of the script
 * 
 *  @param { string } msg
 *  @returns { void }
 * 
 */
const Abort = (msg) => {
	console.log(msg)
	process.exit(1)
}


// Return the dialect used in DB_DIALECT
const findDialect = () => {
	const envPath = path.resolve(".env")

	// Checks if .env exists
	fs.existsSync(envPath) || Abort(".env file missing")

	// Parse each line to an array
	const env = fs.readFileSync(envPath, "utf8")
	const envAsArray = env.split(/\n|\r|\r\n/)

	let dialect

	// Search for db_dialect then break
	envAsArray.some(line => {
		if ( line.startsWith("DB_DIALECT") ) {
			dialect = line.split("=")[1].replace(/"/g, "")
			return true
		}
	})

	return dialect
}


// Store the database dialect
const dialect = findDialect()

if ( !dialect ) {
	// No dialect error message by parts
	const noDialectMessage = [
		"\n\x1B[41m\x1B[30m\x1B[1m Error \x1B[22m\x1B[39m\x1B[49m",
		"\n\x1B[31mMust define a \x1B[37m\x1B[1mDB_DIALECT\x1B[22m\x1B[39m\x1B[31m value ",
		"in the \x1B[37m\x1B[1m.env\x1B[22m\x1B[39m\x1B[31m file.\x1B[39m\n"
	]

	// Print message and abort
	Abort(noDialectMessage.join(""))
}


// Map to the database drivers package as string
const getDatabaseDriverPackages = (dialect) => {
	// Key-value pairs of driver-packages
	const packages = {
		mysql: "mysql2",
		mariadb: "mariadb",
		postgres: "pg pg-hstore",
		mssql: "tedious",
		sqlite: "sqlite3"
	}

	return packages[dialect] || ""
}


// Gets database driver packages based on the dialect
const databaseDriverPackages = getDatabaseDriverPackages(dialect)

if ( !databaseDriverPackages ) {
	// Invalid dialect message by parts
	const invalidDialect = [
		"\n\x1B[41m\x1B[30m\x1B[1m Error \x1B[22m\x1B[39m\x1B[49m\n",
		`${'\x1B[31m\x1B[37m\x1B[1m'}"${dialect}"${'\x1B[22m\x1B[39m\x1B[31m'} is not a valid `,
		`${'\x1B[37m\x1B[1m'}DB_DIALECT${'\x1B[22m\x1B[39m\x1B[31m'} value.${'\x1B[39m'}`,
		`\n\nPlease choose one of:\n${'\033[1;33m'}mysql | mariadb | postgres | mssql | sqlite${'\033[0m'}\n`
	]

	// Print message and abort the execution
	Abort(invalidDialect.join(""))
}


// System package manager used
const npmUserAgent = process.env.npm_config_user_agent

// if no npm agent founded then exits
if ( !npmUserAgent ) {
	const noNpmAgentMessage = [
		"\n\x1B[41m\x1B[30m\x1B[1m Error \x1B[22m\x1B[39m\x1B[49m\n",
		"\x1B[31mThe npm package manager could not be identified. Please run the stack installation manually.\x1B[39m\n"
	]

	Abort(noNpmAgentMessage.join(""))
}


// Map to the used package manager executor (cross-platform)
const getPackageManager = () => {
	// Check for windows
	const isWindows = (process.platform === "win32")

	switch ( true ) {
		case /^yarn/.test(npmUserAgent):
			return isWindows ? "yarn.cmd" : "yarn"
		;

		case /^npm/.test(npmUserAgent):
			return isWindows ? "npm.cmd" : "npm"
		;

		default:
			return false
		;
	}
}


// npm|yarn executor
const packageManagerExec = getPackageManager()

if ( !packageManagerExec ) {
	const noNpmAgentMessage = [
		"\n\x1B[41m\x1B[30m\x1B[1m Error \x1B[22m\x1B[39m\x1B[49m\n",
		"\x1B[31mThe npm package manager could not be identified. Please run the stack installation manually.\x1B[39m\n"
	]

	Abort(noNpmAgentMessage.join(""))
}


// Runs sync npm process
const RunNpmProcess = (cmd) => {
	// Run the process
	const $process = spawnSync(
		packageManagerExec,
		cmd,
		{ cwd: process.cwd(), stdio: "inherit" }
	)

	// if an error ocurrs it prints it and exits
	if ( $process.status === 1 ) {
		console.error($process.error || "")
		process.exit(1)
	}
}

// Builds the stack
RunNpmProcess(["install"])
console.log("\n\033[1;33mPackages installed.\033[0m\n")

RunNpmProcess(["add", databaseDriverPackages])
console.log("\n\033[1;33mDatabase drivers installed.\033[0m\n")

RunNpmProcess(["run", "build:database"])
console.log("\n\033[1;33mDatabase created.\033[0m\n")

RunNpmProcess(["test", "setup"])

// Success Output message
console.log("")
console.log('\x1B[43m\x1B[30m\x1B[1m Bananasplit-js is ready! \x1B[22m\x1B[39m\x1B[49m')
console.log("")
