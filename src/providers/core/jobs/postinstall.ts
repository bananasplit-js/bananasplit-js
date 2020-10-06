/**
 * 
 *  Job: Post install hook
 *  @module providers/core/jobs/postinstall
 *  
 *  @description hook that installs the database engine package after dependencies are installed
 *  
 */
import dontenv from 'dotenv'
import shell from 'shelljs'

import { getPackageManager } from '../helpers'

console.log(process.env.npm_config_user_agent); console.log(process.env.npm_execpath)
dontenv.config()


if ( process.env.NODE_ENV === 'development' ) {

    const dialect: String = process.env.DB_DIALECT || ''

    if ( dialect ) {

        let packet: string
        
        switch ( dialect ) {
            case 'mysql':
                packet = 'mysql2'
                break
            ;
            
            case 'mariadb':
                packet = 'mariadb'
                break
            ;

            case 'postgres':
                packet = 'pg pg-hstore'
                break
            ;

            case 'mssql':
                packet = 'tedious'
                break
            ;

            case 'sqlite':
                packet = 'sqlite3'
                break
            ;

            default:
                packet = ''
            ;
        }


        if ( packet ) {

            const packages: string[] = packet.split(' ')
            const packageManager: String = getPackageManager()

            for ( let $packet of packages ) {
                try {
                    require( $packet )

                } catch (_) {
                    shell.exec( `${packageManager} add ${$packet}` )
                }
            }

        }
        
    }
}
