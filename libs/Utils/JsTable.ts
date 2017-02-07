export class JsTable {
    static count = 0
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
    static convertIntoHtmlTable(anyArray: any[], tableId?: string, tableClassName?: string, linkText?: string): string {
        ++JsTable.count
        if (!anyArray) {
            return null;
        }
        const italic = `<i style="color:grey;">{0}</i>`;
        const link = linkText ? `<a href="{0}"> ${linkText} </a>` : '<a href="{0}">{0}</a>';
        const idMarkup = tableId ? ` id="${tableId}" ` : '';
        const classMarkup = tableClassName ? ` class="${tableClassName}" ` : '';
        const style = (JsTable.count !== 1) ? '' : `table { font-size: 16px; font-family: "Trebuchet MS", Arial, Helvetica, sans-serif; border-collapse: collapse; border-spacing: 0; width: 100%; } td, th { border: 1px solid #ddd; text-align: left; padding: 8px; } tr:nth-child(even) { background-color: #f2f2f2 } th { padding-top: 11px; padding-bottom: 11px; background-color: #4c86af; color: white; } table>tbody>tr:hover { background-color: rgba(76, 134, 176, 0.05); }`;
        let tbl = `<style>${style}</style><table border="1"  cellpadding="1" cellspacing="1"  ${idMarkup}  ${classMarkup} >{0}{1}</table>`;
        let th = '<thead>{0}</thead>';
        let tb = '<tbody>{0}</tbody>';
        let thRow = '<th>{0}</th>';
        let tdRow = '<td>{0}</td>';
        let tr = '<tr>{0}</tr>';
        let thContents = '';
        let tbContents = '';
        let trContents = '';


        const isStringArray = typeof (anyArray[0]) == 'string';
        let headers;

        // Create table headers from JSON data
        // If JSON data is a simple string array we create a single table header
        if (isStringArray) {
            thContents += JsTable.interpolate(thRow, 'value');
            for (let i = 0; i < anyArray.length; i++) {
                tbContents += JsTable.interpolate(tdRow, anyArray[i]);
                trContents += JsTable.interpolate(tr, tbContents);
                tbContents = '';
            }
            th = JsTable.interpolate(th, JsTable.interpolate(tr, thContents));
            tb = JsTable.interpolate(tb, trContents);
            tbl = JsTable.interpolate(tbl, th, tb);

            return tbl;
        }

        // If JSON data is an object array, headers are automatically computed
        if (typeof (anyArray[0]) == 'object') {
            headers = JsTable.getObjectKeys(anyArray);

            for (let i = 0; i < headers.length; i++)
                thContents += JsTable.interpolate(thRow, headers[i]);


            const urlRegExp = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
            const javascriptRegExp = new RegExp(/(^javascript:[\s\S]*;$)/ig);

            for (let i = 0; i < anyArray.length; i++) {
                for (let j = 0; j < headers.length; j++) {
                    let value = anyArray[i][headers[j]];

                    let isUrl = urlRegExp.test(value) || javascriptRegExp.test(value);
                    if (isUrl)   // If value is URL we auto-create a link
                        tbContents += JsTable.interpolate(tdRow, JsTable.interpolate(link, value));
                    else {
                        if (value) {
                            if (typeof (value) == 'object') {
                                //for supporting nested tables
                                tbContents += JsTable.interpolate(tdRow, JsTable.convertIntoHtmlTable([value]));
                            } else {
                                tbContents += JsTable.interpolate(tdRow, value);
                            }
                        } else {    // If value == null we format it like PhpMyAdmin NULL values
                            tbContents += JsTable.interpolate(tdRow, JsTable.interpolate(italic, value));
                        }
                    }
                }
                trContents += JsTable.interpolate(tr, tbContents);
                tbContents = '';
            }

            th = JsTable.interpolate(th, JsTable.interpolate(tr, thContents));
            tb = JsTable.interpolate(tb, trContents);
            tbl = JsTable.interpolate(tbl, th, tb);

            return tbl;
        }

    }
    /**
     * JavaScript format string function
     * 
     * @param str ex: `My Name is {0}`
     */
    static interpolate(str: string, val1: any, val2?: any) {
        let args = [val1, val2]
        return str.replace(/{(\d+)}/g, function (match, number, other) {
            return (typeof args[number] != 'undefined') ? args[number] : 'n/a';
        });
    };

    static getObjectKeys(arr: any[]): string[] {
        return arr
            .map(e => Object.keys(e))
            .reduce((output, stringArr) => {
                stringArr.forEach(str => {
                    (output.indexOf(str) < 0) ? output.push(str) : null
                })
                return output
            }, [])
    }

}
