import * as fs from 'fs';
import { IConfig, ILogging } from './server.if';
import { ServerLogging } from './logging';
/**
 * Configuration Class which reads the config and prepares config object.
 */
export class ServerConfig {

    private logging: ILogging = new ServerLogging('ServerConfig');
    private configFileName: any = 'search-config.json';
    public static serverConfig: IConfig;

    public static THRESHOLD_DAYS_EXPIRY_DEFAULT = 7;

    constructor() {
        this.readConfig();
    }

    /**
     * Kept private function so that noone else has access to it.
     */
    private readConfig(): void {
        try {
            this.logging.log('Reading the serverConfig');
            const configFromFileContent = fs.readFileSync(this.configFileName, 'utf-8');
            ServerConfig.serverConfig = JSON.parse(configFromFileContent);
        } catch (error) {
            this.logging.log('Error while reading the server config file. Please make sure file exists and has a proper json content.');
            this.logging.log(error.message);
        }
    }

}