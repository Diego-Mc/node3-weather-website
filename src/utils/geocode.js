const request = require('request');

const geocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		location
	)}.json?access_token=pk.eyJ1IjoicHJvamtkMSIsImEiOiJja2h2b3I1NzIxOWIxMnJwaXF5ZjVsMmljIn0.0XZ7XId0HLs1QRmpiq9-6w&limit=1`;
	request({ url, json: true }, (error, { body: geoCodeData } = {}) => {
		if (error) {
			callback('Unable to connect to geocode API', undefined);
		} else if (geoCodeData.features.length === 0) {
			callback("Can't find the specified location.", undefined);
		} else {
			callback(undefined, {
				long: geoCodeData.features[0].center[0],
				lat: geoCodeData.features[0].center[1],
				location: geoCodeData.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
