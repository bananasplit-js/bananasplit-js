/**
 * 
 *  Route List
 *  @script src/providers/core/jobs/route-list
 * 
 *  @description lists all server routes
 *  @author diegoulloao
 * 
 */
import routerDex from "router-dex/inspector"

const { express } = require("@services")
const packageJson = require("package.json")

// Types
import Express from "express"


// Express server instance
const server: Express.Application = express.getApplication()

// Print routes table in command-line
routerDex(server, packageJson.name)