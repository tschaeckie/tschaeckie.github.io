
let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.0748663672, 12.695247219],
    zoom: 8,
    layers: [
        startLayer
  
    ]
});

let overlay = {
    borders: L.featureGroup(),
    sight:L.featureGroup(),
    wege:L.featureGroup(),
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
    "Points of interest":overlay.sight,
    "Lehrwege des Nationalparks": overlay.wege,
}).addTo(map); 

let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
overlay.borders.addTo(map);

//console.log(SIGHT)

let sight = L.geoJson(SIGHT, {
    pointToLayer: function(point, latlng) {
        let marker = L.marker(latlng);
        console.log("Point", point);
        marker.bindPopup(`<h3>${point.properties.NAME}</h3>
        `);
        return marker;
    }
}).addTo(map);

let wege = L.geoJson(WEGE, {
    pointToLayer: function(point, latlng) {
        let marker = L.marker(latlng);
        console.log("Point", point);
        marker.bindPopup(`<h3>${point.properties.NAME}</h3>
        `);
        return marker;
    }
}).addTo(map);



//overlay.sight.addTo(map);
//
