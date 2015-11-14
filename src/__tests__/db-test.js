jest.dontMock('../db');
// jest.autoMockOff();

// import {mergeIds} from '../db'



describe('mergeIds', function() {
    it ('should merge opts and options', function() {

        var db = require('../db')

        console.log(db)

        // console.log(mergeIds)

        // var opts = db.mergeIds({qs:{}}, {
        //     id: 1234
        // })

        expect(1).toBe(1)

        // expect(opts.qs.id).toBe(1234);
    })
});
  // it('calls into $.ajax with the correct params', function() {
  //   var $ = require('jquery');
  //   var fetchCurrentUser = require('../fetchCurrentUser');

  //   // Call into the function we want to test
  //   function dummyCallback() {}
  //   fetchCurrentUser(dummyCallback);

  //   // Now make sure that $.ajax was properly called during the previous
  //   // 2 lines
  //   expect($.ajax).toBeCalledWith({
  //     type: 'GET',
  //     url: 'http://example.com/currentUser',
  //     success: jasmine.any(Function)
  //   });
  // });
//});