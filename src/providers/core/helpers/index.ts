/**
 * 
 *  Providers: Helpers
 *  @module providers/core/helpers
 * 
 *  @description Contains helpers used in providers
 * 
 */
import Express from 'express'
import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import boxen from 'boxen'

// Interfaces
import { IModules } from '@providers/core/interfaces'


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


interface IM {
    dir: string
    criteria: RegExp
    excludeList: string[]
    modulesList?: IModules[]
}
/**
 * 
 *  Get modules path
 *  @description get all modules path in a directory recursively
 * 
 *  @param { IM } params
 *  @returns { IModules[] }
 * 
 */
export const getModulesPath = ( params: IM ): IModules[] => {
    
    // Params
    const { dir, criteria, excludeList } = params
    let { modulesList=[] } = params

    const modulesDir: string = path.resolve( dir )
    const elements: string[] = fs.readdirSync( modulesDir )

    const r: RegExp[] = ( process.platform === 'win32' ) ?
        [/\\\w+$/, /^\\/] : [/\/\w+$/, /^\//]
    ;

    elements.forEach( element => {
        const elementPath: string = path.resolve( modulesDir, element )

        if ( fs.statSync(elementPath).isDirectory() ) {
            // recursive call
            modulesList = getModulesPath({ dir:elementPath, criteria, excludeList, modulesList })
        
        } else if ( !excludeList.includes(element) && criteria.test(element) ) {
            modulesList.push({
                path: elementPath,
                filename: element,
                type: modulesDir.match(r[0])![0].replace(r[1], '')
            })
        }
    })
    
    return modulesList

}


/**
 * 
 *  Get routers path
 *  @description get all router modules path from app routes directory
 * 
 *  @returns { IModules[] }
 * 
 */
export const getRoutersPath = (): IModules[] => {

    const routersDir: string = './src/app/routes'
    const criteria: RegExp = /^.+\.routes\.(ts|js)$/

    const excludeList: string[] = [
        'example.routes.ts',
        'example.routes.js'
    ]
    

    return getModulesPath({ dir:routersDir, criteria, excludeList })
    
}


/**
 * 
 *  Get middlewares path
 *  @description get all middleware modules path from middlewares directory
 * 
 *  @returns { IModules[] }
 * 
 */
export const getMiddlewaresPath = (): IModules[] => {

    const middlewaresDir: string = './src/middlewares'
    const criteria: RegExp = /^.+\.(ts|js)$/

    const excludeList: string[] = [
        'example.ts',
        'example.js'
    ]

    return getModulesPath({ dir:middlewaresDir, criteria, excludeList })
    
}


interface ILM {
    service: Express.Application
    modulesPaths: IModules[]
    callback?: Function
}
/**
 * 
 *  Load modules
 *  @description loads modules and executes them
 * 
 *  @param { ILM } params
 *  @returns { void }
 * 
 */
export const loadModules = ( params: ILM ): void => {

    const { service, modulesPaths, callback }: ILM = params

    for ( const _module of modulesPaths ) {
        const { default: Module } = require( _module.path )
        let resource: any | undefined

        if ( Module instanceof Function ) {
            resource = Module( service )
            
            if ( callback instanceof Function )
                callback( resource )
            ;
        
        } else
            console.warn( chalk.yellow(
                `WARNING: @${_module.type} → ${_module.filename.replace(/\.(ts|js)$/, '')} must export a function by default`
            ))
        ;
    }

}
