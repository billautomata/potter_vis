console.log('hello from main.js')

var get_positions = require('./find_indexes.js')

require('./init.js')(function(corpus){

  var clock = require('./clock.js')

  clock('harry', corpus)

  console.log('wtf')
  // console.log(m)

})
