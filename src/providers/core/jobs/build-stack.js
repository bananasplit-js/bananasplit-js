/**
 * 
 *  Build Stack
 *  @module src/providers/core/jobs/build-stack
 * 
 *  @description cross-platform solution for build the entire bananasplit stack
 *  @author diegoulloao
 * 
 */
'use strict';

const { spawnSync } = require( 'child_process' )
const fs = require( 'fs' )
const path = require( 'path' )


const Abort = msg => {
    console.error( msg )
    process.exit(0)
}


const findDialect = () => {
    const envPath = path.resolve( '.env' )

    // checks if .env exists
    fs.existsSync( envPath ) || Abort( '.env file missing' )

    // parse each line to an array
    const env = fs.readFileSync( envPath, 'utf8' )
    const envAsArray = env.split( /\n|\r|\r\n/ )

    let dialect ;

    // search for db_dialect and then break
    envAsArray.some( line => {
        if ( line.startsWith('DB_DIALECT') ) {
            dialect = line.split('=')[1]
            return true
        }
    })

    return dialect
}


const dialect = findDialect()

if ( !dialect )
    Abort( 'You must define a db_dialect in the .env file' )
;


const getDatabaseDriverPackages = dialect => {
    let packages ;
    
    switch ( dialect ) {
        case 'mysql':
            packages = 'mysql2'
            break
        ;
        
        case 'mariadb':
            packages = 'mariadb'
            break
        ;

        case 'postgres':
            packages = 'pg pg-hstore'
            break
        ;

        case 'mssql':
            packages = 'tedious'
            break
        ;

        case 'sqlite':
            packages = 'sqlite3'
            break
        ;

        default:
            packages = ''
        ;
    }

    return packages
}


// get database driver packages based on the dialect
const databaseDriverPackages = getDatabaseDriverPackages( dialect )

if ( !databaseDriverPackages )
    Abort( `${dialect} is not a valid db_dialect. Please choose one of: mysql|mariadb|postgres|mssql|sqlite` )
;


const npmUserAgent = process.env.npm_config_user_agent

// if no npm agent founded then exits
if ( !npmUserAgent )
    Abort( 'The npm package manager could not be identified. Please run the stack installation manually' )
;


const getPackageManager = () => {
    // check for windows
    const isWindows = ( process.platform === 'win32' )

    switch ( true ) {
        case /^yarn/.test(npmUserAgent):
            return isWindows ? 'yarn.cmd':'yarn'
        ;

        case /^npm/.test(npmUserAgent):
            return isWindows ? 'npm.cmd':'npm'
        ;

        default:
            return false
        ;
    }
}


// npm|yarn executor
const packageManagerExec = getPackageManager()

if ( !packageManagerExec )
    Abort( 'The npm package manager could not be identified. Please run the stack installation manually' )
;


const RunNpmProcess = cmd => {
    // runs the npm process
    const $process = spawnSync( packageManagerExec, cmd, {
        cwd: process.cwd(),
        stdio: 'inherit'
    })

    // if an error ocurrs it prints it and exits
    if ( $process.status === 1 ) {
        console.error( $process.error || '' )
        process.exit(1)
    }
}


// builds the stack step by step
RunNpmProcess([ 'install' ])
RunNpmProcess([ 'add', databaseDriverPackages ])
RunNpmProcess([ 'run', 'build:database' ])
RunNpmProcess([ 'test', 'setup' ])


process.exit(0)
