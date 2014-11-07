$(document).ready(function() {
    var matchesMade = 0;
    var matchesMissed = 0;
    var matchesLeft = 8;
    var prev;
    var curr;
    var numClicks = 0;
    var turnBackOver = false;
    var prevImg;
    var gameBoard = $('#game-board');

    // timer to show elapsed time on page
    var startTime = _.now();
    var timer = window.setInterval(function() {
        var elapsedSeconds = 0 + Math.floor((_.now() - startTime) / 1000);
        $('#elapsed-seconds').text("Seconds Elapsed: " + elapsedSeconds);
        if (matchesLeft == 0) {
            window.clearInterval(timer);
            $("#congrats").css("display", "block");
        }
    }, 1000);

    displayStats();
    setUp();

    function setUp() {
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

        tilePairs = _.shuffle(tilePairs);
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
    }

    function click() {
        // registers the click function upon clicking a tile
        $('#game-board img').click(function() {
            // 'this' refers to the single HTML DOM element that just got clicked on
            var img = $(this);
            var tile = img.data('tile');

            clickAction(img, tile);
            displayUpdatedStats();
        }); //on click of gameboard images
    }

    // registers the click function upon clicking a tile
    $('#game-board img').click(function() {
        // 'this' refers to the single HTML DOM element that just got clicked on
        var img = $(this);
        var tile = img.data('tile');
        clickAction(img, tile);
        displayUpdatedStats();
    }); //on click of gameboard images

    // resets game
    $('#new-game').click(function() {
        matchesMade = 0;
        matchesMissed = 0;
        matchesLeft = 8;
        prev = null;
        curr = null;
        numClicks = 0;
        turnBackOver = false;
        prevImg = null;

        $("#congrats").css("display", "none");
        displayStats();

        startTime = _.now();
        timer = window.setInterval(function() {
            elapsedSeconds = 0 + Math.floor((_.now() - startTime) / 1000);
            $('#elapsed-seconds').text("Seconds Elapsed: " + elapsedSeconds);
            if (matchesLeft == 0) {
                window.clearInterval(timer);
            }
        }, 1000);

        gameBoard.empty();
        setUp();
        click();
    });

    function clickAction(img, tile) {
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
                    prev = null;
                    curr = null;
                }, 1000);
            }
        }
    }

    function displayStats() {
        $('#elapsed-seconds').text("Seconds Elapsed: 0");
        $('#matches-made').text("Matches Made: 0");
        $('#matches-remaining').text("Matches Remaining: 8");
        $('#matches-attempted').text("Matches Missed: 0");
    }

    function displayUpdatedStats() {
        $('#matches-made').text("Matches Made: " + matchesMade);
        $('#matches-remaining').text("Matches Remaining: " + matchesLeft);
        $('#matches-attempted').text("Matches Missed: " + matchesMissed);
    }
});