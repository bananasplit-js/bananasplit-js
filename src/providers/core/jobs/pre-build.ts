/**
 * 
 *  Pre Build
 *  @module src/providers/core/jobs/pre-build
 * 
 *  @description updates _moduleAliases at package.json before build the dist
 *  @author diegoulloao
 * 
 */
import 'tsconfig-paths/register'

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

// import from @root with require prevents editor messages by problems because jobs are excluded in tsconfig.json
const packageJson = require( '@root/package.json' )
const tsconfigJson = require( '@root/tsconfig.json' )


console.log( chalk.yellow('○ Preparing to build...') )


const Abort: Function = ( msg: string ): void => {
    console.error( `\n${msg}` )
    process.exit(0)
}


let pathsPair: [ string, string[] ][] = []

try {
    pathsPair = Object.entries( tsconfigJson.compilerOptions.paths )

} catch ( error ) {
    Abort( 'Key paths does not exists at tsconfig.json' )
}


if ( !pathsPair.length ) {
    Abort( 'There is no path defined into property paths at tsconfig.json' )
}


// any type allows index the object by string
var _moduleAliases: any = {}

const prefix: string = tsconfigJson.compilerOptions.outDir
const cRex: RegExp[] = [ /\/\*$/, /\/\// ]


pathsPair.forEach( pathPair => {
    // if not @root|root
    const index: string = pathPair[0].replace( cRex[0], '' )
    let distPath: string

    if ( !/@?root/.test(pathPair[0]) )
        distPath = `${prefix}/${pathPair[1][0].replace(cRex[0], '').replace(cRex[1], '/')}`

    else
        distPath = pathPair[1][0].replace(cRex[0], '').replace(cRex[1], '/')
    ;

    _moduleAliases[ index ] = distPath
})


// new asignments
packageJson._moduleAliases = _moduleAliases


try {
    // overwrites package.json
    fs.writeFileSync( path.resolve('./package.json'), JSON.stringify(packageJson, null, 4) )
    console.log( `${chalk.green('\n● Pre-build:')} module aliases were updated at package.json\n` )
    
} catch ( error ) {
    console.error( error )
    process.exit(1)
}


console.log( chalk.yellow('○ Building...') )
