let startLayer = L.tileLayer.provider("OpenTopoMap");


let map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Thunderforest.TransportDark": L.tileLayer.provider("Thunderforest.TransportDark"),
    "Stamen.Watercolor": L.tileLayer.provider("Stamen.Watercolor"),
    "Esri.WorldTerrain": L.tileLayer.provider("Esri.WorldTerrain"),
    "OpenStreetMap.HOT": L.tileLayer.provider("OpenStreetMap.HOT"),
}).addTo(map);
//5-10 Layer hinzufügen https://leaflet-extras.github.io/leaflet-providers/preview/

L.marker([0,0]).addTo(map);

//console.log(CONFIRMED);
for (let i = 1; i < CONFIRMED.length; i++) {
    let row = CONFIRMED[i];
    //console.log(row[2],row[3]);
    let val = row[row.lenth-1];
    let mrk = L.marker([row[2],row[3]]).addTo(map); 
    mrk bindPopup(`${row[0]} ${row[1]}: ${val}`);     
}