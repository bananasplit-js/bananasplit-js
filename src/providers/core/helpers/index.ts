/**
 * 
 *  Helpers
 *  @module providers/core/helpers
 * 
 *  @description contains common helpers used in providers
 * 
 */
import chalk from "chalk"
import boxen from "boxen"


/**
 * 
 *  Service log
 *  @description print to console services status
 * 
 *  @param { string } output - content to print
 *  @returns { void }
 * 
 */
export const serviceLog = ( output: string ): void => {

	let message: string[] = [
		`${chalk.yellow.bold("Bananasplit-js")}\n\n`,
		`${output}\n\n`,
		`${chalk.green(`[${process.env.NODE_ENV!.toLowerCase()} mode]`)}`
	]

	console.log(
		boxen(message.join(""), {
			padding: 1,
			margin: 1,
			borderColor: "yellow"
		})
	)

}
