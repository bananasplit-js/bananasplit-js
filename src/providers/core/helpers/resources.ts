/**
 * 
 *  Helpers: Resources
 *  @module providers/core/helpers/resources
 * 
 *  @description contains resources handlers
 * 
 */
import Express from 'express'

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

// Interfaces
import { IModule } from '@providers/core/interfaces'


interface IM {
    readonly dir: string
    readonly criteria: RegExp
    readonly excludeList: string[]
    modulesList?: IModule[]
}
/**
 * 
 *  Get modules
 *  @description gets all modules path in a directory recursively
 * 
 *  @param { IM } params
 *  @returns { IModule[] }
 * 
 */
export const getModules: Function = ( params: IM ): IModule[] => {
    
    const { dir, criteria, excludeList } = params
    let { modulesList=[] } = params

    const modulesDir: string = path.resolve( dir )
    const modules: string[] = fs.readdirSync( modulesDir )

    const r: RegExp[] = ( process.platform === 'win32' ) ? [/\\\w+$/, /^\\/] : [/\/\w+$/, /^\//]

    modules.forEach( (_module: string) => {
        const modulePath: string = path.resolve( modulesDir, _module )

        if ( fs.statSync(modulePath).isDirectory() ) {
            // Recursive call
            modulesList = getModules({ dir:modulePath, criteria, excludeList, modulesList })
        
        } else if ( criteria.test(_module) && !excludeList.includes(_module) ) {
            modulesList.push({
                path: modulePath,
                filename: _module,
                type: modulesDir.match(r[0])![0].replace(r[1], '')
            })
        }
    })
    
    return modulesList

}


/**
 * 
 *  Get routers
 *  @description gets all router modules path from app routes directory
 * 
 *  @returns { IModule[] }
 * 
 */
export const getRouters: Function = (): IModule[] => {

    const dir: string = './src/app/routes'
    const criteria: RegExp = /^.+\.routes\.(ts|js)$/

    const excludeList: string[] = [
        'example.routes.ts',
        'example.routes.js'
    ]

    return getModules({ dir, criteria, excludeList })
    
}


/**
 * 
 *  Get middlewares
 *  @description gets all middleware modules path from middlewares directory
 * 
 *  @returns { IModule[] }
 * 
 */
export const getMiddlewares: Function = (): IModule[] => {

    const dir: string = './src/middlewares'
    const criteria: RegExp = /^.+\.(ts|js)$/

    const excludeList: string[] = [
        'example.ts',
        'example.js'
    ]

    return getModules({ dir, criteria, excludeList })
    
}


interface ILR {
    readonly service: Express.Application
    readonly modulePaths: IModule[]
    callback?( resource: any ): () => void
}
/**
 * 
 *  Load resources
 *  @description loads external resources and executes them
 * 
 *  @param { ILR } params
 *  @returns { void }
 * 
 */
export const loadResources: Function = ( params: ILR ): void => {

    const { service, modulePaths, callback } = params

    modulePaths.forEach( (_module: IModule) => {
        const { default: Module } = require( _module.path )
        let $resource: any | undefined

        if ( Module instanceof Function ) {
            $resource = Module( service )
            
            if ( callback instanceof Function )
                callback( $resource )
            ;
        
        } else
            console.warn( chalk.yellow(
                `WARNING: @${_module.type} → ${_module.filename.replace(/\.(ts|js)$/, '')} must export a function by default`
            ))
        ;
    })

}
