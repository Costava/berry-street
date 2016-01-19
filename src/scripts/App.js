var Game = require('./Game.js');

function App() {
	// Define aspect ratio as two integers
	//  where width/height = ratio
	this.canvasAspectWidth = 3;
	this.canvasAspectHeight = 1;

	this.menus = {};
	this.menuList = [];

	this.keyboard = undefined;
	this.game = undefined;
}

App.prototype.getMenuHooks = function(menuArray) {
	this.menuList = menuArray;

	this.menuList.forEach(function(menu) {
		this.menus[menu] = document.querySelector(`.js-${menu}-menu`);
	}.bind(this));
};

App.prototype.hideMenu = function(element) {
	element.style.height = '0';
};

App.prototype.showMenu = function(element) {
	element.style.height = '100%';
};

App.prototype.startGame = function() {
	this.game.start();
};

module.exports = App;
