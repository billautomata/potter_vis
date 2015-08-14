var d3 = require('d3')

var find_indexes = require('./find_indexes.js')

module.exports = function clock(term, corpus) {

  console.log('hello from clock.js')

  var book_positions = find_indexes(corpus, '_]book[_')
  book_positions.push(corpus.length)

  var book_scale = d3.scale.linear()
    .domain(book_positions)
    .range(d3.range(book_positions.length))

  var idx_to_book = function(v){
    return Math.floor(book_scale(v))
  }

  var tests = require('./tests.js').clock_scale_test
  tests(idx_to_book)

  var scales_books = []

  book_positions.forEach(function(p,idx,arr){
    var scale
    if(idx !== arr.length-1){
      scale = d3.scale.linear()
        .domain([p,arr[idx+1]]).range([0,360])
      scales_books.push(scale)
    }

  })

  var m = find_indexes(corpus, 'harry')






  window.g = function (k) {
    console.log(find_indexes(corpus, k))
  }

}
