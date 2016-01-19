var Color = require('./Color.js');

function Enemy(pos, radius, speed, laneNumber) {
	this.pos = pos;
	this.radius = radius;
	this.speed = speed;
	this.laneNumber = laneNumber;

	this.color = new Color(0, 0, 0, 1);
}

Enemy.prototype.move = function(dt) {
	var dy = dt * this.speed;

	this.pos.y += dy;
};

Enemy.prototype.render = function(ctx, unit) {
	ctx.save();

	ctx.beginPath();
	ctx.arc(0, 0, this.radius * unit, 0, 2 * Math.PI, false);

	ctx.fillStyle = this.color.toString();
	ctx.fill();

	ctx.closePath();
	ctx.restore();
};

Enemy.prototype._draw = function(ctx, unit, pos) {
	ctx.save();

	ctx.translate(pos.x * unit, pos.y * unit);

	this.render(ctx, unit);

	ctx.restore();
};

Enemy.prototype.draw = function(ctx, unit) {
	this._draw(ctx, unit, this.pos);
};

module.exports = Enemy;
