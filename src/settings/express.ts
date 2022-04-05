/**
 * 
 *  Settings: Express
 *  @module settings/express
 * 
 *  @description contains all express server settings
 * 
 */

import { Application } from "express"
import path from "path"


export default

	(app: Application) => {

		// Public folder
		app.set("public", path.join(__dirname, "../../public"))

	}

;

