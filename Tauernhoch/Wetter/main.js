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
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Nationalpark Hohe Tauern": overlay.borders
}).addTo(map); 


//Aussengrenzen anzeigen in eigenem Layer
let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
//Layer als default anzeigen
overlay.borders.addTo(map);

//console.log (GRENZE)


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