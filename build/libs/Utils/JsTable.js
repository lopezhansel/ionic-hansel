"use strict";
var JsTable = (function () {
    function JsTable() {
    }
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
    JsTable.convertIntoHtmlTable = function (anyArray, tableId, tableClassName, linkText) {
        ++JsTable.count;
        if (!anyArray) {
            return null;
        }
        var italic = "<i style=\"color:grey;\">{0}</i>";
        var link = linkText ? "<a href=\"{0}\"> " + linkText + " </a>" : '<a href="{0}">{0}</a>';
        var idMarkup = tableId ? " id=\"" + tableId + "\" " : '';
        var classMarkup = tableClassName ? " class=\"" + tableClassName + "\" " : '';
        var style = (JsTable.count !== 1) ? '' : "table { font-size: 16px; font-family: \"Trebuchet MS\", Arial, Helvetica, sans-serif; border-collapse: collapse; border-spacing: 0; width: 100%; } td, th { border: 1px solid #ddd; text-align: left; padding: 8px; } tr:nth-child(even) { background-color: #f2f2f2 } th { padding-top: 11px; padding-bottom: 11px; background-color: #4c86af; color: white; } table>tbody>tr:hover { background-color: rgba(76, 134, 176, 0.05); }";
        var tbl = "<style>" + style + "</style><table border=\"1\"  cellpadding=\"1\" cellspacing=\"1\"  " + idMarkup + "  " + classMarkup + " >{0}{1}</table>";
        var th = '<thead>{0}</thead>';
        var tb = '<tbody>{0}</tbody>';
        var thRow = '<th>{0}</th>';
        var tdRow = '<td>{0}</td>';
        var tr = '<tr>{0}</tr>';
        var thContents = '';
        var tbContents = '';
        var trContents = '';
        var isStringArray = typeof (anyArray[0]) == 'string';
        var headers;
        // Create table headers from JSON data
        // If JSON data is a simple string array we create a single table header
        if (isStringArray) {
            thContents += JsTable.interpolate(thRow, 'value');
            for (var i = 0; i < anyArray.length; i++) {
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
            for (var i = 0; i < headers.length; i++)
                thContents += JsTable.interpolate(thRow, headers[i]);
            var urlRegExp = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
            var javascriptRegExp = new RegExp(/(^javascript:[\s\S]*;$)/ig);
            for (var i = 0; i < anyArray.length; i++) {
                for (var j = 0; j < headers.length; j++) {
                    var value = anyArray[i][headers[j]];
                    var isUrl = urlRegExp.test(value) || javascriptRegExp.test(value);
                    if (isUrl)
                        tbContents += JsTable.interpolate(tdRow, JsTable.interpolate(link, value));
                    else {
                        if (value) {
                            if (typeof (value) == 'object') {
                                //for supporting nested tables
                                tbContents += JsTable.interpolate(tdRow, JsTable.convertIntoHtmlTable([value]));
                            }
                            else {
                                tbContents += JsTable.interpolate(tdRow, value);
                            }
                        }
                        else {
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
    };
    /**
     * JavaScript format string function
     *
     * @param str ex: `My Name is {0}`
     */
    JsTable.interpolate = function (str, val1, val2) {
        var args = [val1, val2];
        return str.replace(/{(\d+)}/g, function (match, number, other) {
            return (typeof args[number] != 'undefined') ? args[number] : 'n/a';
        });
    };
    ;
    JsTable.getObjectKeys = function (arr) {
        return arr
            .map(function (e) { return Object.keys(e); })
            .reduce(function (output, stringArr) {
            stringArr.forEach(function (str) {
                (output.indexOf(str) < 0) ? output.push(str) : null;
            });
            return output;
        }, []);
    };
    return JsTable;
}());
JsTable.count = 0;
exports.JsTable = JsTable;
//# sourceMappingURL=JsTable.js.map