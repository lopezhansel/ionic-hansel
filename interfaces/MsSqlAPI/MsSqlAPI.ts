export declare module MsSqlApi {
    export type msSqlDriver = 'msnodesqlv8'

    export interface config {
        server: string;
        database: string;
        user?: string;
        password?: string;
        port?: number,
        driver?: msSqlDriver,
        options?: any
    }
}