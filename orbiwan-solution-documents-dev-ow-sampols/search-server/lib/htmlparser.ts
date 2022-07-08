import { ServerLogging } from "./logging";
import { ILogging } from "./server.if";

import { MeiliSearch } from 'meilisearch';
import { ServerConfig } from "./config";
import * as fs from "fs";
import * as HTMLParser from 'node-html-parser';


export class OwHTMLParser {

    public static owDocuments = [];

    constructor() {
        this.scan();
    }

    public async scan() {
        await this.scanDirectories();
        // console.log(OwHTMLParser.owDocuments);
    }

    public async saveToFile(filePath) {
        fs.writeFileSync(filePath, JSON.stringify(OwHTMLParser.owDocuments));
    }

    private async scanDirectories() {
        OwHTMLParser.owDocuments = [];
        const filesToScan = [];
        for (let path of ServerConfig.serverConfig.document_dirs) {
            const files = fs.readdirSync(path);
            for (let file of files) {
                if (file.endsWith('.html') || file.endsWith('.htm')) {
                    filesToScan.push(path + '/' + file);
                    this.scanFile(path, file);
                }
            }
        }
        // console.log(filesToScan);
        return filesToScan;
    }

    /**
     * 
     * 
     * {
        "objectID": "getting-started-add-gateway",
        "hierarchy_lvl0": "Documentation",
        "hierarchy_lvl1": "Getting Started",
        "hierarchy_lvl2": "Add Gateway",
        "content": "In order to register your gateway(s) on the applicable OrbiWAN instance, you can proceed with the following simple steps: Navigate to Gateways menu –> Add Gateways.Enter the Gateway name and Select the model.Copy the command provide in Installation box to provision the gateway.Login to the gateway using SSH and paste the copied command in the gateway shell.This command will download the Gateway Software and install on the Gateway.Once the Software is installed, Reboot the gateway. You can also watch the video to see the gateway registration process in action: Once the gateway reboots it will come online in around 1-2 min, after which you will see the status as OK in the gateways dashboard as shown in the Figure below:",
        "url": "GettingStarted.html",
        "anchor": "add-gateway"
    },
     * 
     * @param path 
     */
    private async scanFile(path: string, fileName: string) {
        // path = '/Users/ravi/Work/Projects/Orbiwise/code/orbiwan-solution-documents/ow-resources-ejs-like/_site';
        // fileName = 'GettingStarted.html'
        const fileContent = fs.readFileSync(path + '/' + fileName, 'utf-8');
        const root = HTMLParser.parse(fileContent, {
            blockTextElements: {
                script: true,	// keep text content when parsing
                noscript: true,	// keep text content when parsing
                style: true,		// keep text content when parsing
                pre: true			// keep text content when parsing
            }
        });
        const h1 = root.querySelector('h1');
        if (h1) {
            const id = root.querySelector('h1').id;
            const title = root.querySelector('h1').textContent;
            const sectionHeadingElements = root.querySelectorAll('h2');

            for (const sectionHeading of sectionHeadingElements) {
                const id_ = sectionHeading.id;
                const title_ = sectionHeading.textContent;
                const text_ = this.extractSectionContent(sectionHeading, 'h2');
                const obj = {
                    "objectID": id + '-' + id_,
                    "hierarchy_lvl0": "Documentation",
                    "hierarchy_lvl1": title,
                    "hierarchy_lvl2": title_,
                    "content": text_,
                    "url": fileName,
                    "anchor": id_
                };
                OwHTMLParser.owDocuments.push(obj);
            }
        }
    }

    private extractSectionContent(currentElement: HTMLParser.HTMLElement, stopAt: string) {

        let text = '';
        let nextNode: any = currentElement;
        while (true) {
            if (!nextNode) break;
            text += " " + nextNode.textContent;
            nextNode = nextNode.nextElementSibling;
            if (nextNode && nextNode.rawTagName == stopAt) {
                break;
            }
        }
        return text;
    }
}