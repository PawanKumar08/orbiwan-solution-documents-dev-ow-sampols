import * as express from 'express';
import {ServerConfig} from './config';
import {ServerRoutes} from './routes';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import {ServerLogging} from './logging';
import {ILogging, Request} from './server.if';
import * as morgan from 'morgan';
import * as fs from 'fs';

/**
 * Class to prepare Express Server app.
 */
export class ExpressServerForWebsite {
    static logging: ILogging = new ServerLogging('ServerConfig');
    static actionLogging: ILogging = new ServerLogging('ACTION');
    constructor() {
        ExpressServerForWebsite.logging.log("Starting server");
        const app = express();
        app.disable("x-powered-by"); // security compliance, hiding what tech is used to develop the app

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(express.static(path.join(__dirname, './public')));
        // cookie parsing
        app.use(cookieParser());

        // views
        app.set('views', __dirname + '/views');
        // view engine
        app.set('view engine', 'ejs');
        app.engine('html', require('ejs').renderFile);
        // trusting first proxy, may be because it is behind nginx?? 
        app.set('trust proxy', 1);
        // // setting up the session
        app.use(session({
            secret: '!THIS_@#IS_@#$FAS_MY_SPECIAL_SECRET_@$%234%^@^$%',
            key: 'server',
            resave: true,
            saveUninitialized: true,
            cookie: { 
                secure: true,
                maxAge: 60 * 60 * 1000
            }
        }));

        if (!fs.existsSync(__dirname + '/logs')) {
            fs.mkdirSync(__dirname + '/logs');
        }
        // create a write stream (in append mode)
        const accessLogStream = fs.createWriteStream(path.join(__dirname + '/logs/', 'access.log'), {flags: 'a'})

        // setup the logger
        app.use(morgan(
            '[:date[clf]] :remote-addr - :remote-user  HTTP/:http-version "Ref :referrer" ":user-agent" :method :url :status :response-time ms'
            , {stream: accessLogStream}));

        // all user action logging.
        app.use(function(req: Request, res, next){
            const session_: any = req.session;
            if (session_ && session_.customer_id) {
                ExpressServerForWebsite.actionLogging.log(`[CustId: ${session_.customer_id}] ${req.method} ${req.path} `);
            }
            next();
        });

        new ServerRoutes(app);

        // staring to listen now..
        app.listen(ServerConfig.serverConfig.port, function() {
            ExpressServerForWebsite.logging.log(`Server started at ${ServerConfig.serverConfig.port}`);
        });
    }
}


