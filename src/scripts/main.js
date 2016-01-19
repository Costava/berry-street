console.log('main.js');

var Util = require('./Util.js');
var Keyboard = require('./Keyboard.js');
var App = require('./App.js');
var Game = require('./Game.js');
var Audio = require('./Audio.js');

//////////

var keyboard = new Keyboard();
var app = new App();
var game = new Game();
var audio = new Audio();
var c = document.querySelector('.js-app-canvas');
var ctx = c.getContext('2d');

keyboard.startListen(document);
app.keyboard = keyboard;
game.keyboard = keyboard;

app.game = game;
app.game.messageHolder = document.querySelector('.js-message');
app.game.canvasAspectWidth = app.canvasAspectWidth;
app.game.canvasAspectHeight = app.canvasAspectHeight;
app.game.c = c;
app.game.ctx = ctx;
app.game.vw = app.game.c.width / 100;

app.game.dieCallback = function() {
	app.showMenu(app.menus.end);
};

app.game.pauseCallback = function() {
	app.showMenu(app.menus.pause);
};

app.game.resumeCallback = function() {
	app.hideMenu(app.menus.pause);
};

app.game.restartCallback = function() {
	app.hideMenu(app.menus.end);
};

app.getMenuHooks(['loading', 'audioerror', 'main', 'htp', 'about', 'options', 'pause', 'end']);

audio.add({
	name: 'DayAndNight',
	paths: ['audio/DayAndNight.ogg', 'audio/DayAndNight.opus', 'audio/DayAndNight.aac'],
	category: 'music',
	onend: function() {
		this.howls.ATheme.play();
	}.bind(audio)
});
audio.add({
	name: 'ATheme',
	paths: ['audio/10112013.ogg', 'audio/10112013.opus', 'audio/10112013.aac'],
	category: 'music',
	onend: function() {
		this.howls.DayAndNight.play();
	}.bind(audio)
});

audio.setupDone = true;

app.showMenu(app.menus.loading);
function waitingLoop() {
	if (audio.doneLoading()) {
		app.hideMenu(app.menus.loading);

		// Start music loop
		audio.howls.DayAndNight.play();

		// Start game
		app.showMenu(app.menus.main);

		app.game.startMenuLoop();
	}
	else if (audio.numLoadErrors >= 1) {
		// Error loading audio
		console.log("Error loading audio");

		app.hideMenu(app.menus.loading);

		app.showMenu(app.menus.main);
		app.game.startMenuLoop();

		app.showMenu(app.menus.audioerror);
	}
	else {
		// Keep waiting for loading
		setTimeout(waitingLoop, 0);
	}
}
// Start the waiting loop
waitingLoop();

//////////

document.querySelector('.js-close-audioerror').addEventListener('click', function() {
	app.hideMenu(app.menus.audioerror);
});

document.querySelector('.js-start').addEventListener('click', function() {
	app.hideMenu(app.menus.main);

	app.startGame();
});

document.querySelector('.js-how-to-play').addEventListener('click', function() {
	app.showMenu(app.menus.htp)
});

document.querySelector('.js-htp-close').addEventListener('click', function() {
	app.hideMenu(app.menus.htp)
});

document.querySelector('.js-about').addEventListener('click', function() {
	app.showMenu(app.menus.about)
});

document.querySelector('.js-about-close').addEventListener('click', function() {
	app.hideMenu(app.menus.about)
});

Array.prototype.forEach.call(document.querySelectorAll('.js-options'), function(element) {
	element.addEventListener('click', function() {
		app.showMenu(app.menus.options);
	});
});

document.querySelector('.js-resume').addEventListener('click', function() {
	app.game.resume();
});

document.querySelector('.js-pause-main').addEventListener('click', function() {
	app.game.unbindPauseControls();

	app.game.endGameCleanUp();

	app.hideMenu(app.menus.pause);

	app.showMenu(app.menus.main);

	app.game.startMenuLoop();
});


document.querySelector('.js-end-again').addEventListener('click', function() {
	app.game.unbindEndControls();

	app.hideMenu(app.menus.end);

	app.startGame();
});

document.querySelector('.js-end-main').addEventListener('click', function() {
	app.game.unbindEndControls();

	app.hideMenu(app.menus.end);

	app.showMenu(app.menus.main);

	app.game.startMenuLoop();
});

document.querySelector('.js-langs').addEventListener('change', function() {
	var lang = this.options[this.selectedIndex].value;

	app.game.lang = lang;
});

document.querySelector('.js-close-options').addEventListener('click', function() {
	app.hideMenu(app.menus.options);
});

var volumeSlider = document.querySelector('.js-volume');
volumeSlider.addEventListener('change', function() {
	Howler.volume(this.value);
});
// Set default volume
Howler.volume(0.3);
volumeSlider.value = 0.3;

document.querySelector('.js-no-wrap-on-repeat').addEventListener('change', function() {
	if (this.checked === true || this.checked === false) {
		app.game.noWrapOnRepeat = this.checked;

		// console.log(`noWrapOnRepeat: ${app.game.noWrapOnRepeat}`);
	}
});

document.querySelector('.js-score-font').addEventListener('change', function() {
	app.game.messageHolder.style['font-family'] = `${this.value}, monospace`;
});

app.fontSize = 24;
app.padding = 4;

Array.prototype.forEach.call(document.querySelectorAll('.js-score-size'), function(element) {
	element.addEventListener('change', function() {
		var fontSizeElement = document.querySelector('.js-score-font-size');
		var paddingElement = document.querySelector('.js-score-padding');

		var newFontSize = parseFloat(fontSizeElement.value);
		var newPadding = parseFloat(paddingElement.value);

		if (isNaN(newFontSize) || isNaN(newPadding) || newFontSize < 0 || newPadding < 0) {
			fontSizeElement.value = app.fontSize;
			paddingElement.value = app.padding;
		}
		else {
			app.fontSize = newFontSize;
			app.padding = newPadding;

			app.game.messageHolder.style.padding = `${app.padding}px 0 ${app.padding}px 0`;
			app.game.messageHolder.style['font-size'] = `${app.fontSize}px`;
			app.game.messageHolder.style.height = `${(app.fontSize + 2 * app.padding)}px`;

			handleResize();
		}
	});
});

function handleResize() {
	// Get necessary hooks
	var space = document.querySelector('.js-app-space');
	var container = document.querySelector('.js-app-container');
	var canvas = document.querySelector('.js-app-canvas');
	var message = document.querySelector('.js-message');

	// Calculate max size of canvas
	var canvasMaxSize = Util.maxChildSize(app.canvasAspectWidth, app.canvasAspectHeight, space.offsetWidth, space.offsetHeight - message.offsetHeight);

	var leftoverWidth = space.offsetWidth - canvasMaxSize.width;
	var leftoverHeight = space.offsetHeight - canvasMaxSize.height - message.offsetHeight;

	// Put extra pixel on right if not even margin
	var leftMargin = Math.floor(leftoverWidth / 2);
	var rightMargin = Math.ceil(leftoverWidth / 2);
	// Put extra pixel on bottom if not even margin
	var topMargin = Math.floor(leftoverHeight / 2);
	var bottomMargin = Math.ceil(leftoverHeight / 2);

	// Size container
	container.style.width = `${canvasMaxSize.width}px`;
	container.style.height = `${canvasMaxSize.height + message.offsetHeight}px`;

	// Center container
	container.style['margin-left'] = `${leftMargin}px`;
	container.style['margin-right'] = `${rightMargin}px`;
	container.style['margin-top'] = `${topMargin}px`;
	container.style['margin-bottom'] = `${bottomMargin}px`;

	// Size canvas
	canvas.style.width = `${canvasMaxSize.width}px`;
	canvas.style.height = `${canvasMaxSize.height}px`;

	canvas.width = canvasMaxSize.width;
	canvas.height = canvasMaxSize.height;

	// Update responsive units
	app.game.vw = app.game.c.width / 100;
	app.game.laneWidth = app.game.c.width / app.game.numLanes;
	app.game.laneWidthvw = app.game.laneWidth / app.game.vw;

	// Make message as wide as canvas
	message.style.width = canvas.style.width;

	// Push message under canvas
	message.style['margin-top'] = canvas.style.height;
}
window.addEventListener('resize', handleResize);
handleResize();// initial run
