require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        game: '../assets/game'
    },
    shim: {
        'game':{
            exports: 'game'
        }
    }
});

require(['app', 'jquery', 'main'], function (app, $,main){
    'use strict';
    // use app here

    //pollyfill for requestAnimationFrame
    //put into his own file
    (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    console.log(app);
});
