process.env.TZ = 'UTC';
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

import { ServerConfig } from './config';
import { Indexer } from './indexer';
// initialize the server config
new ServerConfig();
// Indexing
Indexer.processDocumentsForMeiliSearch();