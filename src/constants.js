import _ from 'lodash'

function getFullUrl(name) {
	return `http://eutils.ncbi.nlm.nih.gov/entrez/eutils/${name}.fcgi`
}

export const INFO_URL = getFullUrl('einfo')
export const POST_URL = getFullUrl('epost')
export const SEARCH_URL = getFullUrl('esearch')
export const SUMMARY_URL = getFullUrl('esummary')
export const FETCH_URL = getFullUrl('efetch')
export const LINK_URL = getFullUrl('elink')
export const SPELL_URL = getFullUrl('espell')

/*
	Properties must match official endpoint names
    http://eutils.ncbi.nlm.nih.gov/entrez/eutils/einfo.fcgi?retmode=json
*/
let dbs = [
    'pubmed',
    'protein',
    'nuccore',
    'nucleotide',
    'nucgss',
    'nucest',
    'structure',
    'genome',
    'annotinfo',
    'assembly',
    'bioproject',
    'biosample',
    'blastdbinfo',
    'books',
    'cdd',
    'clinvar',
    'clone',
    'gap',
    'gapplus',
    'grasp',
    'dbvar',
    'epigenomics',
    'gene',
    'gds',
    'geoprofiles',
    'homologene',
    'medgen',
    'mesh',
    'ncbisearch',
    'nlmcatalog',
    'omim',
    'orgtrack',
    'pmc',
    'popset',
    'probe',
    'proteinclusters',
    'pcassay',
    'biosystems',
    'pccompound',
    'pcsubstance',
    'pubmedhealth',
    'seqannot',
    'snp',
    'sra',
    'taxonomy',
    'unigene',
    'gencoll',
    'gtr'
]

export const DB = _.reduce(dbs, (obj,db) => {
	let uppercase = db.toUpperCase()
	obj[uppercase] = db
    return obj
}, {})