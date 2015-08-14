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
