
# Introduction

The NCBI Entrez api is a powerful resource for scientists, researchers, and engineers. The api allows consistent access patterns to over 40 databases.


### Quick ES6 example
```
import {DB, dbFactory} from 'ncbi-entrez-api'

let gene = dbFactory(DB.GENE) //DB.GENE is the mapping for 'gene'
gene.einfo({ format: 'json' }, function(err, response, data) {
	console.log(data)
})
```

### Quick CommonJS example
```
var NcbiApi = require('ncbi-entrez-api')

var gene = NcbiApi.dbFactory(NcbiApi.DB.GENE)
gene.einfo({ format: 'json' }, function(err, response, data) {
	console.log(data)
})
```

### Streaming

We use request https://github.com/request/request, Request provides both callback and streaming style api calls.
```
import fs from 'fs'
import {DB, dbFactory} from 'ncbi-entrez-api'

let gene = dbFactory(DB.GENE)
gene.info({ format: 'json'}).pipe(fs.createWriteStream('myFile.json'))
```

## Full example
```
var NcbiApi = require('ncbi-entrez-api')

//Constants mapping to available databases
//console.log to see your options
console.log(NcbiApi.DB)


//Create an instance of a db fetcher
var gene = NcbiApi.dbFactory(NcbiApi.DB.GENE)


//Call any of the following endpoints
//options - Required for each endpoint
//callback - optional. Without a callback will receive a stream
gene.einfo(options, callback)
gene.epost(options, callback)
gene.elink(options, callback)
gene.espell(options, callback)
gene.esearch(options, callback)
gene.esummary(options, callback)
gene.efetch(options, callback)
```

### API Options

For a list of all api specific options, see
http://www.ncbi.nlm.nih.gov/books/NBK25499/

Returning json
einfo, esummary, and efetch are the only 3 endpoints that currently return json. The rest return xml by default
options = {retmode: 'json'}

### Examples
```
var protein = NcbiApi.dbFactory(NcbiApi.DB.PROTEIN)
var callback = function(err, response, data) {
	console.log(data)
}

protein.einfo({
	retmode: 'json'
}, callback)

protein.epost({
	ids: ['id_1', 'id_2']
}, callback)

protein.elink({
	dbFrom: 'homologene',
	ids: ['id_1', 'id_2']
}, callback)

protein.espell({
	term: 'organism[homo]'
}, callback)

protein.esearch({
	term: 'organism[homo]',
	retmode: 'json'
}, callback)

protein.esummary({
	ids: ['id_1', 'id_2'],
	retmode: 'json'
}, callback)

protein.efetch({
	ids: ['id_1', 'id_2'],
	rettype: 'fasta',
	retmode: 'text'
}, callback)
```

### efetch
efetch pulls down full records in various formats. Each database supports different data formats.
Use options.retmode and options.rettype to control the format. See link for all options
http://www.ncbi.nlm.nih.gov/books/NBK25499/table/chapter4.T._valid_values_of__retmode_and/?report=objectonly
