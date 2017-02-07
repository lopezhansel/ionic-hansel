export class GeoLocation {
    static distanceFrom(lat1: number, long1: number, lat2: number, long2: number): number {
        // Central Subtended Angle Method || Great Circle Method
        // var sanFran = {lat: 37.7833,lon:-122.4167}
        // var denver = {lat : 39.7392,lon : -104.9903}
        if (isNaN(lat1) || isNaN(long1) || isNaN(lat2) || isNaN(long2)) {
            throw new Error('Make sure parameters are numbers');
        }
        var R = 6371 / 1.609344; //Earth Median radius in Kilometers / convert to km to miles
        var φ1 = toRad(lat2)
        var φ2 = toRad(lat1)
        var Δφ = toRad(lat1 - lat2)
        var Δλ = toRad(long1 - long2)

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);// arc length
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = R * c;
        // console.log(distance)
        return distance;

        function toRad(n: number): number {
            return n * Math.PI / 180; // convert degrees to radian
        }
    }

}