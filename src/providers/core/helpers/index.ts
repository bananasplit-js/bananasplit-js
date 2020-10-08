/**
 * 
 *  Providers: Helpers
 *  @module providers/core/helpers
 * 
 *  @description Contains helpers used in providers
 * 
 */
import path from 'path'
import fs from 'fs'

import chalk from 'chalk'
import boxen from 'boxen'


/**
 * 
 *  Services log
 *  @description print to console services status
 * 
 *  @param { string } output - content to print
 *  @returns { void }
 * 
 */
export const servicesLog = ( output: string ): void => {

    let message: string[] = [

        `${ chalk.yellow('Serving!') }\n\n`,
        `${ output }\n\n`,
        `${ chalk.green(`${process.env.NODE_ENV!.toUpperCase()} MODE`) }`

    ]

    
    console.log(

        boxen( message.join(''), {
            padding: 1,
            margin: 1,
            borderColor: 'yellow'
        })
        
    )

}


/**
 * 
 *  Get package manager
 *  @description gets the package manager name
 * 
 *  @returns { string }
 * 
 */
export const getPackageManager = (): string => (
    fs.existsSync( path.resolve(process.cwd(), 'yarn.lock') ) ? 'yarn' : 'npm'
)
