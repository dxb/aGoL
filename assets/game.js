"use strict";

var Game = (function(game, $, undefined) {
	var canvas;
	var canvasCtx;
	var colors;
	var pixSize;
	var cells;
	var autoRun;
	var stats;
    var test= 'toto';

	game.init = function(config) {
		canvas    = document.getElementById(config.canvas);
		canvasCtx = canvas.getContext('2d');
		colors    = config.colors;
		canvasCtx.strokeStyle = colors.borders;
		canvasCtx.fillStyle   = colors.alive;
		pixSize   = config.pixSize || 7;
		cells     = {};
        test = [];
		for (var i in config.coords)
		{
            addCell(test, config.coords[i].x,config.coords[i].y, 1);
            cells[config.coords[i].x + '*' + config.coords[i].y] = 1;
		}
		stats = {
			 nbCells: config.coords.length
			,nbSteps: 0
		};
	};

    var addCell = function(test, xPos,yPos, cellValue){
        return test.push({x:xPos, y:yPos, value: cellValue});
    };

	game.start = function() {
		initRender();
		renderCells(cells);
		++stats.nbSteps;
	};

	game.newEra = function() {
		var counter  = {};
		stats.nbCells = 0;
		for (var i in cells)
		{
			if (cells[i] === 0)
			{
				delete cells[i];
				continue;
			}

			cells[i] = 0;
			var c = i.split('*');
			var x = c[0] | 0;
			var y = c[1] | 0;
			var props = [];
			props.push((x - 1) + '*' + (y - 1));
			props.push((x - 1) + '*' +  y);
			props.push((x - 1) + '*' + (y + 1));
			props.push( x      + '*' + (y - 1));
			props.push( x      + '*' + (y + 1));
			props.push((x + 1) + '*' + (y - 1));
			props.push((x + 1) + '*' +  y);
			props.push((x + 1) + '*' + (y + 1));
			for (var j in props)
			{
				if (counter.hasOwnProperty(props[j]))
				{
					++counter[props[j]];
				}
				else
				{
					counter[props[j]] = 1;
				}
			}
		}
		for (var i in counter)
		{
			// newborn
			if (counter[i] === 3)
			{
				cells[i] = 1;
				++stats.nbCells;
			}
			// or still alive
			else if (counter[i] === 2 && cells.hasOwnProperty(i))
			{
				cells[i] = 2;
				++stats.nbCells;
			}
		}
		renderCells(cells);
		++stats.nbSteps;
	};

	game.toggleAutoRun = function(timer) {
		if (autoRun)
		{
			clearInterval(autoRun);
			autoRun = false;
			return;
		}
        window.requestAnimationFrame( this.newEra, timer );
		//autoRun = setInterval(this.newEra, timer);
	}

	var initRender = function() {
		for (var y = 0; y < canvas.height / pixSize; y++)
		{
			for (var x = 0; x < canvas.width / pixSize; x++)
			{
				canvasCtx.strokeRect(x * pixSize, y * pixSize, pixSize, pixSize);
			}
		}
	};

	var renderCells = function(cells) {
        //console.log(test);
        test.forEach(function(cell){
            console.log(cell);
        });
		for (var i in cells)
		{
			if (cells[i] === 2)
			{
				continue;
			}

			var c = i.split('*');
			var x = c[0] * pixSize;
			var y = c[1] * pixSize;

			if (cells[i] === 0)
			{
				canvasCtx.clearRect(x, y, pixSize - 1, pixSize - 1);
			}
			else if (cells[i] === 1)
			{
				canvasCtx.fillRect(x, y, pixSize - 1, pixSize - 1);
			}
		}
		$(document).trigger('game.rendered', stats);
	};



	return game;
})(Game || {}, jQuery);
