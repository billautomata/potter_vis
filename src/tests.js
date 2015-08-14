module.exports.clock_scale_test = clock_scale_test

function clock_scale_test(scale) {

  var cases = [{
      idx: 1,
      book: 0
    }, {
      idx: 420504,
      book: 0
    }, {
      idx: 420505,
      book: 1
    }, {
      idx: 891870,
      book: 1
    }, {
      idx: 891873,
      book: 2
    }, {
      idx: 1490346,
      book: 2
    }, {
      idx: 1490348,
      book: 3
    }, {
      idx: 2547383,
      book: 3
    }, {
      idx: 2547386,
      book: 4
    }, {
      idx: 3978049,
      book: 4
    }
  ]

  cases.forEach(function (cs) {

    if (Math.floor(scale(
        cs.idx)) ===
      cs.book) {
      console.log('pass')
    } else {
      console.error('fail')
    }

  })

}
