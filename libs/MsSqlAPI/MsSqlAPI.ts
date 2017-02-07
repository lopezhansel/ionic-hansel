import * as sql from 'mssql'
import * as Bluebird from 'bluebird'
import * as I from '../../interfaces'

declare module 'mssql' {
    type Promise<T> = Bluebird<T>
}

export class MsSqlAPI {
    static config: I.MsSqlApi.config

    static setConfig(conf: I.MsSqlApi.config, useTrusted?: boolean) {
        MsSqlAPI.config = conf
        conf.port = conf.port || 1433
        if (useTrusted) {
            conf.driver = "msnodesqlv8"
            conf.options = { trustedConnection: true }
        }
    }

    static checkConfig() {
        let cf = MsSqlAPI.config
        if (!cf.user && !cf.password && !cf.driver && !cf.options) {
            throw new Error('You must use SqlAPI.setConfig() to set user and password or pass useTrusted parameter.')
        }
    }

    static openConnection() {
        MsSqlAPI.checkConfig()
        return new sql.Connection(MsSqlAPI.config).connect()
    }

    static query(query) {
        return MsSqlAPI.openConnection()
            .then(connection => {
                return new sql.Request(connection)
                    .query(query)
            })
    }

}
