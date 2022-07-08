import { ILogging} from './server.if';
import { ServerLogging } from './logging';
export class ServerScheduler {
    logging: ILogging = new ServerLogging('ServerScheduler');

    constructor() {
        // doing nothing for now.
    }

}