import _ from 'lodash'
import request from 'request'
import {getFormatsForDb, getOptionsByDbAndFormat} from './dbs/config'
import {
	SEARCH_URL,
	SUMMARY_URL,
	FETCH_URL,
	LINK_URL
} from './urls'


export default class Db {

	constructor(name) {
		this.name = name
	}

	getFormats() {
		return getFormatsForDb(this.name)
	}

	search(options, callback) {
		return this.request(getSearchOptions(options), callback)
	}

	summary(options, callback) {
		return this.request(getSummaryOptions(options), callback)
	}

	fetch(options, callback) {
		return this.request(getFetchOptions(this.name, options), callback)
	}

	// db is current Db
	link(options, callback) {
		return this.request(getLinkOptions(options), callback)
	}

	request(opts, callback) {
		opts.qs.db = this.name
		return request(opts, callback)
	}
}

// Convenience functions
export function mergeIds(opts, options) {
	let ids = options.id || options.ids
	delete options.ids
	delete options.id
	if (_.isArray(ids)) {
		ids = ids.join(',')
	}
	opts.qs.id = ids
}

export function mergeSimpleFormat(opts, options) {
	if (options.format) {
		if (options.format === 'json') {
			opts.json = true
		}
		opts.qs['retmode'] = options.format
		delete options.format
	}
}

// Option builders
export function getSearchOptions(options) {
	if (!options || !options.term) {
		throw new Error('Must Provide DB and Term')
	}

	let opts = { url: SEARCH_URL, qs: {} }

	mergeSimpleFormat(opts, options)

	_.defaults(options, {
        retmax: 15,
        restart: 15,
        sort: 'relevance',
	})

	_.assign(opts.qs, options)

	return opts
}

export function getSummaryOptions(options) {
	if (!options || !options.ids) {
		throw new Error('Must Provide Ids')
	}

	let opts = { url: SUMMARY_URL, qs: {} }

	mergeIds(opts, options)
	mergeSimpleFormat(opts, options)

	_.assign(opts.qs, options)

	return opts
}

export function getFetchOptions(name, options) {
	if (!options || !options.ids) {
		throw new Error('Must Provide Ids')
	}

	let opts = { url: FETCH_URL, qs: {} }

	mergeIds(opts, options)

	// We provide a lookup for format types for FETCH
	if (options.format) {
		_.assign(opts.qs, getOptionsByDbAndFormat(name, options.format))
		delete options.format
	}

	_.assign(opts.qs, options)

	return opts
}

export function getLinkOptions(options) {
	if (!options || !options.dbfrom || !options.ids) {
		throw new Error('Must Provide Ids')
	}

	let opts = { url: LINK_URL, qs: {} }
	mergeIds(opts, options)
	_.assign(opts.qs, options)

	return opts
}















