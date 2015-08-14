(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function findIndexesOf(corpus, term) {
  var indexes = [];
  var lastIdx = 0;
  var done = false;
  while (!done) {
    var thisIdx = corpus.indexOf(term, lastIdx)
    if (thisIdx === -1) {
      done = true;
    } else {
      indexes.push(thisIdx);
      lastIdx = thisIdx + term.length;
    }
  }
  indexes.term = term;
  return indexes;
}

},{}],2:[function(require,module,exports){
module.exports = function init(cb) {

  var img = new Image()
  img.src = 'corpus.png'

  img.onload = function () {

    console.log('img.onload fires')

    corpus = '';
    bookMarkers = [];
    chapterMarkers = [];
    wordCountsPerBook = [];
    weightsPerBook = [];

    console.log('Image Width  : ' + img.width)
    console.log('Image Height : ' + img.height)

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    var myData = context.getImageData(0, 0, img.width, img.height);

    var imgData = myData.data;

    console.log('Data Length  : ' + imgData.length)

    var _t = new Date().getTime();

    var corpusArray = [];
    for (var i = 0; i < imgData.length; i += 4) {

      var chars = String.fromCharCode(imgData[i + 0]) + String.fromCharCode(imgData[i + 1]) + String.fromCharCode(imgData[i + 2])

      corpusArray.push(String.fromCharCode(imgData[i + 0]))
      corpusArray.push(String.fromCharCode(imgData[i + 1]))
      corpusArray.push(String.fromCharCode(imgData[i + 2]))

    }

    console.log('Done in :' + (new Date().getTime() - _t) * (1.0 / 1000.0) + ' seconds')

    console.log('Corpus array length : ' + corpusArray.length)

    corpus = corpusArray.join('')

    console.log('Corpus Length : ' + corpus.length)

    // var bookMarker = '_]book[_';
    // bookMarkers = findIndexesOf(bookMarker);
    // bookMarkers.push(corpus.length)
    //
    // var chapterMarker = '_][_';
    // chapterMarkers = findIndexesOf(chapterMarker);
    // chapterMarkers.push(corpus.length)
    //
    // console.log('Book Markers    : ' + bookMarkers.length)
    // console.log('Chapter Markers : ' + chapterMarkers.length)
    //
    // // word counts and weighted average calculations
    //
    // generateWordCountsPerBook();
    //
    // fillData(initialTerms)
    // document.getElementById('main_search').value = initialTerms

    cb(corpus)

  }




}

},{}],3:[function(require,module,exports){
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

},{"./find_indexes.js":1,"./init.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZmluZF9pbmRleGVzLmpzIiwic3JjL2luaXQuanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaW5kSW5kZXhlc09mKGNvcnB1cywgdGVybSkge1xuICB2YXIgaW5kZXhlcyA9IFtdO1xuICB2YXIgbGFzdElkeCA9IDA7XG4gIHZhciBkb25lID0gZmFsc2U7XG4gIHdoaWxlICghZG9uZSkge1xuICAgIHZhciB0aGlzSWR4ID0gY29ycHVzLmluZGV4T2YodGVybSwgbGFzdElkeClcbiAgICBpZiAodGhpc0lkeCA9PT0gLTEpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleGVzLnB1c2godGhpc0lkeCk7XG4gICAgICBsYXN0SWR4ID0gdGhpc0lkeCArIHRlcm0ubGVuZ3RoO1xuICAgIH1cbiAgfVxuICBpbmRleGVzLnRlcm0gPSB0ZXJtO1xuICByZXR1cm4gaW5kZXhlcztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5pdChjYikge1xuXG4gIHZhciBpbWcgPSBuZXcgSW1hZ2UoKVxuICBpbWcuc3JjID0gJ2NvcnB1cy5wbmcnXG5cbiAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnNvbGUubG9nKCdpbWcub25sb2FkIGZpcmVzJylcblxuICAgIGNvcnB1cyA9ICcnO1xuICAgIGJvb2tNYXJrZXJzID0gW107XG4gICAgY2hhcHRlck1hcmtlcnMgPSBbXTtcbiAgICB3b3JkQ291bnRzUGVyQm9vayA9IFtdO1xuICAgIHdlaWdodHNQZXJCb29rID0gW107XG5cbiAgICBjb25zb2xlLmxvZygnSW1hZ2UgV2lkdGggIDogJyArIGltZy53aWR0aClcbiAgICBjb25zb2xlLmxvZygnSW1hZ2UgSGVpZ2h0IDogJyArIGltZy5oZWlnaHQpXG5cbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICB2YXIgbXlEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgIHZhciBpbWdEYXRhID0gbXlEYXRhLmRhdGE7XG5cbiAgICBjb25zb2xlLmxvZygnRGF0YSBMZW5ndGggIDogJyArIGltZ0RhdGEubGVuZ3RoKVxuXG4gICAgdmFyIF90ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICB2YXIgY29ycHVzQXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ0RhdGEubGVuZ3RoOyBpICs9IDQpIHtcblxuICAgICAgdmFyIGNoYXJzID0gU3RyaW5nLmZyb21DaGFyQ29kZShpbWdEYXRhW2kgKyAwXSkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGltZ0RhdGFbaSArIDFdKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoaW1nRGF0YVtpICsgMl0pXG5cbiAgICAgIGNvcnB1c0FycmF5LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpbWdEYXRhW2kgKyAwXSkpXG4gICAgICBjb3JwdXNBcnJheS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaW1nRGF0YVtpICsgMV0pKVxuICAgICAgY29ycHVzQXJyYXkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGltZ0RhdGFbaSArIDJdKSlcblxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdEb25lIGluIDonICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gX3QpICogKDEuMCAvIDEwMDAuMCkgKyAnIHNlY29uZHMnKVxuXG4gICAgY29uc29sZS5sb2coJ0NvcnB1cyBhcnJheSBsZW5ndGggOiAnICsgY29ycHVzQXJyYXkubGVuZ3RoKVxuXG4gICAgY29ycHVzID0gY29ycHVzQXJyYXkuam9pbignJylcblxuICAgIGNvbnNvbGUubG9nKCdDb3JwdXMgTGVuZ3RoIDogJyArIGNvcnB1cy5sZW5ndGgpXG5cbiAgICAvLyB2YXIgYm9va01hcmtlciA9ICdfXWJvb2tbXyc7XG4gICAgLy8gYm9va01hcmtlcnMgPSBmaW5kSW5kZXhlc09mKGJvb2tNYXJrZXIpO1xuICAgIC8vIGJvb2tNYXJrZXJzLnB1c2goY29ycHVzLmxlbmd0aClcbiAgICAvL1xuICAgIC8vIHZhciBjaGFwdGVyTWFya2VyID0gJ19dW18nO1xuICAgIC8vIGNoYXB0ZXJNYXJrZXJzID0gZmluZEluZGV4ZXNPZihjaGFwdGVyTWFya2VyKTtcbiAgICAvLyBjaGFwdGVyTWFya2Vycy5wdXNoKGNvcnB1cy5sZW5ndGgpXG4gICAgLy9cbiAgICAvLyBjb25zb2xlLmxvZygnQm9vayBNYXJrZXJzICAgIDogJyArIGJvb2tNYXJrZXJzLmxlbmd0aClcbiAgICAvLyBjb25zb2xlLmxvZygnQ2hhcHRlciBNYXJrZXJzIDogJyArIGNoYXB0ZXJNYXJrZXJzLmxlbmd0aClcbiAgICAvL1xuICAgIC8vIC8vIHdvcmQgY291bnRzIGFuZCB3ZWlnaHRlZCBhdmVyYWdlIGNhbGN1bGF0aW9uc1xuICAgIC8vXG4gICAgLy8gZ2VuZXJhdGVXb3JkQ291bnRzUGVyQm9vaygpO1xuICAgIC8vXG4gICAgLy8gZmlsbERhdGEoaW5pdGlhbFRlcm1zKVxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluX3NlYXJjaCcpLnZhbHVlID0gaW5pdGlhbFRlcm1zXG5cbiAgICBjYihjb3JwdXMpXG5cbiAgfVxuXG5cblxuXG59XG4iLCJjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBtYWluLmpzJylcblxudmFyIGdldF9wb3NpdGlvbnMgPSByZXF1aXJlKCcuL2ZpbmRfaW5kZXhlcy5qcycpXG5cbnJlcXVpcmUoJy4vaW5pdC5qcycpKGZ1bmN0aW9uKGNvcnB1cyl7XG5cbiAgY29uc29sZS5sb2coJ2NhbGxiYWNrJylcbiAgY29uc29sZS5sb2coY29ycHVzLmxlbmd0aClcblxuICB2YXIgYm9va19wb3NpdGlvbnMgPSBnZXRfcG9zaXRpb25zKGNvcnB1cywgJ19dYm9va1tfJylcbiAgY29uc29sZS5sb2coYm9va19wb3NpdGlvbnMpXG5cbiAgdmFyIG0gPSBnZXRfcG9zaXRpb25zKGNvcnB1cywgJ2hhcnJ5JylcblxuICB3aW5kb3cuZyA9IGZ1bmN0aW9uKGspeyBjb25zb2xlLmxvZyhnZXRfcG9zaXRpb25zKGNvcnB1cywgaykpIH1cblxuICAvLyBjb25zb2xlLmxvZyhtKVxuXG59KVxuIl19
