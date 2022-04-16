/**
 *
 *  Generate Data Resource
 *
 *  @script src/providers/core/jobs/generate
 *
 *  @description generates a data resource
 *  @author diegoulloao
 *
 */

require('alias-hq').get('module-alias')

import path from 'path'
import chalk from 'chalk'
import clipboard from 'clipboardy'

// Local Types
interface IGenerator extends Function {
	amount: Function
	hasAdapter: boolean
}

/**
 *
 *  Abort the execution of the script
 *
 *  @param { string } msg
 *  @returns { void }
 *
 */
const Abort = (msg: string): void => {
	console.log(`\n${chalk.bgRed.black.bold(` Error `)}`)
	console.log(msg)
	process.exit(1)
}

// Generator to use
const generatorName: string | undefined = process.argv[2]
	? process.argv[2].toLowerCase().trim()
	: undefined

// Check if generator name is specified
if (!generatorName) {
	Abort(chalk.red('Must to specify a generator.\n'))
}

// Generator amount if specified
const amount: number | undefined = process.argv[3] ? parseInt(process.argv[3]) : undefined

// Check if value parsed is a valid number (not NaN)
if (amount !== undefined && (isNaN(amount) || amount < 0)) {
	Abort(chalk.red('Must to specify a valid amount.\n'))
}

// Extend string if passed
const extendString: string | undefined = process.argv[4]?.includes('--extend=')
	? process.argv[4].replace('--extend=', '')
	: undefined

// Extend object is empty by default
let extend: object = {}

if (extendString) {
	try {
		// Converts "extend" string to a real object
		extend = JSON.parse(extendString)

	} catch (e: any) {
		Abort([
			chalk.red('Check your extend object. Must contain a JSON format.'),
			'\nDo not forget to add double quotes to all the keys.\n'
		].join(""))
	}
}

try {
	// Absolute path to where generator is
	const generatorPath: string = path.normalize(
		`${process.cwd()}/src/database/generators/create-${generatorName!}.js`
	)

	// Generator function
	const Generator: IGenerator = require(generatorPath)

	// Check if generator is a function
	if (typeof Generator !== 'function') {
		Abort(chalk.red(`create-${generatorName!}.js does not export a function\n`))
	}

	// Top label
	console.log('')
	console.log(
		chalk.bgYellow.black.bold(
			` Generator: ${generatorName!.charAt(0).toUpperCase() + generatorName!.substring(1)} `
		)
	)

	// Resource generated
	const resource: any =
		amount !== undefined ? Generator.amount(amount, extend, true) : Generator(extend, true)

	// Copy resource to clipboard
	clipboard.writeSync(JSON.stringify(resource, null, 2))

	// Print the resource in command-line
	console.log('')
	console.log(resource)
	console.log('')

	// If has adapter message
	if (Generator.hasAdapter) {
		console.log(chalk.cyan(`Adapter`), chalk.bgGreen.black(' true '))
	}

	// If was extended message
	if (Object.keys(extend).length) {
		console.log(chalk.cyan(`Extend `), chalk.bgGreen.black(' true '))
	}

	// Resources amount messsage
	if (Generator.hasAdapter || Object.keys(extend).length) {
		console.log('')
	}

	console.log(chalk.cyan.bold(`Generated resources: ${amount || 1}`))

	// Show copied to clipboard message
	console.log('')
	console.log(chalk.yellow('Copied to clipboard!'), '📋', '\n')
} catch (e: any) {
	console.log(`\n${chalk.bgRed.black.bold(` Error `)}`)
	console.log(chalk.red(`Generator "${chalk.bold(generatorName!)}" not found.\n`))
}

process.exit(0)
