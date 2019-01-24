
//Importar modulos
const express = require('express');
const session = require('express-session');

//Declarar aplicación
const app = express();

//Sessiones
app.use(session({
	secret: 'secreto',
	resave: true,
	saveUninitialized: true
}));

//Rutas
app.get('/',(req, res) =>{
	req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
	res.send(`Hola! Visitas: ${req.session.cuenta}`);
});

app.listen(3000, () => {
	console.log('Puerto 3000')
});

https://www.youtube.com/watch?v=a8hmS9ewQRY&index=3&list=PLImOJ2OqvvkBEJBCOL_LMaUdLoi8SkAUI

https://www.youtube.com/watch?v=CoK8gspmhIQ