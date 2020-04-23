let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    layers: [
        startLayer
    ]
});

let overlay = {
    stations: L.featureGroup(),
    temperature: L.featureGroup() 
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Wetterstationen Tirol": overlay.stations,
    "Temperatur (°C)": overlay.temperature
}).addTo(map);

let awsUrl = "https://aws.openweb.cc/stations";

let aws = L.geoJson.ajax(awsUrl, {
     filter: function(feature) {
        //console.log("Feature in filter: ", feature);
        // if (feature.geometry.coordinates[2] > 3000) {
        //     return true;
        // } else {
        //     return false;
        // }
        //return feature.geometry.coordinates[2] > 3000;
        return feature.properties.LT;
    },
    pointToLayer: function (point, latlng) {
        //console.log("point: ", point);
        let marker = L.marker(latlng).bindPopup(`
            <h3>${point.properties.name}</h3>
            <ul>
            <li>Wetterstation: ${point.properties.name}</li>
            <li>Seehöhe: ${point.geometry.coordinates[2]} m ü.A.</li>
            <li>Position: ${point.geometry.coordinates}</li>
            <li>Datum: ${point.properties.date}</li>
            <li>Lufttemperatur: ${point.properties.LT} °C</li>
            <li>Windgeschwindigkeit: ${point.properties.WG} [m/s]</li>
            <li>Relative Luftfeuchte: ${point.properties.RH} %</li>
            <li>Schneehöhe: ${point.properties.HS} cm</li>
            <li><a target="links" href="https://lawine.tirol.gv.at/data/grafiken/1100/standard/tag/${point.properties.plot}.png">Wetterdaten</a></li>
            </ul>
        `);
        return marker;
    }
}).addTo(overlay.stations);

let drawTemperature = function(jsonData) {
    console.log("aus der Funktion", jsonData);
    L.geoJson(jsonData, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`
            })
        }
    }).addTo(overlay.temperature);
};

aws.on("data:loaded", function() {
    //console.log(aws.toGeoJSON());
    drawTemperature(aws.toGeoJSON()); //Aufrufen der Funktion draw.Temperature
    map.fitBounds(overlay.stations.getBounds());

    overlay.temperature.addTo(map);
});