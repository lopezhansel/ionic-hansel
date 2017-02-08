export declare module MsSqlApi {
    type msSqlDriver = 'msnodesqlv8';
    interface config {
        server: string;
        database: string;
        user?: string;
        password?: string;
        port?: number;
        driver?: msSqlDriver;
        options?: any;
    }
}
