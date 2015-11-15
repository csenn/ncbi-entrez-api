jest.dontMock('../constants');
jest.dontMock('lodash')
var constants = require('../constants')

describe('DB constants', () => {
    it ('should expose constants with uppercase maps', () => {
        expect(constants.DB.PROTEIN).toBe('protein')
    })
});

describe('url builder', () => {
    it ('should expose constants with uppercase maps', () => {
        expect(constants.INFO_URL).toBe(
        	'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/einfo.fcgi'
        )
    })
});