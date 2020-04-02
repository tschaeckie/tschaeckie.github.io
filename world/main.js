let startLayer = L.tileLayer.provider("OpenTopoMap");


let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

L.control.layers({
    "OpenTopoMap" : startLayer,
    "OpenStreetMap.Mapnik" : L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Stadia.AlidadeSmooth" : L.tileLayer.provider("Stadia.AlidadeSmooth"),
    "Thunderforest.TransportDark" : L.tileLayer.provider("Thunderforest.TransportDark"),
    "Stamen.Watercolor" : L.tileLayer.provider("Stamen.Watercolor"),
    "Esri.WorldTerrain" : L.tileLayer.provider("Esri.WorldTerrain"),
    "OpenStreetMap.HOT" : L.tileLayer.provider("OpenStreetMap.HOT"),

}).addTo(map)
//5-10 Layer hinzufügen https://leaflet-extras.github.io/leaflet-providers/preview/