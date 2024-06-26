import express from 'express';
import session from 'express-session';
import { accesoRouter } from './routes/usuario.js';
import { prescripcionesRouter } from './routes/prescripcion.js';
import { medicamentosRouter } from './routes/medicamento.js';
import { pacientesRouter } from './routes/paciente.js';
import { profesionalesRouter } from './routes/profesional.js';
import { prestacionesRouter } from './routes/prestacion.js';

const app = express();

app.use(session({
   secret: '123',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false }
}));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => res.redirect('/acceso'));

app.use('/acceso', accesoRouter);
app.use('/prescripciones', prescripcionesRouter);
app.use('/medicamentos', medicamentosRouter);
app.use('/pacientes', pacientesRouter);
app.use('/profesionales', profesionalesRouter);
app.use('/prestaciones', prestacionesRouter);

app.get('*', (req, res) => res.status(404).render('404'));

app.listen(3000, () => console.log('Servidor iniciado en http://localhost:3000'));