const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to log');
		}
	});	

	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	//res.send('<h1>hello express</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home',
		message: 'hello here'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'Aboutpage'
	});
});

app.get('/portefolio', (req, res) => {
	res.render('portefolio.hbs', {
		pageTitle: 'Portefolio'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'somuchwrong...'
	});
});


app.listen(port, () => {
	console.log(`Server is up at port ${port}.`);
});