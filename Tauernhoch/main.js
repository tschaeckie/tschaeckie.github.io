let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47, 12.5],
    zoom: 9,
    layers: [
        startLayer
    ]
});

let overlay = {
    borders: L.featureGroup(),
    paths: L.featureGroup(),
    poi: L.featureGroup(),
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Nationalpark Hohe Tauern": overlay.borders,
    "Lehrpfade": overlay.paths,
    "Points of Interest": overlay.poi,
}).addTo(map);


//Aussengrenzen anzeigen in eigenem Layer
let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
//Layer als default anzeigen
overlay.borders.addTo(map);

//console.log (GRENZE)

//let lehr = L.geoJSON(LEHRPFADE).addTo(overlay.paths);

console.log (POINTS);

let pointUrl = "http://www.parcs.at/npht/ogd_data/2018/35462_20180111_155329_NPHT.NPHT_POI_PT.json"

let points = L.geoJson.ajax(pointUrl, {
    pointToLayer: function (point, latlng) {
        let icon = L.icon({
            iconUrl: 'icons/finish.png',
            iconSize: [32, 32]
        });
        let marker = L.marker(latlng, {
            icon: icon
        });
        //console.log("Point", point);
        marker.bindPopup(`<h3>${features.properties.NAME}</h3>
        <p><a target="links" href="${point.properties.WEITERE_INF}">Link</a></p>
        `);
        return marker;
        // Bsp. Circle Marker: return L.circleMarker(latlng, { color: "red", radius: 8});
    }
});

points.on("data:loaded", function () {
    featureGroup.addLayer(points);
    //console.log('data loaded!');
    map.fitBounds(featureGroup.getBounds());
});




// Rainviewer
L.control.rainviewer({
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Play/Stop',
    prevButtonText: '<',
    positionSliderLabelText: "Hour:",
    opacitySliderLabelText: "Opacity:",
    animationInterval: 500,
    opacity: 0.5
}).addTo(map);


//Naturlehrpfade 
//https://gis.tirol.gv.at/ogd/sport_freizeit/NPHT/nphtt_lehrwege_wgs84_geojson_aug16.zip

//Themenwege
//http://www.parcs.at/nphtt/ogd_data/2017/35248_20171214_072304_NPHTT_Themenwege2017.json.zip

//Points of Interest
// http://www.parcs.at/npht/ogd_data/2018/35462_20180111_155329_NPHT.NPHT_POI_PT.json.zip

//ebike
//https://gis.tirol.gv.at/ogd/sport_freizeit/NPHT/nphtt_ebike_wgs84_JSON.zip