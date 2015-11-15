import _ from 'lodash'
import request from 'request'
import {
	INFO_URL,
	POST_URL,
	SEARCH_URL,
	SUMMARY_URL,
	FETCH_URL,
	LINK_URL,
	SPELL_URL
} from './constants'

export default class Db {

	constructor(name) {
		this.name = name
	}

	einfo(options, callback) {
		if (_.isFunction(options)) {
			callback = options
			options = null
		}

		let opts = getOpts(INFO_URL)
		_.assign(opts.qs, options)
		return this.request(opts, callback)
	}

	epost(options, callback) {
		validateIds(options)

		let opts = getOpts(POST_URL)
		mergeIds(opts, options)
		_.assign(opts.qs, options)
		return this.request(opts, callback)
	}

	elink(options, callback) {
		validateDbFrom(options)
		validateIds(options)

		let opts = getOpts(LINK_URL)
		mergeIds(opts, options)
		_.assign(opts.qs, options)
		return this.request(opts, callback)
	}

	espell(options, callback) {
		validateTerm(options)

		let opts = getOpts(SPELL_URL)
		_.assign(opts.qs, options)
		return this.request(opts, callback)
	}

	esearch(options, callback) {
		validateTerm(options)

		let opts = getOpts(SEARCH_URL)
		_.assign(opts.qs, options)
		return this.request(opts, callback)
	}

	esummary(options, callback) {
		validateIds(options)

		let opts = getOpts(SUMMARY_URL)
		mergeIds(opts, options)
		_.assign(opts.qs, options)
		return this.request(opts, callback)
	}

	efetch(options, callback) {
		validateIds(options)

		let opts = getOpts(FETCH_URL)
		mergeIds(opts, options)
		_.assign(opts.qs, options)
		return this.request(opts, callback)
	}

	request(opts, callback) {
		if (opts.qs.retmode === 'json') {
			opts.json = true
		}
		opts.qs.db = this.name
		return request.get(opts, callback)
	}
}

// Convenience functions
function validateOptionsExist(options) {
	if (!options || _.isFunction(options)) throw new Error('Must provide valid options')
}

function validateIds(options) {
	validateOptionsExist(options)
	if (!options.id && !options.ids) throw new Error('Must provide options.ids')
}

function validateDbFrom(options) {
	validateOptionsExist(options)
	if (!options.dbFrom) throw new Error('Must provide options.dbFrom')
}

function validateTerm(options) {
	validateOptionsExist(options)
	if (!options.term) throw new Error('Must Provide Term')
}

export function getOpts(url) {
	return { url: url, qs: {} }
}

export function mergeIds(opts, options) {
	// Should already be called above, but safe here
	validateIds(options)
	let ids = options.id || options.ids
	delete options.ids
	delete options.id
	if (_.isArray(ids)) {
		ids = ids.join(',')
	}
	opts.qs.id = ids
}
















