import fs from 'fs'
import path from 'path'

import packageJson from '@root/package.json'
import tsconfigJson from '@root/tsconfig.json'


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


try {
    packageJson._moduleAliases = _moduleAliases

    fs.writeFileSync( path.resolve('./package.json'), JSON.stringify(packageJson, null, 2) )
    console.log( '_moduleAliases updated at package.json' )
    
} catch ( error ) {
    console.error( error )
    process.exit(1)
}


process.exit(0)
