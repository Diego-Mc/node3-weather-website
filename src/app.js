const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Paths for express setup
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup express properties
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup express static rendering directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Diego',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Diego',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help me',
		name: 'Diego',
		message: 'please',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'Please provide an address' });
	}

	geocode(req.query.address, (error, { lat, long, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(lat, long, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({ error: 'please provide a seach term.' });
	}

	console.log(req.query);
	res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help',
		name: 'Diego',
		message: 'Article not found.',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Diego',
		message: 'page not found',
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
