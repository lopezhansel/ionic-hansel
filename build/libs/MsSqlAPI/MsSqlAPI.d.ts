/// <reference types="bluebird" />
import * as sql from 'mssql';
import * as Bluebird from 'bluebird';
import * as I from '../../interfaces';
declare module 'mssql' {
    type Promise<T> = Bluebird<T>;
}
export declare class MsSqlAPI {
    static config: I.MsSqlApi.config;
    static setConfig(conf: I.MsSqlApi.config, useTrusted?: boolean): void;
    static checkConfig(): void;
    static openConnection(): Bluebird<sql.Connection>;
    static query(query: any): Bluebird<void>;
}
