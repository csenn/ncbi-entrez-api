/*
	This config allows us to provide convenience lookups for each database format
	See link for more details
	http://www.ncbi.nlm.nih.gov/books/NBK25499/table/chapter4.T._valid_values_of__retmode_and/?report=objectonly
*/

import _ from 'lodash'

const efetchOptions = [
	{
		dbs: ['gene'],
		types: [
			{ format: 'text ASN.1', rettype: null, retmode: 'asn.1' },
			{ format: 'XML', rettype: null, retmode: 'xml' },
			{ format: 'Gene table', rettype: 'gene_table', retmode: 'text' }
		]
	},
	{
		dbs: ['all'],
		types: [
			{ format: 'Document summary', rettype: 'docsum', retmode: 'xml' },
			{ format: 'List of UIDs in XML', rettype: 'uilist', retmode: 'xml' },
			{ format: 'List of UIDs in plain text', rettype: 'uilist', retmode: 'text' }
		]
	},
	{
		dbs: ['homologene'],
		types: [
			{ format: 'text ASN.1', rettype: null, retmode: 'asn.1' },
			{ format: 'XML', rettype: null, retmode: 'xml' },
			{ format: 'Alignment scores', rettype: 'alignmentscores', retmode: 'text' },
			{ format: 'FASTA', rettype: 'fasta', retmode: 'text' },
			{ format: 'HomoloGene', rettype: 'homologene', retmode: 'text' }
		]
	}
]

export function getFormatsForDb(dbName) {
	let formats = []
	efetchOptions.forEach(opt => {
		if (opt.dbs[0] === 'all' || _.includes(opt.dbs, dbName)) {
			formats = formats.concat(opt.types.map(type => type.format))
		}
	})
	return formats
}

export function getOptionsByDbAndFormat(dbName, format) {
	let obj
	efetchOptions.forEach(opt => {
		if (_.includes(opt.dbs, dbName)) {
			let dbType = _.find(opt.types, type => type.format === format)
			obj = {rettype: dbType.rettype, retmode: dbType.retmode}
		}
	})
	return obj
}