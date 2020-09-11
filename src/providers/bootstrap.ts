/**
 * 
 *  Providers: Bootstrap
 *  @module providers/bootstrap
 * 
 *  @description Runs bananasplit services!
 * 
 */
import chalk from 'chalk'
import { servicesLog } from './helpers'


interface IStack {
    serve: Function
}


/**
 * 
 *  Stack
 *  @description Builds a stack to serve the services
 * 
 *  @param { any[] } services - an array of services
 *  @returns { IStack }
 * 
 */
const Stack = ( services: any[] ): IStack => ({

    async serve(): Promise<void> {

        let output: string[] = []

        for( const service of services ) {
            let host: string = `http://localhost:${service.port}`

            if( !service.middleware )
                await service.start()

            else
                host = service.path
            ;
            
            output.push( `${chalk.bold(`- ${service.name}:`)}  ${host}` )
        }

        
        // SERVICES STATUS
        servicesLog( output.join('\n') )
        
    }

})


export { Stack }
