// Importa dependencias externas
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const flash = require('express-flash');

// Cria a aplicação Express
const app = express();

// Cria a conexão com o banco de dados
const conn = require('./db/conn');

// Importa models
const Tought = require('./models/Tought');
const User = require('./models/User');

// Importar rotas
const toughtsRoutes = require('./routes/toughtsRoutes');
const authRoutes = require('./routes/authRoutes');

// Importa Controller
const ToughtController = require('./controllers/ToughtController');

//template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());

//session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        }
    })
)

// flash messages
app.use(flash());

//public path
app.use(express.static('public'));

//set session to res
app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

//Routes
app.use('/toughts', toughtsRoutes);
app.use('/', authRoutes);

app.get('/', ToughtController.showToughts);

conn
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log('Erro ao conectar ao banco de dados:', err);
    });