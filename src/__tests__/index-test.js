/*
	Test factories the whole way through
*/
jest.dontMock('../index');
jest.dontMock('../constants');
jest.dontMock('../db');
jest.dontMock('lodash')

var index = require('../index')
var constants = require('../constants')
var request = require('request')

describe('dbFactory()', () => {

	let DB_NAME = constants.DB.GENE
	let gene = index.dbFactory(DB_NAME)
	function dummyCallback() {}

	it('DB_NAME should be equal to gene', () => expect(DB_NAME).toBe('gene'))
    it('should create a factory', () =>  expect(gene.name).toBe(DB_NAME))
    it('should throw an error for a DB not in config', () => {
    	expect(function(){ index.dbFactory('XXX') }).toThrow()
    })
	describe('run einfo()', () => {
	    it('should run xml', () => {
	        gene.einfo(dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.INFO_URL,
				qs: { db: DB_NAME },
			}, dummyCallback);
	    })
	    it('should run with json flag', () => {
	        gene.einfo({retmode:'json'}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.INFO_URL,
				qs: { db: DB_NAME, retmode: 'json' },
				json: true
			}, dummyCallback);
	    })
	});
	describe('run epost()', () => {
	    it('should fail without options', () => {
	        expect(function(){ gene.epost(dummyCallback) }).toThrow()
	    })
	    it('should fail with null options', () => {
	        expect(function(){ gene.epost(null, dummyCallback) }).toThrow()
	    })
	    it('should fail without id or ids as options', () => {
	        expect(function(){ gene.epost({x:'x'}, dummyCallback) }).toThrow()
	    })
	    it('should run xml', () => {
	        gene.epost({id: 1234}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.POST_URL,
				qs: { db: DB_NAME, id: 1234 },
			}, dummyCallback);
	    })
	    it('should run xml', () => {
	        gene.epost({id: [1234,234]}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.POST_URL,
				qs: { db: DB_NAME, id: '1234,234' },
			}, dummyCallback);
	    })
	});
	describe('run elink()', () => {
	    it('should fail without options', () => {
	        expect(function(){ gene.elink(dummyCallback) }).toThrow()
	    })
	    it('should fail with null options', () => {
	        expect(function(){ gene.elink(null, dummyCallback) }).toThrow()
	    })
	    it('should fail without ids', () => {
	        expect(function(){ gene.elink({xxx: 'xxx'}, dummyCallback) }).toThrow()
	    })
	    it('should run xml', () => {
	        gene.elink({id: [1234,234], dbFrom: 'db_name'}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.LINK_URL,
				qs: { db: DB_NAME, id: '1234,234', dbFrom: 'db_name' },
			}, dummyCallback);
	    })
	});
	describe('run espell()', () => {
	    it('should fail without options', () => {
	        expect(function(){ gene.espell(dummyCallback) }).toThrow()
	    })
	    it('should fail with null options', () => {
	        expect(function(){ gene.espell(null, dummyCallback) }).toThrow()
	    })
	    it('should fail without term', () => {
	        expect(function(){ gene.espell({x:'x'}, dummyCallback) }).toThrow()
	    })
	    it('should run xml', () => {
	        gene.espell({term: 'abc'}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.SPELL_URL,
				qs: { db: DB_NAME, term: 'abc'},
			}, dummyCallback);
	    })
	});
	describe('run esearch()', () => {
	    it('should fail without options', () => {
	        expect(function(){ gene.esearch(dummyCallback) }).toThrow()
	    })
	    it('should fail with null options', () => {
	        expect(function(){ gene.esearch(null, dummyCallback) }).toThrow()
	    })
	    it('should fail without term', () => {
	        expect(function(){ gene.esearch({x:'x'}, dummyCallback) }).toThrow()
	    })
	    it('should run xml', () => {
	        gene.esearch({term: 'abc'}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.SEARCH_URL,
				qs: { db: DB_NAME, term: 'abc'},
			}, dummyCallback);
	    })
	    it('should run with json flag', () => {
	        gene.esearch({retmode:'json', term: 'abc'}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.SEARCH_URL,
				qs: { db: DB_NAME, term: 'abc', retmode: 'json'},
				json: true
			}, dummyCallback);
	    })
	});
	describe('run esummary()', () => {
	    it('should fail without options', () => {
	        expect(function(){ gene.esummary(dummyCallback) }).toThrow()
	    })
	    it('should fail with null options', () => {
	        expect(function(){ gene.esummary(null, dummyCallback) }).toThrow()
	    })
	    it('should fail without ids', () => {
	        expect(function(){ gene.esummary({x:'x'}, dummyCallback) }).toThrow()
	    })
	    it('should run xml', () => {
	        gene.esummary({ids: [123,234]}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.SUMMARY_URL,
				qs: { db: DB_NAME, id: '123,234'},
			}, dummyCallback);
	    })
	    it('should run with json flag', () => {
	        gene.esummary({retmode:'json', ids: [123,234]}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.SUMMARY_URL,
				qs: { db: DB_NAME, id: '123,234', retmode: 'json'},
				json: true
			}, dummyCallback);
	    })
	});
	describe('run efetch()', () => {
	    it('should fail without options', () => {
	        expect(function(){ gene.efetch(dummyCallback) }).toThrow()
	    })
	    it('should fail with null options', () => {
	        expect(function(){ gene.efetch(null, dummyCallback) }).toThrow()
	    })
	    it('should fail without ids', () => {
	        expect(function(){ gene.efetch({x:'x'}, dummyCallback) }).toThrow()
	    })
	    it('should run xml', () => {
	        gene.efetch({ids: [123,234]}, dummyCallback)
			expect(request.get).toBeCalledWith({
				url: constants.SUMMARY_URL,
				qs: { db: DB_NAME, id: '123,234'},
			}, dummyCallback);
	    })
	});
});

