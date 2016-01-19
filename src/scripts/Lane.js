var Color = require('./Color.js');

function Lane(color) {
	this.color = color;

	this.open = true;

	this.coverColor = new Color(0, 0, 0, 1);
	// Amount that cover covers the lane (coming from top)
	this.coverUnit = 0;// 0 to 1
	this.targetCoverUnit = 0;
	this.coverUnitSpeed = 0.005;// max change per millisecond
}

Lane.prototype.render = function(ctx, width, height) {
	var coverDistance = this.coverUnit * height;

	ctx.save();

	ctx.fillStyle = this.color.toString();
	ctx.fillRect(0, 0, width, height);

	ctx.fillStyle = this.coverColor.toString();
	ctx.fillRect(0, 0, width, coverDistance);

	ctx.restore();
};

module.exports = Lane;
