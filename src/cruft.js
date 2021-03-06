
function m() {

  // "globals"
  var corpus;
  var bookMarkers = [];
  var chapterMarkers = [];
  var wordCountsPerBook = [];
  var weightsPerBook = [];
  var renderData = [];
  var hue;

  var searchTerms;

  var initialTerms = 'harry,ron,hermione,dumbledore,avada kedavra,snape'

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return (false);
  }

  function copyToClipboard() {

    var queryParams = searchTerms.join(',')
    queryParams = queryParams.split(' ').join('%20')

    var text = 'http://' + document.location.hostname + window.location.pathname + '?terms=' + queryParams
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }

  var terms = getQueryVariable("terms")
  terms = terms.split('%20').join(' ')
  if (terms.length > 0) {
    initialTerms = terms
  }

  function searchKeyPress(e) {
    // look for window.event in case event isn't passed in
    if (typeof e == 'undefined' && window.event) {
      e = window.event
    }
    if (e.keyCode == 13) {
      //document.getElementById('btnSearch').click();
      var searchString = document.getElementById('main_search').value;
      fillData(searchString)
    }
  }

  function fillData(searchString) {
    searchString = searchString.toLowerCase()
    searchTerms = searchString.split(',')
    console.log(searchTerms)

    renderData = [];

    searchTerms.forEach(function (term) {
      // clean up input
      var trimterm = term.trim()
      if (trimterm.length > 0) {
        compareAgainstBooks(findIndexesOf(term));
      }
    })
    hue = Math.floor(Math.random() * 360)
    render()
  }

  function setCanvasSize() {
    var c = document.getElementById('main_canvas');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    render()
  }
  window.onresize = setCanvasSize;

  setCanvasSize();

  var img = new Image()
  img.src = 'corpus.png'

  img.onload = function () {

    corpus = '';
    bookMarkers = [];
    chapterMarkers = [];
    wordCountsPerBook = [];
    weightsPerBook = [];

    console.log("Image Width  : " + img.width)
    console.log("Image Height : " + img.height)

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    var myData = context.getImageData(0, 0, img.width, img.height);

    var imgData = myData.data;

    console.log("Data Length  : " + imgData.length)

    var _t = new Date().getTime();

    var corpusArray = [];
    for (var i = 0; i < imgData.length; i += 4) {

      var chars = String.fromCharCode(imgData[i + 0]) + String.fromCharCode(imgData[i + 1]) + String.fromCharCode(imgData[i + 2])

      corpusArray.push(String.fromCharCode(imgData[i + 0]))
      corpusArray.push(String.fromCharCode(imgData[i + 1]))
      corpusArray.push(String.fromCharCode(imgData[i + 2]))

    }

    console.log("Done in :" + (new Date().getTime() - _t) * (1.0 / 1000.0) + " seconds")

    console.log("Corpus array length : " + corpusArray.length)

    corpus = corpusArray.join("")

    console.log("Corpus Length : " + corpus.length)

    var bookMarker = "_]book[_";
    bookMarkers = findIndexesOf(bookMarker);
    bookMarkers.push(corpus.length)

    var chapterMarker = "_][_";
    chapterMarkers = findIndexesOf(chapterMarker);
    chapterMarkers.push(corpus.length)

    console.log("Book Markers    : " + bookMarkers.length)
    console.log("Chapter Markers : " + chapterMarkers.length)

    // word counts and weighted average calculations

    generateWordCountsPerBook();

    fillData(initialTerms)
    document.getElementById('main_search').value = initialTerms
  }

  function generateWordCountsPerBook() {
    var _t = new Date().getTime();

    console.log("Generating word counts...")

    for (var i = 0; i < bookMarkers.length - 1; i++) {
      var book = corpus.substring(bookMarkers[i], bookMarkers[i + 1])
      console.log("Book " + i + " length : " + book.length);
      wordCountsPerBook.push(book.split(" ").length);
    }

    console.log("Done in :" + (new Date().getTime() - _t) * (1.0 / 1000.0) + " seconds")

    console.log(wordCountsPerBook)
  }

  function compareAgainstBooks(indexes) {

    renderData.push(indexes)

    var hits = [];
    for (var i = 0; i < bookMarkers.length - 1; i++) {
      hits.push(0);
    }

    indexes.forEach(function (idx) {

      for (var i = 0; i < bookMarkers.length - 1; i++) {
        if (idx > bookMarkers[i] && idx < bookMarkers[i + 1]) {
          hits[i]++;
        }
      }

    })

    var percentHits = [];
    var frequencyPerBook = [];

    hits.forEach(function (hit, index) {
      percentHits.push(hit / indexes.length)
      frequencyPerBook.push(hit / wordCountsPerBook[index])
    })

  }

  function arrayToString(array, fixedLength) {
    var returnString = "";
    array.forEach(function (item, index) {

      returnString += item.toFixed(fixedLength)
      if (index != array.length - 1) {
        returnString += ", "
      }
    })
    return returnString
  }

  function findIndexesOf(term) {
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

  function render() {

    var canvas = document.getElementById('main_canvas')
    var ctx = canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.textAlign = 'left'
    ctx.font = "35px sans-serif"
    ctx.fillStyle = 'rgba(255,255,255,1.0)'
    ctx.fillText('Harry Potter Novel Search', 10, 36)

    ctx.font = "12px sans-serif"
    ctx.fillText('enter words or phrases (separated by a comma) in the search field and press enter to plot their usage across the novels', 15, 52)


    // draw bg frame
    var frameWidthMarginPercent = 0.1
    var frameHeightMargin = 100;

    var frameWidth = canvas.width * (1.0 - frameWidthMarginPercent)
    var frameHeight = 40;

    renderData.forEach(function (dataSet, index) {

      ctx.save()
      ctx.translate(frameWidthMarginPercent * 0.5 * canvas.width, frameHeightMargin + (frameHeight * index) + (frameHeightMargin * 0.2 * index))

      ctx.textAlign = 'left'
      ctx.font = '12px sans-serif'
      ctx.fillStyle = 'rgb(255,255,255)'
      ctx.fillText(dataSet.term, 10, 0)

      ctx.fillStyle = 'rgba(255,255,255,0.1)'
      ctx.fillRect(0, 0, frameWidth, frameHeight)

      bookMarkers.forEach(function (marker, bookMarkersIndex) {
        ctx.beginPath()
        var xPosition = map(marker, 0, corpus.length, 0, frameWidth)
        ctx.strokeStyle = 'white'
        ctx.moveTo(xPosition, 0)
        ctx.lineTo(xPosition, frameHeight + 6)
        ctx.stroke()
        ctx.closePath()

        if (bookMarkersIndex < bookMarkers.length - 1 && index === renderData.length - 1) {
          ctx.textAlign = 'center'
          ctx.font = '12px sans-serif'
          ctx.fillStyle = 'rgb(255,255,255)'
          var x1 = map(marker, 0, corpus.length, 0, frameWidth)
          var x2 = map(bookMarkers[bookMarkersIndex + 1], 0, corpus.length, 0, frameWidth)
          ctx.fillText("Book " + (bookMarkersIndex + 1), x1 + ((x2 - x1) * 0.5), frameHeight + 12)
        }

      })

      hue = hue - 60
      if (hue < 0) {
        hue = 360 + hue
      }
      dataSet.forEach(function (marker, index) {
        ctx.beginPath()
        var xPosition = map(marker, 0, corpus.length, 0, frameWidth)
        ctx.strokeStyle = hsl(hue, 50, 50)
        ctx.moveTo(xPosition, frameHeight * 0.1)
        ctx.lineTo(xPosition, frameHeight - (frameHeight * 0.1))
        ctx.stroke()
        ctx.closePath()
      })

      ctx.restore()

    })

  }

  function hsl(h, s, l) {
    return 'hsl(' + h + ',' + s + '%,' + l + '%)'
  }

  function map(value, srcBegin, srcEnd, destBegin, destEnd) {
    return value * ((destEnd - destBegin) / (srcEnd - srcBegin))
  }
}
