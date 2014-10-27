$(document).ready(function() {
    var tiles = [];
    var i;
    for (i = 1; i <= 32; i++) {
        tiles.push({
            tileNum: i,
            src: 'img/tile' + i + '.jpg'
        });
    }

    console.log(tiles);

    var shuffledTiles = _.shuffle(tiles);
    console.log(shuffledTiles);

    var selectedTiles = shuffledTiles.slice(0, 8);
    console.log(selectedTiles);

    var tilePairs = [];
    _.forEach(selectedTiles, function(tile) {
        tilePairs.push(_.clone(tile));
        tilePairs.push(_.clone(tile));
    });

    tilePairs = _.shuffle(tilePairs);

    console.log(tilePairs);

    //  selects element by id
    var gameBoard = $('#game-board');
    var row = $(document.createElement('div'));
    var img;

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

    $('#game-board img').click(function() {
        // 'this' refers to the single HTML DOM element that just got clicked on
        var img = $(this);
        var tile = img.data('tile');
        img.fadeOut(100, function() {
            if (tile.flipped) {
                img.attr('src', 'img/tile-back.png');
            } else {
                img.attr('src', tile.src);
            }
            img.fadeIn(100);
            tile.flipped = !tile.flipped;
        }); //after fadeOut
        //on click of gameboard images
    });
});