import _ from 'lodash'
import Db from './db'
import {DB as dbs} from './constants'

export const DB = dbs

export function dbFactory(dbName) {
	if (!_.includes(_.values(dbs), dbName)) {
		throw new Error(`You must provide a valid DB. Options are: ${_.values(dbs).join(', ')}`)
	}
	return new Db(dbName)
}

export default {
	DB: dbs,
	dbFactory: dbFactory
}