import _ from 'lodash'
import search from './search'
import summary from './summary'
import {fetch, readStream} from './fetch'
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



// 	searchSummary(options) {
// 		return new Promise((resolve, reject) => {
// 			this.search.call(this, options).then(response => {
// 				var opts = {
// 					db: options.db,
// 					ids: response.data.esearchresult.idlist,
// 					retmode: 'json'
// 				}
// 				this.summary(opts).then(response => resolve(response))
// 			})
// 		})
// 	}
