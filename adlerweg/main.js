let startLayer = L.tileLayer.provider("BasemapAT.terrain");

let map = L.map("map", {
    center: [47.25, 11.5],
    zoom: 9,
    layers: [
        startLayer
    ]
});

let overlay = {
    adlerblicke: L.featureGroup(),
    etappen: L.featureGroup(),
};

L.control.layers({
    "BasemapAT.grau": L.tileLayer.provider("BasemapAT.grau"),
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": startLayer,
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Adlerblicke": overlay.adlerblicke,
    "Adlerweg Etappen": overlay.etappen,
}).addTo(map);

//console.log(ETAPPEN);
//console.log(ADLERBLICKE);


//forof Schleife (gleich auswählen)
for (const blick of ADLERBLICKE) {
    //console.log(blick);
    let mrk = L.marker([blick.lat,blick.lng], {
        icon: L.icon({
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -37],
            iconUrl: "icons/panoramicview.png"
        })
    }).addTo(overlay.adlerblicke);
    //L.marker([blick.lat,blick.lng]).addTo(map);
    mrk.bindPopup(`Standort${blick.standort} (${blick.seehoehe}m)`);
}
overlay.adlerblicke.addTo(map);


//Icon implementieren
//map icons collection: https://mapicons.mapsmarker.com/
//Panoramic View Icon: https://mapicons.mapsmarker.com/markers/tourism/place-to-see/panoramic-view/
//nur iconUrl: Icon hat ursprünglich den Nullpunkt in der linken oberen Ecke!! 
//--> iconSize verändern (wird automatisch auf die Koordinate zentriert)
//Ankerpunkt setzen (durch [0, 0] wird Veränderung der IconSize wieder überschrieben) --> [16, 37]
//Popup soll erst oberhalb des Icons beginnen: popupAnchor

//leaflet plugin von mpetazzoni und vorgeschlagenes cdnjs (https://cdnjs.com/libraries/leaflet-gpx) implementieren: https://github.com/mpetazzoni/leaflet-gpx
let gpx = new L.GPX("gpx/AdlerwegEtappe01.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'icons/number_1.png',
        endIconUrl: 'icons/finish.png',
        shadowUrl: null,
        iconSize: [32, 37],
        iconAnchor: [16, 37],
        popupAnchor: [0, -37],
      },
    polyline_options: {
        color: 'black',
        dashArray: [2, 5]
      }
});

gpx.on("loaded", function(evt) {
    map.fitBounds(evt.target.getBounds());
}).addTo(overlay.etappen);

overlay.etappen.addTo(map);

//Farbe von map icons events (rot) kopieren: #c03639
//Icon: Finish von Sports: Rote Farbe einfügen und bestätigen
//Numbers&Letters: Nummer 1 speichern (restliche Nummern von OLAT bekommen)
