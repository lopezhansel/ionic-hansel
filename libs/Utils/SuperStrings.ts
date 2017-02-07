export class SuperStrings {

    static trimHtml(str: string): string {
        var checkIfHTML = /<\/?[\w\s="/.':;#-\/]+>/ig;
        var index = str.search(checkIfHTML);
        if (index != -1) {
            str = str.substring(0, index);
        }
        return str;
    }

    static jsonify(obj: any): string {
        return '<pre>' + JSON.stringify(obj, null, 2) + '</pre>'
    }

}






