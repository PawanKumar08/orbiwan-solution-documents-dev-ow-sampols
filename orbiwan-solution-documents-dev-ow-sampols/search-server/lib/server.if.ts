import * as express from 'express';
/**
 * Interface for custom logging
 */
 export interface ILogging {
    log(message: any): void;
    debug(message: any): void;
    warn(message: any): void;
    error(message: any): void;
}

export interface IConfig {
    document_dirs: string[];
    search_server_url: string;
    search_server_type: string | 'meilisearch';
    search_index_name: string | 'doc_search__';
    debug: boolean | false;
    port: number | 7000;
    search_provider_key: string;
    data_file: string;
    output_json_path: string;
}

export const ENDPOINTS = {
    SEARCH : '/content-search'
}

/**
 * Extending the request to add session into it.
 */
 export interface Request extends express.Request { session: [any]; }
