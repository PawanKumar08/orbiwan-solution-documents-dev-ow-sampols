import { ENDPOINTS, ILogging, Request } from './server.if';
import { ServerLogging } from './logging';

import { Express, Router, Response } from 'express';
import { ServerConfig } from './config';
import { MeiliSearch } from 'meilisearch';

export class ServerRoutes {
    public router: Router;
    private logging: ILogging = new ServerLogging('Routes');
    constructor(app: Express) {
        this.router = app;

        // enable search
        this.enableSearchEndpoint(ENDPOINTS.SEARCH);
    }

    private enableSearchEndpoint(endpoint_: string) {
        this.router.get(endpoint_, async (req: Request, res) => {
            const keyword:any = req.query.q;
            console.log(keyword + " from  " + ServerConfig.serverConfig.search_index_name);
            if (keyword && keyword.length > 2) {

                const client = new MeiliSearch({ host: ServerConfig.serverConfig.search_server_url, apiKey: ServerConfig.serverConfig.search_provider_key });
                const results = await client.index(ServerConfig.serverConfig.search_index_name).search(keyword);
                console.log(results)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(results);
                
                res.end();
            }else{
                res.status(200).send("Need more characters");
                res.end();
            }
            
        });
    }
}