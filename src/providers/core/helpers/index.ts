/**
 * 
 *  Providers: Helpers
 *  @module providers/core/helpers
 * 
 *  @description Contains helpers used in providers
 * 
 */
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import boxen from 'boxen'

// Interfaces
import { IModule } from '@providers/core/interfaces'


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


export const getModulesPath =

    ( dir: string, criteria: RegExp, excludeList: string[]=[], modulesList: IModule[]=[] ): IModule[] => {

        const modulesDir: string = path.resolve( dir )
        const elements: string[] = fs.readdirSync( modulesDir )

        elements.forEach( element => {
            const elementPath: string = path.resolve( modulesDir, element )

            if ( fs.statSync(elementPath).isDirectory() ) {
                // recursive call
                modulesList = getModulesPath( elementPath, criteria, excludeList, modulesList )
            
            } else if ( !excludeList.includes(element) && criteria.test(element) ) {
                modulesList.push({
                    path: elementPath,
                    filename: element
                })
            }
        })
        
        return modulesList

    }

;


export const getRoutersPath = (): IModule[] => {

    const routersDir: string = './src/app/routes'
    const criteria: RegExp = /^.+\.routes\.(ts|js)$/

    const excludeList: string[] = [
        'example.routes.ts',
        'example.routes.js'
    ]
    
    return getModulesPath( routersDir, criteria, excludeList )
    
}
