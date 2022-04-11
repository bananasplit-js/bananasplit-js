/**
 * 
 *  Pre-build
 *  @script src/providers/core/jobs/pre-build
 * 
 *  @description updates module aliases at package.json
 *  @author diegoulloao
 * 
 */

import "tsconfig-paths/register"

import path from "path"
import chalk from "chalk"
import { spawnSync, SpawnSyncReturns } from "child_process"

/*
 *	Note: Require prevents missing module warning by LSP
 */

// Helpers
const { getRouters } = require("@core/helpers/resources")

// Interfaces
const { IModule } = require("@core/interfaces")

// Preparing build log
console.log(`\n${chalk.yellow("○ Preparing to build...")}`)

// Copy default routes if no routes were added
const modulePaths: typeof IModule[] = getRouters()

if (!modulePaths.length) {
	// Copy default routes file
	const $process: SpawnSyncReturns<Buffer> = spawnSync(
		"cp",
		[
			path.resolve(process.cwd(), "src/providers/core/app/routes/default.routes.ts"),
			path.resolve(process.cwd(), "src/app/routes")
		],
		{ cwd: process.cwd(), stdio: "inherit" }
	)

	// No routes detected message
	if ($process.status === 0) {
		console.log(`\n${chalk.green("● Pre-build:")} ${chalk.cyan("no routes detected -> defaults were added")}`)

	} else {
		// Error message when adding defaults routes
		console.log(`\n${chalk.red("● Pre-build:")} no routes detected -> defaults could not be added`)
	}
}

// Next step message (build)
console.log("")
console.log(chalk.yellow("○ Building...\n"))
