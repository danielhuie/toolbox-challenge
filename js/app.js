//logic ideas
//
//have a button that when clicked, game is completely reset
//
//if one tile is already flipped over, you must flip over another one
//once two tiles have been flipped, simultaneously flip them back over to their default state
//
//keep track of tile name (its the number) and set a variable inside the loop to check if two tiles match each other, if they match, increment the respective counters
//
//keep track of whether or not tile can be flipped over. Two states: initial move when attempting to find a pair of tiles OR when two tiles have already been matched
//
//keep track of a counter that tallies the number of tiles matched. start with 8 (8 pairs) and decrement by 1 whenever 2 images are matched. if the counter == 0, stop the time and show the congratulations message
//
//misc. variables
//matches made
//matches missed
//matches remaining
//
//a turn is when two DIFFERENT tiles are clicked on
//
//if two tiles are a mismatch, flip them back over
//
//must use window.setTimeout() somewhere


// if you want to change hasFoundMatch in two tiles, you must reference the tiles array and change it directly there

$(document).ready(function() {
    var matchesMade = 0;
    var matchesMissed = 0;
    var matchesLeft = 8;
    var prev;
    var curr;
    var numClicks = 0;
    var turnBackOver = false;
    var prevImg;

    $('#elapsed-seconds').text("Seconds Elapsed: 0");
    $('#matches-made').text("Matches Made: 0");
    $('#matches-remaining').text("Matches Remaining: 8");
    $('#matches-attempted').text("Matches Attempted: 0");

    var tiles = [];
    var i;
    for (i = 1; i <= 32; i++) {
        tiles.push({
            tileNum: i,
            src: 'img/tile' + i + '.jpg',
            hasFoundMatch: false
        });
    }

    var shuffledTiles = _.shuffle(tiles);

    var selectedTiles = shuffledTiles.slice(0, 8);

    var tilePairs = [];
    _.forEach(selectedTiles, function(tile) {
        tilePairs.push(_.clone(tile));
        tilePairs.push(_.clone(tile));
    });

    //tilePairs = _.shuffle(tilePairs);

    //  selects element by id
    var gameBoard = $('#game-board');
    var row = $(document.createElement('div'));
    var img;

    // sets up the game board
    _.forEach(tilePairs, function(tile, elemIndex) {
        // for double equal expressions, place the static value before the test
        // triple equals does type comparison (strings, objects, etc)
        if (elemIndex > 0 && 0 == elemIndex % 4) {
            gameBoard.append(row);
            row = $(document.createElement('div'));
        }
        img = $(document.createElement('img'));
        img.attr({
            src: 'img/tile-back.png',
            alt: 'image of tile ' + tile.tileNum
        });
        img.data('tile', tile);
        row.append(img);
    });
    gameBoard.append(row);

    $('#btn2').click(function() {

    });


    // registers the click function upon clicking a tile
    $('#game-board img').click(function() {
        // 'this' refers to the single HTML DOM element that just got clicked on
        var img = $(this);
        var tile = img.data('tile');

        console.log("Can turn back over? " +turnBackOver);

        if (numClicks == 2) {
            numClicks = 0;
            turnBackOver = false;
        }

        if (numClicks == 0 && turnBackOver == false && prev == curr && tile.hasFoundMatch == false) {
            numClicks++;
            prev = tile;
            prevImg = img;
            img.attr('src', tile.src);
        }

        if (turnBackOver == false && numClicks == 1 && tile != prev && tile.hasFoundMatch == false) {
            numClicks++;
            curr = tile;
            img.attr('src', tile.src);

            if (prev.tileNum === curr.tileNum) {
                prev.hasFoundMatch = true;
                tile.hasFoundMatch = true;
                prev = null;
                curr = null;
                matchesMade++;
                matchesLeft--;
            } else {
                matchesMissed++;
                turnBackOver = true;
                setTimeout(function(){
                    img.attr('src', 'img/tile-back.png');
                    prevImg.attr('src', 'img/tile-back.png');
                    console.log("can i finally flip the two tiles back over? " + turnBackOver);
                    prev = null;
                    curr = null;
                }, 1000);
            }
        }

        $('#matches-made').text("Matches Made: " + matchesMade);
        $('#matches-remaining').text("Matches Remaining: " + matchesLeft);
        $('#matches-attempted').text("Matches Attempted: " + matchesMissed);
    }); //on click of gameboard images

    // timer to show elapsed time on page
    var startTime = _.now();
    var timer = window.setInterval(function() {
        var elapsedSeconds = 0 + Math.floor((_.now() - startTime) / 1000);
        $('#elapsed-seconds').text("Seconds Elapsed: " + elapsedSeconds);

        if (matchesLeft == 0) {
            window.clearInterval(timer);
            console.log("Congratulations!");
        }
    }, 1000);


});