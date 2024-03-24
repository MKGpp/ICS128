const giveMyLocationPlease = () => {
    let secondLat = localStorage.getItem("myLatitude");
    let secondLong = localStorage.getItem("myLongitude");

    document.getElementById('lat').innerHTML = secondLat;
    document.getElementById('long').innerHTML = secondLong;
}
let lat = 48.427236;
let long = -123.366330;

let map = L.map('map',{zoomControl: false}).setView([lat, long], 12);

L.control.scale().addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);