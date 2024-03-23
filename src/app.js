import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import appRouter from './routes/index.js';
import { connectDB } from './config/connectDB.js';
import handlebars from 'express-handlebars';
import __dirname, { uploader } from './utils.js';
import viewsRouter from './routes/views.router.js';
import { initializeSocket } from './utils/initializeSocket .js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(cookieParser(''));
initializePassport()

app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);

app.post('/upload', uploader.single('myFile'), (req, res) => {
	res.send('imagen subida');
});

app.use(appRouter);

const httpServer = app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Escuchando en el puerto ${PORT}`);
});

initializeSocket(httpServer);
