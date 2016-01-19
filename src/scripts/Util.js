var Util = {};

/*
 * Returns an integer between {number} min and {number} max (both inclusive)
 * min and max are expected to be integers
 */
Util.randomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
 * Returns random value between {number} min (inclusive) and {number} max (exclusive)
 */
Util.randomInInterval = function(min, max) {
	return Math.random() * (max - min) + min;
}

/*
 * @param {number} childAspectWidth
 * @param {number} childAspectHeight
 * ^ Two integers where width/height == aspect ratio
 * @param {number} parentWidth - generic unit
 * @param {number} parentHeight - generic unit
 * @returns {object}
 *  - has width and height properties (in generic unit as integer) of max size of child
 *    having childAspectWidth/Height aspect ratio inside parent with parentWidth and -Height
 */
Util.maxChildSize = function(childAspectWidth, childAspectHeight, parentWidth, parentHeight) {
	if ((childAspectWidth < 0 || childAspectHeight < 0) || (childAspectWidth === 0 && childAspectHeight === 0)) {
		return {width: 0, height: 0};
	}
	else if (childAspectWidth === 0) {
		return {width: 0, height: parentHeight};
	}
	else if (childAspectHeight === 0){
		return {width: parentWidth, height: 0};
	}
	else if (parentWidth <= 0 || parentHeight <= 0) {
		return {width: 0, height: 0};
	}

	// else:
	//  childAspectWidth & Height > 0
	//  parentWidth & Height      > 0

	var width, height;
	var childAspectRatio = childAspectWidth / childAspectHeight;
	var parentAspectRatio = parentWidth / parentHeight;

	if (childAspectRatio === parentAspectRatio) {
		width = parentWidth;
		height = parentHeight;
	}
	else if (childAspectRatio < parentAspectRatio) {
		var scale = Math.floor(parentHeight / childAspectHeight);

		width = scale * childAspectWidth;
		height = scale * childAspectHeight;
	}
	else if (childAspectRatio > parentAspectRatio) {
		var scale = Math.floor(parentWidth / childAspectWidth);

		width = scale * childAspectWidth;
		height = scale * childAspectHeight;
	}

	return {width: width, height: height};
}

module.exports = Util;
