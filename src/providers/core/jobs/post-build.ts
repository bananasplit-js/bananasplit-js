/**
 * 
 *  Post Build
 *  @module src/providers/core/jobs/post-build
 * 
 *  @description prepare the dist extras for production
 *  @author diegoulloao
 * 
 */
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

// import from @root with require prevents editor messages by problems because jobs are excluded in tsconfig.json
const tsconfigJson = require( '@root/tsconfig.json' )
const bananasplitJson = require( '@root/bananasplit.json' )
const packageJson = require( '@root/dist/package.json' )


console.log( `${chalk.green('● Build:')} app compiled to dist!\n` )
console.log( chalk.yellow('○ Packing...') )


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


const includes: (string|string[])[] = bananasplitJson.dist.include || []
const excludes: string[] = bananasplitJson.dist.exclude || []
const options: Object = bananasplitJson.dist.options || {}


if ( includes.length ) {
    console.log( chalk.cyanBright(`Copying files...\n`) )

    includes.forEach( ( include: string | string[] ) => {
        const src: string = ( include instanceof Array ) ? include[0] : include
        const dest: string = ( include instanceof Array ) ? `dist/${include[1]}` : `dist/${include}`

        try {
            fs.copy( src, dest, {
                ...options,
                filter: ( src: string ): boolean => excludes.includes( src ) ? false : true
            })
            
        } catch ( error ) {
            Abort( error )
        }
    })

    console.log( `${chalk.green('● Post-build:')} files copied successfully!` )
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

$packageJson.scripts.dev && delete $packageJson.scripts.dev
$packageJson.scripts.build && delete $packageJson.scripts.build
$packageJson.scripts['build:stack'] && delete $packageJson.scripts['build:stack']
$packageJson.scripts.test && delete $packageJson.scripts.test
$packageJson.scripts['test:watch'] && delete $packageJson.scripts['test:watch']
$packageJson.scripts['test:coverage'] && delete $packageJson.scripts['test:coverage']
$packageJson.scripts['test:cache'] && delete $packageJson.scripts['test:cache']
$packageJson.scripts['upgrade:stack'] && delete $packageJson.scripts['upgrade:stack']
$packageJson.scripts.lint && delete $packageJson.scripts.lint
$packageJson.scripts['lint:fix'] && delete $packageJson.scripts['lint:fix']
$packageJson.scripts.prebuild && delete $packageJson.scripts.prebuild
$packageJson.scripts.postbuild && delete $packageJson.scripts.postbuild

// type any allows to use delete
$packageJson.devDependencies && delete $packageJson.devDependencies


// new asignments
$packageJson._moduleAliases = _moduleAliases
$packageJson.scripts.start = packageJson.scripts.start.replace( 'dist/', '' )
$packageJson.scripts['build:database'] = packageJson.scripts['build:database'].replace( ' && sequelize db:seed:all', '' )
$packageJson.main = packageJson.main.replace( /\.ts$/, '.js' )


try {
    // overwrites dist/package.json for production
    fs.writeFileSync( path.resolve('./dist/package.json'), JSON.stringify($packageJson, null, 4) )
    console.log( `${chalk.green('● Post-build:')} dist/package.json is ready for production 🚀` )
    
} catch ( error ) {
    console.error( error )
    process.exit(1)
}


console.log( `${chalk.bgGreen.black('\n Build done! ')} ✨\n` )
