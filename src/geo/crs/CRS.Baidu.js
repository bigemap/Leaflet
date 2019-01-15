import {Earth} from './CRS.Earth';
import {BaiduMercator} from '../projection/Projection.BaiduMercator';
import {toTransformation} from '../../geometry/Transformation';
import * as Util from '../../core/Util';

/*
 * @namespace CRS
 * @crs L.CRS.Baidu
 *
 * The CRS for Baidu map.
 */

export var Baidu = Util.extend({}, Earth, {
	code: 'baidu',
	wrapLng: undefined,
	projection: BaiduMercator,
	transformation: toTransformation(1, 0, -1, 0),
	_scales: (function () {
		var scales = [];
		for (var i = 20; i >= 0; i--) {
			scales[i] = 1 / Math.pow(2, (18 - i));
		}
		return scales;
	})(),

	scale: function (zoom) {
		var iZoom = Math.floor(zoom),
		baseScale,
		nextScale,
		scaleDiff,
		zDiff;
		if (zoom === iZoom) {
			return this._scales[zoom];
		} else {
			// Non-integer zoom, interpolate
			baseScale = this._scales[iZoom];
			nextScale = this._scales[iZoom + 1];
			scaleDiff = nextScale - baseScale;
			zDiff = (zoom - iZoom);
			return baseScale + scaleDiff * zDiff;
		}
	},

	zoom: function (scale) {
		// Find closest number in this._scales, down
		var downScale = this._closestElement(this._scales, scale),
		downZoom = this._scales.indexOf(downScale),
		nextScale,
		nextZoom,
		scaleDiff;
		// Check if scale is downScale => return array index
		if (scale === downScale) {
			return downZoom;
		}
		if (downScale === undefined) {
			return -Infinity;
		}
		// Interpolate
		nextZoom = downZoom + 1;
		nextScale = this._scales[nextZoom];
		if (nextScale === undefined) {
			return Infinity;
		}
		scaleDiff = nextScale - downScale;
		return (scale - downScale) / scaleDiff + downZoom;
	},

	/* Get the closest lowest element in an array */
	_closestElement: function (array, element) {
		var low;
		for (var i = array.length; i--;) {
			if (array[i] <= element && (low === undefined || low < array[i])) {
				low = array[i];
			}
		}
		return low;
	}
});
