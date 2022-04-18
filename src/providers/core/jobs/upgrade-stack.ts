/**
 *
 *  Upgrade Stack
 *
 *  @script src/provideres/core/jobs/upgrade-stack
 *
 *  @description cross-platform solution for upgrade the bananasplit stack
 *  @author diegoulloao
 *
 */

import { spawnSync, SpawnSyncReturns } from 'child_process'

/**
 *
 *  Abort the execution of the script
 *
 *  @param { string } msg
 *  @returns { void }
 *
 */
const Abort = (msg: string): void => {
	console.error(msg)
	process.exit(1)
}

/**
 *
 *  Map to the used package manager executor (cross-platform)
 *
 *  @returns { string }
 *
 */
const getPackageManager = (): string => {
	// Check for windows
	const isWindows: boolean = process.platform === 'win32'

	switch (true) {
		case /^yarn/.test(npmUserAgent):
			return isWindows ? 'yarn.cmd' : 'yarn'

		case /^npm/.test(npmUserAgent):
			return isWindows ? 'npm.cmd' : 'npm'

		default:
			return ''
	}
}

// System package manager used
const npmUserAgent: string = process.env.npm_config_user_agent!

// If no npm agent founded then exits
if (!npmUserAgent) {
	Abort(
		'\nThe npm package manager could not be identified.\nPlease run the stack upgrade manually\n'
	)
}

// npm|yarn executor
const packageManager: string = getPackageManager()

if (!packageManager) {
	Abort(
		'\nThe npm package manager could not be identified.\nPlease run the stack upgrade manually\n'
	)
}

// Runs ncu upgrade
const $process: SpawnSyncReturns<Buffer> = spawnSync(
	process.platform === 'win32' ? 'npx.cmd' : 'npx',
	['ncu', '--doctor', '--packageManager', packageManager.replace('.cmd', ''), ...process.argv.slice(2)],
	{ cwd: process.cwd(), stdio: 'inherit' }
)

// If an error ocurrs then print and exit
if ($process.status !== 0) {
	console.error($process.error)
	process.exit(1)
}

process.exit(0)
