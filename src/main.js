console.log('hello from main.js')

var get_positions = require('./find_indexes.js')

require('./init.js')(function(corpus){

  console.log('callback')
  console.log(corpus.length)

  var book_positions = get_positions(corpus, '_]book[_')
  console.log(book_positions)

  var m = get_positions(corpus, 'harry')

  window.g = function(k){ console.log(get_positions(corpus, k)) }

  // console.log(m)

})
