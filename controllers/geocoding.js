const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = "pk.eyJ1IjoiYmFzYW4iLCJhIjoiY2twOWk5dXNzMGo1MDJvbXBuMm1mYzRtaSJ9.Jx7_c_BVbQCOANk-dFYldA";
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

//choosing event location using mapbox geocoding

module.exports.chooseNewLocation = async (req, res) => {
    let { query } = await req.body
    if (query === '') {   // this code fixes the problem of the error, which is thrown when user tries to pass the empty query
        query = 'Berlin' // on the client side. It is not the most elegant solution, but it is ok for now
    }
    const geoData = await geocoder.forwardGeocode({
        query: query,
        limit: 3,
        language: ['de'],
        bbox: [13.0882097323, 52.3418234221, 13.7606105539, 52.6697240587],
        proximity: [13.404954, 52.520008],

    }).send()
    res.send(geoData.body.features)
}
