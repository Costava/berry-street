function Vector2() {

}

Vector2.clone = function(v) {
	return {x: v.x, y: v.y};
}

Vector2.distance = function(v1, v2) {
	return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
};

module.exports = Vector2;
