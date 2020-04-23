let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

let sightGroup = L.markerClusterGroup().addTo(map);
let walkGroup = L.featureGroup().addTo(map);
let heritageGroup = L.featureGroup().addTo(map);

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Stadtspaziergang (Punkte)": sightGroup,
    "Wanderungen": walkGroup,
    "Weltkulturerbe": heritageGroup

}).addTo(map);


let sightUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD%20&srsName=EPSG:4326&outputFormat=json"

let sights = L.geoJson.ajax(sightUrl, {
    pointToLayer: function (point, latlng) {
        let icon = L.icon({
            iconUrl: 'icons/sight.svg',
            iconSize: [32, 32]
        });
        let marker = L.marker(latlng, {
            icon: icon
        });
        //console.log("Point", point);
        marker.bindPopup(`<h3>${point.properties.NAME}</h3>
        <p><a target="links" href="${point.properties.WEITERE_INF}">Link</a></p>
        `);
        return marker;
        // Bsp. Circle Marker: return L.circleMarker(latlng, { color: "red", radius: 8});
    }
});

sights.on("data:loaded", function () {
    sightGroup.addLayer(sights);
    //console.log('data loaded!');
    map.fitBounds(sightGroup.getBounds());
});


//Linien

let wandern = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WANDERWEGEOGD&srsName=EPSG:4326&outputFormat=json"

L.geoJson.ajax(wandern, {
    style: function (feature) {
        if (feature.properties.KATEGORIE === "rundumadum") {
            return {
                //schwarz gepunktet nicht gefunden
                color: "brown",
                weight: 2
            };
        } else {
            return {
                color: "black",
                weight: 2,
                dashArray: 5
            };
        }

        // return {
        //     color: "black",
        //     weight: 3,
        //     //gestrichelte Linien
        //     dashArray: 5,
        // };

    },
    //Popup Bezeichnung des Weges; im Feature nur den Bezeichnungstext gefunden, wo ist der NAME???
    onEachFeature: function (feature, layer) {
        console.log("Feature: ", feature);
        layer.bindPopup(`<h3>${feature.properties.BEZ_TEXT}</h3>
        `);
    }
}).addTo(map);


//Flächen
// Versuch Farbflächen der Zonen zu unterscheiden ausgeblendet

let heritage = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WELTKULTERBEOGD&srsName=EPSG:4326&outputFormat=json"

L.geoJson.ajax(heritage, {
    style: function (feature) {
        if (feature.properties.TYP === "1") {
            return {
                //warum Innere Stadt Kernzone geld umrahmt?
                color: "red",
                fillOpacity: 0.8
            };
        } else if (feature.properties.TYP === "2") {
            return {
                color: "yellow",
                fillOpacity: 0.3,
            };
        }
        // return {
        //     color: "salmon",
        //     fillOpacity: 0.3
        // };

    },
    onEachFeature: function (feature, layer) {
        //console.log("Feature: ", feature);
        layer.bindPopup(`<h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.INFO}</p>
        `);
    }
}).addTo(map);