const passport = require('passport');
const localStrategy = require('passport-local');
const Usuario = require('../models/Usuario');

passport.serializeUser((usuario, done) => {
	done.(null, usuario._id);
});

passport.deserializeUser((id, done) => {
	Usuario.findById(id, (err, usuario) => {
		done(err, usuario);
	})
})

passport.use(new localStrategy(
	{usernameField: 'email'},
	(email, password, done) => {
		Usuario.findOne({email}, (err, usuario) => {
			if (!usuario) {
				return done(null, false, {mesagge: `Este ${email} no esta registrado`});
			} else {
				Usuario.compararPass(password, (err, sonIguales) => {
					if (sonIguales) {
						return done(null, usuario)
					} else {
						return done(null, false, {mesagge: 'La contraseña no es válida'})
					}
				})
			}
		})
	}
))

exports.estaAutenticado = (req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
	req.status(401).send('Debes loggearte para acceder');
}

