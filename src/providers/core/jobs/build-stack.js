/**
 * 
 *  Build Stack
 *  @module src/providers/core/jobs/build-stack
 * 
 *  @description cross-platform solution for build the entire bananasplit stack
 *  @author diegoulloao
 * 
 */
const { spawnSync } = require( 'child_process' )
const path = require( 'path' )


const npmUserAgent = process.env.npm_config_user_agent

const Abort = () => {
    console.log( 'The npm package manager could not be identified. Please run the stack installation manually' )
    process.exit(0)
}

// if no npm agent founded then exits
if ( !npmUserAgent )
    Abort()
;


const getPackageManager = () => {
    const isWindows = ( process.platform === 'win32' )

    switch( true ) {
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
let packageManagerExec = getPackageManager()

if ( !packageManagerExec )
    Abort()
;


const RunNpmProcess = cmd => {
    // runs the npm process
    const $process = spawnSync( packageManagerExec, cmd, {
        cwd: path.resolve( process.cwd() ),
        stdio: 'inherit'
    })

    // if an error ocurrs it prints it and exits
    if ( $process.status === 1 ) {
        console.log( $process.error || '' )
        process.exit(1)
    }
}


// builds the stack step by step
RunNpmProcess([ 'install' ])
RunNpmProcess([ 'run', 'build:database' ])
RunNpmProcess([ 'test', 'setup' ])


process.exit(0)
