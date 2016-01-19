function Keyboard() {
	this.target = undefined;
	this.isKeyDown = {};

	this.keydownEvent = undefined;
	this.keyupEvent = undefined;
}

Keyboard.keyIdentifier = {};

Keyboard.keyIdentifier[87] = 'W';
Keyboard.keyIdentifier[65] = 'A';
Keyboard.keyIdentifier[83] = 'S';
Keyboard.keyIdentifier[68] = 'D';

Keyboard.keyIdentifier[38] = 'ArrowUp';
Keyboard.keyIdentifier[37] = 'ArrowLeft';
Keyboard.keyIdentifier[40] = 'ArrowDown';
Keyboard.keyIdentifier[39] = 'ArrowRight';

Keyboard.keyIdentifier[16] = 'Shift';
Keyboard.keyIdentifier[90] = 'Z';
Keyboard.keyIdentifier[88] = 'X';
Keyboard.keyIdentifier[67] = 'C';

Keyboard.keyIdentifier[27] = 'Escape';
Keyboard.keyIdentifier[32] = 'Space';

Keyboard.prototype.getKeyIdentifier = function(e) {
	return e.keyCode;
};

Keyboard.prototype.getKeyFromIdentifier = function(ident) {
	return Keyboard.keyIdentifier[ident];
};

Keyboard.prototype.getKey = function(e) {
	return this.getKeyFromIdentifier(this.getKeyIdentifier(e));
};

Keyboard.prototype.keydown = function(e) {
	var key = this.getKey(e);

	this.isKeyDown[key] = true;
};

Keyboard.prototype.keyup = function(e) {
	var key = this.getKey(e);

	this.isKeyDown[key] = false;
};

Keyboard.prototype.startListen = function(target) {
	this.target = target;

	this.keydownEvent = this.keydown.bind(this);
	this.keyupEvent = this.keyup.bind(this);

	this.target.addEventListener('keydown', this.keydownEvent);
	this.target.addEventListener('keyup', this.keyupEvent);
};

Keyboard.prototype.stopListen = function() {
	this.target.removeEventListener('keydown', this.keydownEvent);
	this.target.removeEventListener('keyup', this.keyupEvent);
};

module.exports = Keyboard;
