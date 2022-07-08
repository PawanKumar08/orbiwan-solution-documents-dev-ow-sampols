process.env.TZ = 'UTC';

import { ServerConfig } from './config';
import * as cluster from 'cluster';
import { ILogging } from './server.if';
import { ServerLogging } from './logging';
import { Indexer } from './indexer';
import { ExpressServerForWebsite } from './express-server';
import { OwHTMLParser } from './htmlparser';

const logging: ILogging = new ServerLogging('Server');
let isServerStopCmdCalled: boolean = false;

process.on('warning', (warning) => {
    console.warn('********* WARNING ERROR *********');
    console.warn(warning.name); // Print the warning name
    console.warn(warning.message); // Print the warning message
    console.warn(warning.stack); // Print the stack trace
    console.warn('********* WARNING ERROR ENDS *********');
});

require('console-stamp')(console, {
    colors: {
        stamp: 'yellow',
        label: 'white',
        metadata: 'green',
    },
    pattern: 'yyyy-mm-dd HH:MM:ss Z',
});


if (cluster.isMaster) {

    logging.log('Spawning a thread');
    cluster.fork();

    cluster.on('exit', function (worker, code, signal) {
        if (isServerStopCmdCalled) {
            logging.log('worker ' + worker.process.pid + ' stopped');
        } else {
            logging.log('worker ' + worker.process.pid + ' died');

            setTimeout(function () {
                if (isServerStopCmdCalled == false) {
                    logging.log('Restarting process');
                    cluster.fork();
                }
            }, 2000); // wait 3 seconds and restart process
        }
    });

    process.on('SIGINT', async () => {
        isServerStopCmdCalled = true;
        setTimeout(() => {
            logging.log('Agent Master exiting now..');
            process.exit(0);
        }, 100);
    });

} else {

    // initialize the server config
    new ServerConfig();

    // initialize the server for web
    new ExpressServerForWebsite();



    (async () => {
        logging.log("Preparing Scheduler");
        // const scheduler: ServerScheduler = new ServerScheduler();
        // Indexer
        Indexer.processDocumentsForMeiliSearch();
        // Parsing the html files
        // const parser: OwHTMLParser = new OwHTMLParser();
        // parser.scan();
        // parser.saveToFile(ServerConfig.serverConfig.output_json_path);
        // await new OwHTMLParser().scan();
    })();

    process.on('SIGINT', async () => {

        logging.log('[Server][Shutdown] Received SIGINT. Performing cleanups.');
        logging.log('[Server][Shutdown] All cleanup done, exiting now..');

        process.exit(0);
    });
}