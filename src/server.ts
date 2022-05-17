import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import compression from 'compression'

import apiRoutes from './routes/index.routes'

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.configure();
        this.routes(); 
    }

    configure() {
        // Database
        const DATABASE = 'mongodb://localhost/menuapi';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(process.env.MONGODB_URL || DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(db => console.log("Database connected!"))
        .catch(db => console.error("Error connecting to Database"));
        //Port
        this.app.set('port', process.env.PORT  || 3000);
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(compression());
    }

    routes() {
        this.app.use(apiRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listening on port', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();