/**
 * 
 *  Build Stack
 *  @module src/providers/core/jobs/build-stack
 * 
 *  @description install the dependencies, create, migrate, seed the dabatase and run the tests
 *  @author diegoulloao
 * 
 */
const { spawnSync } = require( 'child_process' )
const path = require( 'path' )


// npm|yarn execution path
const packageManagerExecPath =  process.env.npm_execpath

// if no path founded then exits
if ( !packageManagerExecPath ) {
    console.log( 'The npm package manager path could not be founded. Please run the stack installation manually' )
    process.exit(0)
}

const RunNpmProcess = cmd => {
    // runs the npm process
    const $process = spawnSync( packageManagerExecPath, cmd, {
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
