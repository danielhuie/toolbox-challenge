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



$(document).ready(function() {
    var matchesMade = 0;
    var tilesMissed = 0;
    var matchesMissed = 0;
    var matchesLeft = 0;
    var selectedTile1 = 0;
    var selectedTile2 = 0;

    var tiles = [];
    var i;
    for (i = 1; i <= 32; i++) {
        tiles.push({
            tileNum: i,
            src: 'img/tile' + i + '.jpg',
            isFlippable: true
        });
    }

    //console.log(tiles);

    var shuffledTiles = _.shuffle(tiles);
    //console.log(shuffledTiles);


    var selectedTiles = shuffledTiles.slice(0, 8);
    //console.log(selectedTiles);


    var tilePairs = [];
    _.forEach(selectedTiles, function(tile) {
        tilePairs.push(_.clone(tile));
        tilePairs.push(_.clone(tile));
    });


    tilePairs = _.shuffle(tilePairs);
    //console.log(tilePairs);


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


    // registers the click function upon clicking a tile
    $('#game-board img').click(function() {
        // 'this' refers to the single HTML DOM element that just got clicked on
        var img = $(this);
        var tile = img.data('tile');

        if (selectedTile1 == 0) {
            selectedTile1 = tile;
            console.log("selectedTile1: " + selectedTile1.tileNum);
        } else {
            selectedTile2 = tile;
            console.log("selectedTile2: " + selectedTile2.tileNum)
        }

        if (selectedTile1.tileNum == selectedTile2.tileNum){
            matchesMade++;
            console.log("you have a match");
            console.log("matchesMade: " + matchesMade);
        } else { // fix
            tilesMissed++;
            matchesMissed += tilesMissed % 2;
            console.log("matchesMissed: " + matchesMissed);
        }

        if (selectedTile1.tileNum > 0 && selectedTile2.tileNum > 0) {
            selectedTile1 = 0;
            selectedTile2 = 0;
        }


        img.fadeOut(100, function() {
            if (tile.flipped) {
                img.attr('src', 'img/tile-back.png');
            } else {
                img.attr('src', tile.src);
            }
            img.fadeIn(100);
            tile.flipped = !tile.flipped;
        }); //after fadeOut
    }); //on click of gameboard images


    // timer to show elapsed time on page
    var startTime = _.now();
    var timer = window.setInterval(function() {
        var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#elapsed-seconds').text(elapsedSeconds);

        if (elapsedSeconds >= 10) {
            window.clearInterval(timer);
        }
    }, 1000);
});