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

L.marker([0, 0]).addTo(map);

//console.log(CONFIRMED);
for (let i = 1; i < CONFIRMED.length; i++) {
    let row = CONFIRMED[i];
    //console.log(row[2],row[3]);
    let reg = `${row[0]} ${row[1]}`;
    let lat = row[2];
    let lng = row[3];
    let val = row[row.lenth - 1];
    let mrk = L.marker([lat, lng], {
        radius: (val/2)*0,001
    }).addTo(map);
    //mrk bindPopup(`${reg}: ${val}`);

    //A = r²*PI
    //r² = A/PI
    //r= WURZEL(A/PI)
    let r = Math.squrt(val/Math.PI); 
    let circle = L.circleMarker([lat, lng], {
        radius: r
    }).addTo(map);
    
    circle.bindPopup(`${val}`)
}