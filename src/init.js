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
