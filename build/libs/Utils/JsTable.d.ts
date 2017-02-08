export declare class JsTable {
    static count: number;
    /**
     * Convert a Javascript Object array or String array to an HTML table
     * Original Author: Afshin Mehrabani.
     * Improved by: Hansel Lopez
     *
     * JSON data samples that should be parsed and then can be converted to an HTML table
     *   +  let objectArray = '[{"Total":"34","Version":"1.0.4","Office":"New York"},{"Total":"67","Version":"1.1.0","Office":"Paris"}]';
     *   +  let stringArray = '["New York","Berlin","Paris","Moscow"]';
     *   +  let nestedTable = '[{ key1: "val1", key2: "val2", key3: { tableId: "tblIdNested1", tableClassName: "clsNested", linkText: "Download", data: [{ subkey1: "subval1", subkey2: "subval2", subkey3: "subval3" }] } }]';
     *
     * @param anyArray accepts collections of objects or string
     * @param tableId string Optional table id
     * @param tableClassName string Optional table css class name
     * @param linkText string Optional text replacement for link pattern; http(s)://, ftp://, file:// and javascript:; links are automatically computed
     *
     * @return string Converted to HTML table
     */
    static convertIntoHtmlTable(anyArray: any[], tableId?: string, tableClassName?: string, linkText?: string): string;
    /**
     * JavaScript format string function
     *
     * @param str ex: `My Name is {0}`
     */
    static interpolate(str: string, val1: any, val2?: any): string;
    static getObjectKeys(arr: any[]): string[];
}
