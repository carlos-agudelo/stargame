
//Importar modulos
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

//Ruta base de datos mongo
const MONGO_URL = 'mongodb://127.0.0.1:27017/dbstation';

//Declarar aplicación
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL,{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
	throw err;
	process.exit(1);
})
/*
const Usuario = require('./models/Usuario');
const u = new Usuario ({
	email: 'ca@gmail.com',
	password: '123456'
});

u.save()
	.then(() => {
		console.log('guardado')
	})
	.catch((error) => {
		console.log('error')
	})
*/
//Sessiones
app.use(session({
	secret: 'secreto',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore ({
		url: MONGO_URL,
		autoReconnect: true
	})
}));

//Rutas
app.get('/',(req, res) =>{
	req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
	res.send(`Hola! Visitas: ${req.session.cuenta}`);
});

app.listen(3000, () => {
	console.log('Puerto 3000')
});

//https://www.youtube.com/watch?v=a8hmS9ewQRY&index=3&list=PLImOJ2OqvvkBEJBCOL_LMaUdLoi8SkAUI

//https://www.youtube.com/watch?v=CoK8gspmhIQ