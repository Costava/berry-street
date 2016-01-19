var Vector2 = require('./Vector2.js');

function Player(pos, radius) {
	this.pos = pos;
	this.radius = radius;

	// positive values because speed is scalar
	this.speed = {x: 0.2, y: 0.2};// vw per millisecond

	this.targetLane = 0;
	this.targetPos = Vector2.clone(pos);
}

/*
 * @param {number} dt - in milliseconds
 */
Player.prototype.move = function(dt) {
	['x', 'y'].forEach(function(component) {
		var dist = this.targetPos[component] - this.pos[component];

		var maxMoveDist = dt * this.speed[component];

		if (maxMoveDist >= Math.abs(dist)) {
			this.pos[component] = this.targetPos[component];
		}
		else {
			if (dist > 0) {
				this.pos[component] += maxMoveDist;
			}
			else {
				this.pos[component] -= maxMoveDist;
			}
		}
	}.bind(this));
};

Player.prototype.updateTargetPos = function(laneWidthvw) {
	var y = this.pos.y;

	var x = (laneWidthvw / 2) + (this.targetLane * laneWidthvw);

	this.targetPos = {x: x, y: y};
};

Player.prototype.render = function(ctx, unit) {
	ctx.save();

	ctx.beginPath();
	ctx.arc(0, 0, this.radius * unit, 0, 2 * Math.PI, false);

	ctx.globalCompositeOperation = 'difference';
	ctx.fillStyle = '#fff';
	ctx.fill();

	ctx.closePath();
	ctx.restore();
};

Player.prototype._draw = function(ctx, unit, pos) {
	ctx.save();

	ctx.translate(pos.x * unit, pos.y * unit);

	this.render(ctx, unit);

	ctx.restore();
};

Player.prototype.draw = function(ctx, unit) {
	this._draw(ctx, unit, this.pos);
};

module.exports = Player;
