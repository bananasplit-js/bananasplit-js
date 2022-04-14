/**
 *
 *  Bananasplit-js for Express
 *  @module .
 *
 *  @description all begins here
 *
 */

require('alias-hq').get('module-alias')

import { Stack } from '@bananasplit-js'
import { express } from '@services'

const services = Stack([express])

services.serve()
