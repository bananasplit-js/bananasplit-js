/**
 * 
 *  Post Build
 *  @module src/providers/core/jobs/post-build
 * 
 *  @description prepare dist/package.json for production
 *  @author diegoulloao
 * 
 */
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

import packageJson from '@root/dist/package.json'
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
const cRex: RegExp[] = [ /\/\*$/, /\/\// ]


pathsPair.forEach( pathPair => {
    const index: string = pathPair[0].replace( cRex[0], '' )
    const distPath = pathPair[1][0].replace(cRex[0], '').replace(cRex[1], '/')

    _moduleAliases[ index ] = distPath
})


// type any allows to use delete
const $packageJson: any = packageJson

delete $packageJson.scripts.dev
delete $packageJson.scripts.build
delete $packageJson.scripts['build:stack']
delete $packageJson.scripts.test
delete $packageJson.scripts['test:watch']
delete $packageJson.scripts['test:coverage']
delete $packageJson.scripts['test:cache']
delete $packageJson.scripts['upgrade:stack']
delete $packageJson.scripts.lint
delete $packageJson.scripts['lint:fix']
delete $packageJson.scripts.prebuild
delete $packageJson.scripts.postbuild

// type any allows to use delete
delete $packageJson.devDependencies


// new asignments
$packageJson._moduleAliases = _moduleAliases
$packageJson.scripts.start = packageJson.scripts.start.replace( 'dist/', '' )
$packageJson.scripts['build:database'] = packageJson.scripts['build:database'].replace( ' && sequelize db:seed:all', '' )
$packageJson.main = packageJson.main.replace( /\.ts$/, '.js' )


try {
    // overwrites dist/package.json for production
    fs.writeFileSync( path.resolve('./dist/package.json'), JSON.stringify($packageJson, null, 4) )
    console.log( `${chalk.green('Post-build:')} dist/package.json is ready for production 🚀` )
    
} catch ( error ) {
    console.error( error )
    process.exit(1)
}


console.log( chalk.bgGreen('\n Build done! \n') )


process.exit(0)
