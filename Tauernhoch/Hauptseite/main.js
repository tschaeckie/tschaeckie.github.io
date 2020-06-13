let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.17971944, 12.181495],
    zoom: 11,
    layers: [
        startLayer
    ]
});

let bikekGroup = L.featureGroup().addTo(map);

let overlay = {
    borders: L.featureGroup(),
    ebikes: L.featureGroup(),
}


L.control.layers({
    "BasemapAT": startLayer,
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Nationalpark Hohe Tauern": overlay.borders,
     "E-Bike Routen": overlay.ebikes
}).addTo(map);

let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
overlay.borders.addTo(map);



let radln = L.geoJSON(EBIKE).addTo(overlay.ebikes);
overlay.ebikes.addTo(map);
// console.log(GRENZE);
// console.log(radln);

// let ebike = EBIKE;

// L.geoJson.ajax(ebike, {
//     style: function (feature) {
//         if (feature.properties.FID == "1") {
//             return {
//                 color: "black",
//                 weight: 2,
//                 dashArray: "15 5"
//             };
//         } else {
//             return {
//                 color: "black",
//                 weight: 2,
//                 dashArray: "1 5"
//             };
//         }
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(`<p>${feature.properties.BEZ_TEXT}</p>`);
//     }
// }).addTo(Ma);