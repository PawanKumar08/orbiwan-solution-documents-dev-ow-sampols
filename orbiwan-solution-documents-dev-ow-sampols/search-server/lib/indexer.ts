import { ServerLogging } from "./logging";
import { ILogging } from "./server.if";

import { MeiliSearch } from 'meilisearch';
import { ServerConfig } from "./config";
import { readFileSync } from "fs";

export class Indexer {

    logging: ILogging = new ServerLogging('ServerScheduler');

    constructor(){}

    public static async processDocumentsForMeiliSearch(){
        const fileContent = readFileSync(ServerConfig.serverConfig.output_json_path, 'utf-8');
        const docs = JSON.parse(fileContent);
        console.log(docs.length);
        
        //'http://127.0.0.1:7700'
        const client = new MeiliSearch({ host: ServerConfig.serverConfig.search_server_url, apiKey: ServerConfig.serverConfig.search_provider_key });
        // client.deleteIndex(ServerConfig.serverConfig.search_index_name);
        for(let doc of docs){
            client.index(ServerConfig.serverConfig.search_index_name).addDocuments([doc]).then((res) => {
                console.log(res);
            });
        }
        
    }
}