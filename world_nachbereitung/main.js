
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
    "Esri.WorldTopoMap": startLayer,
    "OpenTopoMap" :  L.tileLayer.provider("OpenTopoMap"),
    "OpenStreetMap.Mapnik" : L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri.NatGeoWorldMap" : L.tileLayer.provider("Esri.NatGeoWorldMap"),
    "OpenMapSurfer.Roads" :  L.tileLayer.provider("OpenMapSurfer.Roads"),
    "Stamen.Watercolor" :  L.tileLayer.provider("Stamen.Watercolor"),
    "NASAGIBS.ViirsEarthAtNight2012" :  L.tileLayer.provider("NASAGIBS.ViirsEarthAtNight2012"),
    "NASAGIBS.ModisTerraBands367CR" :  L.tileLayer.provider("NASAGIBS.ModisTerraBands367CR"),
}).addTo(map)