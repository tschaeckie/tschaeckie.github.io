let startLayer = L.tileLayer.provider("OpenTopoMap");


let map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

let circleGroup = L.featureGroup().addTo(map);
L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Thunderforest.TransportDark": L.tileLayer.provider("Thunderforest.TransportDark"),
    "Stamen.Watercolor": L.tileLayer.provider("Stamen.Watercolor"),
    "Esri.WorldTerrain": L.tileLayer.provider("Esri.WorldTerrain"),
    "OpenStreetMap.HOT": L.tileLayer.provider("OpenStreetMap.HOT"),
}, {
    "Thematische Darstellung": circleGroup

}).addTo(map);
//5-10 Layer hinzufügen https://leaflet-extras.github.io/leaflet-providers/preview/

let drawCircles = function (dat) {
    let data = CONFIRMED;
    let header = CONFIRMED[0];
    let index = header.length -1;
    let options = document.querySelector("#pulldown").options;
    let value = options[options.selectedIndex].value;
    let label = options[options.selectedIndex].text;
    //console.log(value,label,options);

    if (value === "confirmed") {
        data = CONFIRMED;
    } else if (value === "deaths") {
        data = DEATHS;
    } else {
        data = RECOVERED;
    }

    //Datum & Thema anzeigen
    document.querySelector("#datum").innerHTML = `am ${header[index]} - ${label}`;
    
    circleGroup.clearLayers();

    //console.log(CONFIRMED);
    for (let i = 1; i < data.length; i++) {
        let row = data[i];
        //console.log(row[2],row[3]);
        let reg = `${row[0]} ${row[1]}`;
        let lat = row[2];
        let lng = row[3];
        let val = row[index];
       // let mrk = L.marker([lat, lng], {
       //     radius: (val / 2) * 0,

        //}).addTo(map);
        //mrk.bindPopup(`${reg}: ${val}`);

        //A = r²*PI
        //r² = A/PI
        //r= WURZEL(A/PI)
        let r = Math.sqrt(val / Math.PI);
        let circle = L.circleMarker([lat, lng], {
            radius: r
        }).addTo(circleGroup);
        circle.bindPopup(`${reg}: ${val}`);
    }
};

document.querySelector("#pulldown").onchange = function() {
    drawCircles();
};

drawCircles(CONFIRMED);
//drawCircles(RECOVERED);
//drawCircles(DEATHS);
