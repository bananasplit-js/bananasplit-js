/**
 * 
 *  Upgrade Stack
 *  @script src/provideres/core/jobs/upgrade-stack
 * 
 *  @description cross-platform solution for upgrade the bananasplit stack
 *  @author diegoulloao
 * 
 */
import { spawnSync, SpawnSyncReturns } from 'child_process'


/**
 * 
 *  Abort the execution of the script
 * 
 *  @param { string } msg
 *  @returns { void }
 * 
 */
const Abort: Function = ( msg: string ): void => {
    console.error( msg )
    process.exit(0)
}


// System package manager used
const npmUserAgent: string = process.env.npm_config_user_agent!

// If no npm agent founded then exits
if ( !npmUserAgent )
    Abort( 'The npm package manager could not be identified. Please run the stack upgrade manually' )
;


// Map to the package manager name
const getPackageManager: Function = (): string => {
    switch ( true ) {
        case /^yarn/.test(npmUserAgent):
            return 'yarn'
        ;

        case /^npm/.test(npmUserAgent):
            return 'npm'
        ;

        default:
            return ''
        ;
    }
}


// npm|yarn executor
const packageManager: string = getPackageManager()

if ( !packageManager )
    Abort( 'The npm package manager could not be identified. Please run the stack upgrade manually' )
;


// Runs the ncu upgrade
const $process: SpawnSyncReturns <Buffer> = spawnSync(
    process.platform === 'win32' ? 'npx.cmd':'npx',
    [ 'ncu', '--doctor', '--packageManager', packageManager, '-u' ], 
    {
        cwd: process.cwd(),
        stdio: 'inherit'
    }
)

// If an error ocurrs it prints it and exits
if ( $process.status === 1 ) {
    console.error( $process.error || '' )
    process.exit(1)
}
