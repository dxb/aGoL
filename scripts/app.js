define(['jquery','game'], function ($, game) {
    (function() {
        $(document).ready(function() {
            $(document).on('game.rendered', function(game, stats) {
                document.getElementById('era').innerHTML = stats.nbSteps;
                document.getElementById('live-cells').innerHTML = stats.nbCells;
                document.getElementById('total-born-cells').innerHTML =
                    (document.getElementById('total-born-cells').innerHTML | 0) + stats.nbCells;
            });
            Game.init({
                canvas: 'game-of-life'
                ,pixSize: 4
                ,colors: {
                    borders: '#d4d4d4'
                    ,alive: '#aad'
                }
                ,coords: [
                    ,{x: 101, y: 68}
                    ,{x: 103, y: 69}
                    ,{x: 100, y: 70}
                    ,{x: 101, y: 70}
                    ,{x: 104, y: 70}
                    ,{x: 105, y: 70}
                    ,{x: 106, y: 70}
                ]
            });
            Game.start();
            $('#new-era').on('click', function() { Game.newEra(); });
            $('#auto-run').on('click', function() { Game.toggleAutoRun(1); });
        });
    })();
});