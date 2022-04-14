/**
 *
 *  Route List
 *  @script src/providers/core/jobs/route-list
 *
 *  @description lists all server routes
 *  @author diegoulloao
 *
 */

require('alias-hq').get('module-alias')

import routerDex from 'router-dex/inspector'

/*
 *	Note: Require prevents missing module error by LSP
 */

const { express } = require('@services')
const packageJson = require('@root/package.json')

// Types
import Express from 'express'

// Express server instance
const server: Express.Application = express.getApplication()

// Print routes table in command-line
routerDex(server, packageJson.name)
