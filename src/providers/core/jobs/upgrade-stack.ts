/**
 * 
 *  Upgrade Stack
 *  @module src/provideres/core/jobs/upgrade-stack
 * 
 *  @description cross-platform solution for upgrade the bananasplit stack
 *  @author diegoulloao
 * 
 */
import { spawnSync, SpawnSyncReturns } from 'child_process'


const Abort = ( msg: string ): void => {
    console.error( msg )
    process.exit(0)
}


const npmUserAgent: string = process.env.npm_config_user_agent!

// if no npm agent founded then exits
if ( !npmUserAgent )
    Abort( 'The npm package manager could not be identified. Please run the stack upgrade manually' )
;


const getPackageManager = (): string => {
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


// runs the ncu upgrade
const $process: SpawnSyncReturns <Buffer> = spawnSync(
    ( process.platform === 'win32' ) ? 'npx.cmd':'npx',
    [ 'ncu', '--doctor', '--packageManager', packageManager, '-u' ], 
    {
        cwd: process.cwd(),
        stdio: 'inherit'
    }
)

// if an error ocurrs it prints it and exits
if ( $process.status === 1 ) {
    console.error( $process.error || '' )
    process.exit(1)
}
