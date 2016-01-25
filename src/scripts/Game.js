var Util = require('./Util.js');
var Lane = require('./Lane.js');
var Color = require('./Color.js');
var Vector2 = require('./Vector2.js');
// var Task = require('./Task.js');
var Player = require('./Player.js');
var Enemy = require('./Enemy.js');

function Game() {
	this.numLanes = 17;
	this.lanes = [];

	this.newTime = 0;
	this.oldTime = 0;
	this.gameTime = 0;

	this.gameLooping = false;
	this.paused = false;

	this.menuLooping = false;

	this.keyboard = undefined;

	this.lang = 'en';

	// Do no go right when in rightmost lane if
	//  keydown call is a repeated call (key held)
	this.noWrapOnRepeat = true;

	this.score = 0;
	this.highScore = 0;

	// this.tasks = [];

	this.messageInterval = 5000;// milliseconds
	this.messageTime = 0;

	this.enemyMinRadius = 0.20;// % of laneWidth
	this.enemyMaxRadius = 0.45;

	// Enemys travel at a speed somewhere between min and max
	// Max speed starts at initial value and increases
	//  to the top speed as the game goes on
	this.enemyMinSpeed = 0.015;// vw per millisecond
	this.enemyInitialMaxSpeed = 0.020;
	this.enemyMaxSpeed = this.enemyInitialMaxSpeed;
	this.enemyTopSpeed = 0.060;

	// newEnemyInterval starts at the initial value and
	//  decreases as game goes on to minimum value
	this.newEnemyInitialInterval = 400;// milliseconds
	this.newEnemyInterval = this.newEnemyInitialInterval;
	this.newEnemyMinInterval = 90;
	this.newEnemyTime = 0;

	this.menuEnemyMinSpeed = 0.010;// vw per millisecond
	this.menuEnemyMaxSpeed = 0.015;

	this.menuEnemyInterval = 300;// milliseconds
	this.menuEnemyTime = 0;

	this.enemies = [];

	this.canvasAspectWidth = undefined;
	this.canvasAspectHeight = undefined;

	this.c = undefined;// canvas
	this.ctx = undefined;// canvas 2d context

	this.vw = undefined;// 1vw = 1% of width
	this.laneWidth = undefined;
	this.laneWidthvw = undefined;// laneWidth in vw

	this.messageHolder = undefined;
}

/*
 * Create task, add it to task array
 */
// Game.prototype.addTask = function(todo) {
// 	var task = new Task(todo);
//
// 	// Give task a remove function that it can call when it is done
// 	task.remove = (function(t) {
// 		return function() {
// 			this.tasks.splice(this.tasks.indexOf(t), 1);
// 		}
// 	})(task).bind(this);
//
// 	this.tasks.push(task);
// };

/*
 * Returns max height of canvas in vw
 */
Game.prototype.maxHeight = function() {
	return this.c.height / this.vw;
};

Game.prototype.updateScoreMessage = function() {
	this.messageHolder.innerHTML = writtenNumber(this.score, {lang: this.lang});
};

Game.prototype.updateScore = function() {
	Array.prototype.forEach.call(document.querySelectorAll('.js-score'), function(element) {
		element.innerHTML = this.score;
	}.bind(this));
};

Game.prototype.updateHighScore = function() {
	Array.prototype.forEach.call(document.querySelectorAll('.js-high-score'), function(element) {
		element.innerHTML = this.highScore;
	}.bind(this));
};

Game.prototype.newHighScore = function(score) {
	if (score > this.highScore) {
		this.highScore = score;

		return true;
	}

	return false;
};

Game.prototype.pause = function() {
	this.gameLooping = false;

	this.unbindGameControls();

	this.bindPauseControls();

	this.updateScore();

	this.pauseCallback();
};

Game.prototype.resume = function() {
	this.unbindPauseControls();

	this.gameLooping = true;

	this.bindGameControls();

	this.resumeCallback();

	this.oldTime = new Date().getTime();

	this.gameLoopBound();
};

Game.prototype.keydownHandler = function(e) {
	// console.log(e.repeat);

	var key = this.keyboard.getKey(e);

	var targetLaneDiff = 0;

	if (key === 'A' || key === 'ArrowLeft') {
		targetLaneDiff = -1;
	}
	else if (key === 'D' || key === 'ArrowRight') {
		targetLaneDiff = 1;
	}
	else if (key === 'W' || key === 'ArrowUp' || key === 'Escape') {
		// Pause
		this.pause();
	}

	if (targetLaneDiff !== 0) {
		var newTargetLane = this.player.targetLane + targetLaneDiff;

		if (newTargetLane >= 0 && newTargetLane <= this.lanes.length - 1) {
			if (this.lanes[newTargetLane].open) {
				this.player.targetLane = newTargetLane;

				this.player.updateTargetPos(this.laneWidthvw);
			}
		}
		else if (newTargetLane === this.lanes.length) {
			if (!this.noWrapOnRepeat || (this.noWrapOnRepeat && !e.repeat)) {
				this.player.targetLane = newTargetLane;

				this.player.updateTargetPos(this.laneWidthvw);
			}
		}
	}
};

Game.prototype.bindGameControls = function() {
	this.keydownHandlerBound = this.keydownHandler.bind(this);

	document.addEventListener('keydown', this.keydownHandlerBound);
};

Game.prototype.unbindGameControls = function() {
	document.removeEventListener('keydown', this.keydownHandlerBound);
};

Game.prototype.pauseKeydownHandler = function(e) {
	var key = this.keyboard.getKey(e);

	if (key === 'W' || key === 'ArrowUp' || key === 'Escape') {
		// Resume
		this.resume();
	}
};

Game.prototype.bindPauseControls = function() {
	this.pauseKeydownHandlerBound = this.pauseKeydownHandler.bind(this);

	document.addEventListener('keydown', this.pauseKeydownHandlerBound);
};

Game.prototype.unbindPauseControls = function() {
	document.removeEventListener('keydown', this.pauseKeydownHandlerBound);
};

Game.prototype.endKeydownHandler = function(e) {
	var key = this.keyboard.getKey(e);

	if (key === 'D' || key === 'ArrowRight') {
		// Start another game

		this.restartCallback();

		this.unbindEndControls();

		this.start();
	}
};

Game.prototype.bindEndControls = function() {
	this.endKeydownHandlerBound = this.endKeydownHandler.bind(this);

	document.addEventListener('keydown', this.endKeydownHandlerBound);
};

Game.prototype.unbindEndControls = function() {
	document.removeEventListener('keydown', this.endKeydownHandlerBound);
};

Game.prototype.addRandomEnemy = function() {
	var lane = Util.randomInt(1, this.lanes.length - 2);

	var radiusvw = Util.randomInInterval(this.enemyMinRadius, this.enemyMaxRadius) * this.laneWidthvw;
	var speedvw = Util.randomInInterval(this.enemyMinSpeed, this.enemyMaxSpeed);

	var xvw = (this.laneWidthvw / 2) + lane * this.laneWidthvw;
	var yvw = 0 - radiusvw;

	var enemy = new Enemy({x: xvw, y: yvw}, radiusvw, speedvw, lane);

	this.enemies.push(enemy);
};

Game.prototype.addRandomMenuEnemy = function() {
	var lane = Util.randomInt(1, this.lanes.length - 2);

	var radiusvw = Util.randomInInterval(this.enemyMinRadius, this.enemyMaxRadius) * this.laneWidthvw;
	var speedvw = Util.randomInInterval(this.menuEnemyMinSpeed, this.menuEnemyMaxSpeed);

	var xvw = (this.laneWidthvw / 2) + lane * this.laneWidthvw;
	var yvw = 0 - radiusvw;

	var enemy = new Enemy({x: xvw, y: yvw}, radiusvw, speedvw, lane);

	this.enemies.push(enemy);
};

Game.prototype.randomLaneColor = function() {
	var r = Util.randomInt(30, 255);
	var g = Util.randomInt(30, 255);
	var b = Util.randomInt(30, 255);

	return new Color(r, g, b, 1);
};

Game.prototype.renderLanes = function(c, ctx) {
	var width = c.width / this.lanes.length;
	var height = c.height;

	ctx.save();

	for (var i = 0; i < this.lanes.length; i++) {
		this.lanes[i].render(ctx, width, height);

		ctx.translate(width, 0);
	}

	ctx.restore();
};

Game.prototype.endGameCleanUp = function() {
	this.unbindGameControls();
};

Game.prototype.dieCallback = function() {
	console.log('dieCallback');
};

Game.prototype.pauseCallback = function() {
	console.log('pauseCallback');
};

Game.prototype.resumeCallback = function() {
	console.log('resumeCallback');
};

Game.prototype.restartCallback = function() {
	console.log('restartCallback');
};

Game.prototype.draw = function() {
	// Draw game
	this.ctx.clearRect(0, 0, this.c.width, this.c.height);

	this.renderLanes(this.c, this.ctx);

	this.player.draw(this.ctx, this.vw);
	// Draw player 100vw behind to show screen wrapping
	this.player._draw(this.ctx, this.vw, {x: this.player.pos.x - 100, y: this.player.pos.y});

	this.enemies.forEach(function(enemy) {
		enemy.draw(this.ctx, this.vw);
	}.bind(this));
};

Game.prototype.start = function() {
	// Set states
	this.paused = false;
	this.gameLooping = true;
	this.menuLooping = false;

	// Empty task array
	// this.tasks = [];

	// Reset all times
	var currentTime = new Date().getTime();

	this.oldTime = currentTime;
	this.newTime = currentTime;
	this.gameTime = 0;

	this.messageTime = this.gameTime - this.messageInterval;
	this.newEnemyTime = this.gameTime - this.newEnemyInterval;

	this.enemies = [];
	this.enemyMaxSpeed = this.enemyInitialMaxSpeed;
	this.newEnemyInterval = this.newEnemyInitialInterval;

	// Generate lanes
	// Edge lanes have white color
	// Inner lanes are random color
	this.lanes = [];
	this.lanes.push(new Lane(new Color(255, 255, 255, 1)));

	for (var i = 0; i < this.numLanes - 2; i++) {
		this.lanes.push(new Lane(this.randomLaneColor()));
	}

	this.lanes.push(new Lane(new Color(255, 255, 255, 1)));

	// Clear old message
	this.messageHolder.innerHTML = '';

	// Create Player
	var xvw = (this.laneWidth / 2) / this.vw;
	var radiusvw = (this.laneWidth * 0.35) / this.vw;
	var yvw = this.maxHeight() - radiusvw - (this.laneWidthvw - 2 * radiusvw) / 2;

	this.player = new Player({x: xvw, y: yvw}, radiusvw);

	this.score = 0;

	this.updateScoreMessage();

	// Enable controls
	this.bindGameControls();

	// Start looping
	this.gameLoopBound = this.gameLoop.bind(this);
	this.gameLoopBound();
};

Game.prototype.gameLoop = function() {
	// console.log("gameLoop");
	// console.log(document.activeElement);

	this.newTime = new Date().getTime();
	this.dt = this.newTime - this.oldTime;
	this.gameTime += this.dt;

	// console.log(`dt: ${this.dt}`);

	//////////

	// console.log(`Num enemies: ${this.enemies.length}`);

	// this.tasks.forEach(function(task) {
	// 	task.todo();
	// });

	// Remove out of bounds enemies
	this.enemies.forEach(function(enemy) {
		if (enemy.pos.y > this.maxHeight() + enemy.radius) {
			this.enemies.splice(this.enemies.indexOf(enemy), 1);
		}
	}.bind(this));

	// Update lane 0
	if (this.player.targetLane >= 1 && this.player.targetLane <= this.lanes.length - 2) {
		this.lanes[0].open = false;
		this.lanes[0].targetCoverUnit = 1;
	}
	else {
		this.lanes[0].open = true;
		this.lanes[0].targetCoverUnit = 0;
	}

	// Only update cover on lane 0
	if (this.lanes[0].coverUnit !== this.lanes[0].targetCoverUnit) {
		var diff = this.lanes[0].targetCoverUnit - this.lanes[0].coverUnit;

		var maxChange = this.dt * this.lanes[0].coverUnitSpeed;

		if (maxChange >= Math.abs(diff)) {
			this.lanes[0].coverUnit = this.lanes[0].targetCoverUnit;
		}
		else {
			if (this.lanes[0].targetCoverUnit > this.lanes[0].coverUnit) {
				this.lanes[0].coverUnit += maxChange;
			}
			else {
				this.lanes[0].coverUnit -= maxChange;
			}
		}
	}

	// Move enemies
	this.enemies.forEach(function(enemy) {
		enemy.move(this.dt);
	}.bind(this));

	// Move player
	this.player.move(this.dt);

	// Wrap around player if need
	if (this.player.pos.x >= 100 + this.player.radius) {
		this.player.pos.x -= 100;

		this.player.targetLane = 0;
		this.player.updateTargetPos(this.laneWidthvw);

		for (var i = 1; i <= this.lanes.length - 2; i++) {
			this.lanes[i].color = this.randomLaneColor();
		}

		// Increase score and update score display
		this.score += 1;

		this.updateScoreMessage();

		// Increase difficulty
		this.enemyMaxSpeed += 0.002;
		this.enemyMaxSpeed = Math.min(this.enemyMaxSpeed, this.enemyTopSpeed);

		this.newEnemyInterval -= 20;
		this.newEnemyInterval = Math.max(this.newEnemyInterval, this.newEnemyMinInterval);

		// console.log(`enemyMaxSpeed: ${this.enemyMaxSpeed} newEnemyInterval: ${this.newEnemyInterval}`);
	}

	// Check for enemy-player collision
	var hitEnemy;
	var hit = this.enemies.some(function(enemy) {
		var distance = Vector2.distance(enemy.pos, this.player.pos);

		if (distance <= enemy.radius + this.player.radius) {
			hitEnemy = enemy;
			return true;
		}

		return false;
	}.bind(this));

	// Make new enemy if the time passed
	// It is okay for this to happen after the enemy-player check
	//  because a newly created enemy has no chance of colliding
	//  with the player
	if (this.gameTime - this.newEnemyInterval >= this.newEnemyTime) {
		this.addRandomEnemy();

		this.newEnemyTime = this.gameTime;
	}

	if (hit) {
		this.gameLooping = false;

		this.endGameCleanUp();

		this.updateScore();

		var newSpan = document.querySelector('.js-new');
		if (this.newHighScore(this.score)) {
			this.updateHighScore();

			newSpan.innerHTML = "New ";
		}
		else {
			newSpan.innerHTML = "";
		}

		this.enemies.forEach(function(enemy) {
			enemy.speed *= 0.1;
		});
		hitEnemy.speed = 0;

		this.endTime = this.newTime + 2000;

		this.endLoop = function() {
			// console.log("endLoop");

			this.newTime = new Date().getTime();

			if (this.newTime < this.endTime) {
				this.dt = this.newTime - this.oldTime;
				this.gameTime += this.dt;

				this.enemies.forEach(function(enemy) {
					enemy.move(this.dt);
				}.bind(this));

				this.draw();

				setTimeout(this.endLoop, 0);
			}
			else {
				this.bindEndControls();

				this.dieCallback();
			}

			this.oldTime = this.newTime;
		}.bind(this);

		this.endLoop();
	}

	// Draw game
	this.draw();

	//////////

	this.oldTime = this.newTime;

	if (this.gameLooping) {
		window.requestAnimationFrame(this.gameLoopBound);
	}
};

Game.prototype.startMenuLoop = function() {
	var currentTime = new Date().getTime();

	this.oldTime = currentTime;
	this.newTime = currentTime;
	this.gameTime = 0;

	this.paused = false;
	this.gameLooping = false;
	this.menuLooping = true;

	this.menuEnemyTime = this.gameTime - this.menuEnemyInterval;

	this.messageHolder.innerHTML = '';

	this.enemies = [];
	this.enemyMaxSpeed = this.enemyInitialMaxSpeed;

	this.lanes = [];

	for (var i = 0; i < this.numLanes; i++) {
		var r = Util.randomInt(50, 255);
		var g = Util.randomInt(50, 255);
		var b = Util.randomInt(50, 255);
		var a = 1;

		var color = new Color(r, g, b, a);

		var lane = new Lane(color);

		this.lanes.push(lane);
	}

	this.menuLoopBound = this.menuLoop.bind(this);

	this.menuLoopBound();
};

Game.prototype.menuLoop = function() {
	// console.log('menuLoop');

	this.newTime = new Date().getTime();
	this.dt = this.newTime - this.oldTime;
	this.gameTime += this.dt;

	// console.log(`dt: ${this.dt}`);

	// Make new enemy if the time passed
	if (this.gameTime - this.menuEnemyInterval >= this.menuEnemyTime) {
		this.addRandomMenuEnemy();

		this.menuEnemyTime = this.gameTime;
	}

	// Move enemies
	this.enemies.forEach(function(enemy) {
		enemy.move(this.dt);
	}.bind(this));

	// Remove out of bounds enemies
	this.enemies.forEach(function(enemy) {
		if (enemy.pos.y > this.maxHeight() + enemy.radius) {
			this.enemies.splice(this.enemies.indexOf(enemy), 1);
		}
	}.bind(this));

	// Draw game
	this.ctx.clearRect(0, 0, this.c.width, this.c.height);

	this.renderLanes(this.c, this.ctx);

	this.enemies.forEach(function(enemy) {
		enemy.draw(this.ctx, this.vw);
	}.bind(this));

	this.oldTime = this.newTime;

	if (this.menuLooping) {
		window.requestAnimationFrame(this.menuLoopBound);
	}
};

module.exports = Game;
