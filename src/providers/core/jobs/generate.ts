/**
 * 
 *  Generate Data Resource
 *  @script src/providers/core/jobs/generate
 * 
 *  @description generates a data resource
 *  @author diegoulloao
 * 
 */
import path from "path"
import chalk from "chalk"
import clipboard from "clipboardy"

// Local Types
interface IGenerator extends Function {
	amount: Function
}


// Generator to use
const generatorName: string | undefined = process.argv[2]
	? process.argv[2].toLowerCase().trim()
	: undefined

// Check if generator name is specified
if ( !generatorName ) {
	console.log(chalk.bgRed.black(" Must to specify a generator. "), "\n")
	process.exit(1)
}

// Generator amount if specified
const amount: number | undefined = process.argv[3] ? parseInt(process.argv[3]) : undefined

// Check if value parsed is a valid number (not NaN)
if ( amount !== undefined && (isNaN(amount) || amount < 0) ) {
	console.log(chalk.bgRed.black(" Must to specify a valid amount. "), "\n")
	process.exit(1)
}

try {
	// Absolute path to where generator is
	const generatorPath: string = path.normalize(
		`${process.cwd()}/src/database/generators/create-${generatorName}.js`
	)
	
	// Generator function
	const Generator: IGenerator = require(generatorPath).default

	// Top label
	console.log("")
	console.log(
		chalk.bgYellow.black(` ${generatorName.charAt(0).toUpperCase() + generatorName.substring(1)} resource `)
	)

	// Resource generated
	let resource: any = (amount !== undefined) ? Generator.amount(amount) : Generator()

	// Copy resource to clipboard
	clipboard.writeSync(JSON.stringify(resource, null, 2))

	// Print the resource in command-line
	console.log("")
	console.log(resource)

	// Show copied to clipboard message
	console.log("")
	console.log(chalk.yellow("Copied to clipboard!"), "\n")

} catch (e: any) {
	console.log("")
	console.log(chalk.bgRed.black(` Error: Generator "${generatorName}" not found. ` ), "\n")
}
