let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.3, 11.5],
    zoom: 8,
    layers: [
        startLayer
    ]
});

// let overlay = {
    //stations: L.featureGroup(),
// }

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
//}, {
    //"Wetterstationen Tirol": overlay.stations
}).addTo(map);



let aussengrenze = L.geoJSON(GRENZE).addTo(map);

console.log (GRENZE)