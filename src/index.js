import _ from 'lodash'
import Db from './db'

let dbsArray = ['gene', 'protein', 'homologene', 'nuccore']

export const dbs = _.reduce(dbsArray, (obj, db) => {
	obj[db] = db
	return obj
}, {})

export function dbFactory(dbName) {
	if (!_.includes(dbsArray, dbName)) {
		throw new Error('You must provide a valid DB')
	}
	return new Db(dbName)
}
