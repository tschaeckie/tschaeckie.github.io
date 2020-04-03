
//nachdem Grundkarte zugefügt wurde, startLayer festlegen: OpenTopoMap
let startLayer = L.tileLayer.provider("Esri.WorldTopoMap");

//Grundkarte hinzufügen
let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
       //gelöscht bei layer Control: L.tileLayer.provider("OpenTopoMap")
       startLayer
    ]
});

//Layer Control
//andere Layer unter: https://leaflet-extras.github.io/leaflet-providers/preview/
//Google: Leaflet Providers: https://github.com/leaflet-extras/leaflet-providers
//Providers Previewed
L.control.layers({
    "OpenTopoMap" :  L.tileLayer.provider("OpenTopoMap"),
    "OpenStreetMap.Mapnik" : L.tileLayer.provider("OpenStreetMap.Mapnik"),




}).addTo(map)