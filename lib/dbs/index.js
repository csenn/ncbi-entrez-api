import gene from './gene'

var dbs = {}

var addDb = function(db) {
	dbs[db.name] = db
}

addDb(gene)

export default dbs



