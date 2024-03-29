/**
 *
 *  Providers: Bootstrap (Stack)
 *
 *  @module providers/core/jobs/bootstrap
 *
 *  @description runs bananasplit services!
 *
 */
import chalk from 'chalk'
import { serviceLog } from '@core/helpers'

interface IStack {
	serve: Function
}

/**
 *
 *  Stack
 *
 *  @description receives a stack and run each service
 *
 *  @param { any[] } services - an array of services
 *  @returns { IStack }
 *
 */
export default (services: any[]): IStack => ({
	async serve(): Promise<void> {
		const output: string[] = []

		for (const service of services) {
			let host = `http://localhost:${service.port}`
			service.middleware ? (host = service.path) : await service.serve()

			output.push(`${chalk.bold.cyan(`- ${service.name} →`)} ${chalk.yellow(host)}`)
		}

		serviceLog(output.join('\n'))
	}
})
