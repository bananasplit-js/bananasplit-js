/**
 * 
 *  Pre Build
 *  @script src/providers/core/jobs/pre-build
 * 
 *  @description updates module aliases at package.json
 *  @author diegoulloao
 * 
 */

import "tsconfig-paths/register"

import path from "path"
import chalk from "chalk"
import { spawnSync } from "child_process"

// Helpers
const { getRouters } = require("@core/helpers/resources")

// Interfaces
const { IModule } = require("@core/interfaces")

// Preparing build log
console.log(`\n${chalk.yellow("○ Preparing to build...")}`)

/**
 * 
 *  Abort the execution of the script
 * 
 *  @param { string } msg
 *  @returns { void }
 * 
 */

// Copy default routes if no routes were added
const modulePaths: typeof IModule[] = getRouters()

if ( !modulePaths.length ) {
	// Copy default routes file
	const $process = spawnSync(
		"cp",
		[
			path.resolve("./src/providers/core/app/routes/default.routes.ts"),
			path.resolve("./src/app/routes")
		],
		{ cwd: process.cwd(), stdio: "inherit" }
	)

	if ( $process.status === 0 ) {
		console.log(`\n${chalk.green("● Pre-build:")} ${chalk.cyan("no routes detected -> defaults were added")}`)

	} else {
		console.log(`\n${chalk.red("● Pre-build:")} no routes detected -> defaults could not be added`)
	}
}

console.log("")
console.log(chalk.yellow("○ Building...\n"))
