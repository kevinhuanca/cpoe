import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.send('Hello World');
})

app.listen(3000, () => console.log('Servidor iniciado en http://localhost:3000'));