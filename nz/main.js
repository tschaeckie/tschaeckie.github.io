//wofür steht die 13 am Ende?
let map = document.querySelector("#map");
var mymap = L.map('map').setView([-36.860055, 174.760163], 13);

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);

let marker = L.marker([-36.878091, 174.764383]).addTo(mymap);

marker.bindPopup("<b>Mount Eden Summit</b><br>Gipfel des Mount Eden Vulcano Walks").openPopup();
//gibt es auch ein Popup, das sich öffnet, wenn man mit der Maus darüber fährt??
