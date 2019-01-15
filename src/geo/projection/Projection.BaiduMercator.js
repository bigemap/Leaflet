import {Mercator} from './Projection.Mercator';
import {Bounds} from '../../geometry/Bounds';
import * as Util from '../../core/Util';

/*
 * @namespace Projection
 * @projection L.Projection.BaiduMercator
 *
 * Elliptical Mercator projection — special Mercator projection. Used by the Baidu CRS.
 */

export var BaiduMercator = Util.extend({}, Mercator, {
	R: 6378206,
	R_MINOR: 6356584.314245179,

	bounds: new Bounds([20037508.342789244, -20037508.342789244], [-20037508.342789244, 20037508.342789244]),
});