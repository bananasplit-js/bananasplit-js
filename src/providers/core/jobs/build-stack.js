/**
 * 
 *  Build Stack
 *  @script src/providers/core/jobs/build-stack
 * 
 *  @description cross-platform solution for build the entire bananasplit stack
 *  @author diegoulloao
 * 
 */

const { spawnSync } = require("child_process")
const fs = require("fs")
const path = require("path")

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

/**
 * 
 *  Return the dialect used in DB_DIALECT
 * 
 *  @returns { string }
 * 
 */
const findDialect = () => {
	const envPath = path.resolve(process.cwd(), ".env")

	// Checks if .env exists
	fs.existsSync(envPath) || Abort(".env file missing")

	// Parse each line to an array
	const env = fs.readFileSync(envPath, "utf8")
	const envAsArray = env.split(/\n|\r|\r\n/)

	let dialect

	// Search for db_dialect then break
	envAsArray.some((line) => {
		if (line.startsWith("DB_DIALECT")) {
			dialect = line.split("=")[1].replace(/"/g, "")
			return true
		}
	})

	return dialect
}

/**
 * 
 *  Map to the database drivers package as string
 *
 *  @param { string } dialect
 *  @returns { string }
 * 
 */
const getDatabaseDriverPackages = (dialect) => {
	// Key-value pairs of driver packages
	const packages = {
		mysql: ["mysql2"],
		mariadb: ["mariadb"],
		postgres: ["pg", "pg-hstore"],
		mssql: ["tedious"],
		sqlite: ["sqlite3"]
	}

	return packages[dialect]
}

/**
 * 
 *  Map to the used package manager executor (cross-platform)
 *
 *  @returns { string }
 * 
 */
const getPackageManager = () => {
	// Check for windows
	const isWindows = (process.platform === "win32")

	switch (true) {
		case /^yarn/.test(npmUserAgent):
			return isWindows ? "yarn.cmd" : "yarn"

		case /^npm/.test(npmUserAgent):
			return isWindows ? "npm.cmd" : "npm"

		default:
			return false
	}
}

/**
 * 
 *  Runs any sync process
 * 
 *  @param { string } cmd
 *  @param { string[] } args
 *  @param { object } options
 *
 *  @returns { object | void }
 * 
 */
const RunProcess = (cmd, args, options={}) => {
	const $process = spawnSync(
		cmd,
		args,
		{ cwd: process.cwd(), stdio: "inherit", ...options }
	)

	// Only show error and exit if pass is false (default)
	if (!options.pass && $process.status === 1) {
		console.error($process.error)
		process.exit(1)
	}

	return $process
}

/**
 * 
 *  Runs a sync npm process
 * 
 *  @param { string[] } args
 *  @param { object } options
 *
 *  @returns { object | void }
 * 
 */
const RunNpmProcess = (...args) => RunProcess(packageManagerExec, ...args)

/**
 * 
 *  Checks if some database driver is missing
 * 
 *  @param { string[] } drivers
 *  @returns { boolean }
 * 
 */
const checkForMissingDrivers = (drivers) => {
	const driversStatuses = drivers.map((d) => {
		const { status } = RunProcess(
			(process.platform === "win32") ? "npm.cmd" : "npm",
			["ls", d, "--depth", "0"],
			{ stdio: "ignore", pass: true }
		)

		return status
	})

	return driversStatuses.includes(1)
}


// Script begins ----------------------------------------------------------------------

// Store the database dialect
const dialect = findDialect()

if (!dialect) {
	// No dialect error message by parts
	const noDialectMessage = [
		"\n\x1B[41m\x1B[30m\x1B[1m Error \x1B[22m\x1B[39m\x1B[49m",
		"\n\x1B[31mMust define a \x1B[37m\x1B[1mDB_DIALECT\x1B[22m\x1B[39m\x1B[31m value ",
		"in the \x1B[37m\x1B[1m.env\x1B[22m\x1B[39m\x1B[31m file.\x1B[39m\n"
	]

	// Print message and abort
	Abort(noDialectMessage.join(""))
}

// Gets database driver packages based on the dialect
const databaseDriverPackages = getDatabaseDriverPackages(dialect)

if (!databaseDriverPackages) {
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
if (!npmUserAgent) {
	const noNpmAgentMessage = [
		"\n\x1B[41m\x1B[30m\x1B[1m Error \x1B[22m\x1B[39m\x1B[49m\n",
		"\x1B[31mThe npm package manager could not be identified. Please run the stack installation manually.\x1B[39m\n"
	]

	Abort(noNpmAgentMessage.join(""))
}

// npm|yarn executor
const packageManagerExec = getPackageManager()

if (!packageManagerExec) {
	const noNpmAgentMessage = [
		"\n\x1B[41m\x1B[30m\x1B[1m Error \x1B[22m\x1B[39m\x1B[49m\n",
		"\x1B[31mThe npm package manager could not be identified. Please run the stack installation manually.\x1B[39m\n"
	]

	Abort(noNpmAgentMessage.join(""))
}

// Builds the stack
RunNpmProcess(["install"])
console.log("\n\033[1;33mPackages installed.\033[0m\n")

// Check if missing database drivers
const missingDrivers = checkForMissingDrivers(databaseDriverPackages)

// If one missing, then install them
if (missingDrivers) {
	// Install database drivers
	RunNpmProcess(["add", ...databaseDriverPackages])
	console.log("\n\033[1;33mDatabase drivers installed.\033[0m\n")
}

// Test database creation, runs migrations and seeders
RunNpmProcess(["run", "build:database"])
console.log("\033[1;33mDatabase ready.\033[0m\n")

// Setup test absolute path
const setupTestPath = path.resolve(
	process.cwd(),
	"tests/integration test/__setup.test.ts"
)

// If setup test file exists, then run it
if (fs.existsSync(setupTestPath)) {
	RunProcess("jest", ["test", "__setup", "--runInBand"])

} else {
	// Else run all local tests
	RunNpmProcess(["test"])
}

// Cleaning up process message
console.log("\n\033[0;32mCleaning up...\033[0m")

// Tester migration absolute path
const testerMigrationPath = path.resolve(
	process.cwd(),
	"src/database/migrations/20200216155557-create-tester-table.js"
)

// Determines if stack was cleaned
let stackCleaned = false

// If tester table migration exists, then undo migration
if (fs.existsSync(testerMigrationPath)) {
	RunProcess("sequelize", ["db:migrate:undo"])
	stackCleaned = true
}

// Delete all setup and tester files
RunProcess(
	"rm",
	[
		path.resolve(process.cwd(), setupTestPath),
		path.resolve(process.cwd(), testerMigrationPath),
		path.resolve(process.cwd(), "src/app/controllers/__tester.ts"),
		path.resolve(process.cwd(), "src/app/models/__tester.ts"),
		path.resolve(process.cwd(), "src/app/routes/__tester.routes.ts"),
		path.resolve(process.cwd(), "src/database/seeders/__tester-table-seeder.js")
	],
	{ stdio: "ignore", pass: true }
)

// Determines if project has a git repository
const hasGitRepository = fs.existsSync(path.resolve(process.cwd(), ".git"))

// If stack was cleaned and has git repository
if (stackCleaned && hasGitRepository) {
	// Then commit changes
	const cleanCommitProcess = RunProcess(
		(process.platform === "win32") ? "git.cmd" : "git",
		["commit", "-am", "Stack cleaned"]
	)

	// Commit success message
	if (cleanCommitProcess.status === 1) {
		// Committing rror message
		console.error(
			"\nCould not commit the changes after clean up.\n",
			"Please commitm manually."
		)
	}
}

// Success Output message
console.log("")
console.log("\x1B[43m\x1B[30m\x1B[1m Bananasplit-js is ready! \x1B[22m\x1B[39m\x1B[49m")
console.log("")

process.exit(0)
