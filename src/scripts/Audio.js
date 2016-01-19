function Audio() {
	this.howls = {};

	this.categories = {};

	this.setupDone = false;

	this.totalNumSounds = 0;
	this.numSoundsLoaded = 0;
	this.numLoadErrors = 0;
}

/*
 * @param {object} o
 * * @property {string} name
 * * @property {array} paths
 * * @property {string} category
 * * @property {function} onend
 */
Audio.prototype.add = function(o) {
	this.totalNumSounds += 1;

	// `buffer: true` forces HTML5 audio, which can use a file:// location
	var newHowl = new Howl({
		urls: o.paths,
		buffer: true,
		onload: function() {
			console.log("Sound loaded");

			this.numSoundsLoaded += 1;
		}.bind(this),
		onloaderror: function() {
			console.log("Sound load error");

			this.numLoadErrors += 1;
		}.bind(this),
		onend: o.onend
	});

	if (typeof o.category === 'string') {
		if (this.categories[o.category] === undefined) {
			this.categories[o.category] = [];
		}

		this.categories[o.category].push(newHowl);
	}

	this.howls[o.name] = newHowl;
};

Audio.prototype.setCategoryVolume = function(category, vol) {
	var array = this.categories[category];

	for (var i = 0; i < array.length; i++) {
		array[i].volume(vol);
	}
};

/*
 * Returns true if all sounds have loaded, else false
 */
Audio.prototype.doneLoading = function() {
	if (this.setupDone && this.numSoundsLoaded === this.totalNumSounds) {
		return true;
	}

	return false;
};

module.exports = Audio;
