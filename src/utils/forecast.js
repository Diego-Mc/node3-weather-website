const request = require('request');

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=991597dc088920f352fc70541261f155&query=${lat},${long}&units=f`;
	request({ url, json: true }, (error, { body: weatherData }) => {
		if (error) {
			callback('Unable to connect to weather API.', undefined);
		} else if (weatherData.error) {
			callback('Invalid information.', undefined);
		} else {
			const currForecast = weatherData.current;
			callback(
				undefined,
				`${currForecast.weather_descriptions[0]}. It is currently ${currForecast.temperature} degrees out. It feels like ${currForecast.feelslike} degrees out. wind speed is ${currForecast.wind_speed} knots.`
			);
		}
	});
};

module.exports = forecast;
