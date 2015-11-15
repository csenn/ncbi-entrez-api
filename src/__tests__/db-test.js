jest.dontMock('../db');
jest.dontMock('lodash')
var db = require('../db')

describe('mergeIds', () => {
    it ('should merge opts and options with an id', () => {
        let opts = { qs: {} }
        db.mergeIds(opts, {
            id: 1234
        })
        expect(opts.qs.id).toBe(1234)
    })
    it ('should merge opts and options with ids', () => {
        let opts = { qs: {} }
        db.mergeIds(opts, {
            ids: [1234, 234]
        })
        expect(opts.qs.id).toBe('1234,234')
    })
    it ('should remove ids from options object', () => {
        let opts = { qs: {} }
        let options = { ids: [1234, 234], id: '234' }
        db.mergeIds(opts, options)
        expect(options.id).toBe(undefined)
        expect(options.ids).toBe(undefined)
    })
});
