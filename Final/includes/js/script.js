const vicLat = 48.425864;
const vicLong = -123.365590;

const findUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let myLat = position.coords.latitude;
        let myLong = position.coords.longitude;
        localStorage.setItem("myLatitude", myLat);
        localStorage.setItem("myLongitude", myLong);

        const userLocation = L.marker([myLat, myLong])
            .addTo(map)
            .bindTooltip("You are here!")

        userLocation.setLatLng([myLat, myLong]);
    });
}

findUserLocation();
const myLat = localStorage.getItem("myLatitude");
const myLong = localStorage.getItem("myLongitude");

if (myLat && myLong) {
    map = L.map('map').setView([myLat, myLong], 12);
} else {
    map = L.map('map').setView([vicLat, vicLong], 12);
}

L.control.scale().addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

$(document).ready(function(){
    $.getJSON('../Final/includes/public/fake_flights.json', function(data) {
        $.each(data, function(index, value) {
            let cardHTML = `
                <div class="col-md-3 grid-item mb-3">
                    <div class="card" style="width: 18rem;">
                        <img src="${value.plane_image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${value.type_of_plane}</h5>
                            <p class="card-text">Speed: ${value.speed_kph}kmph</p>
                            <p class="card-text">Max takeoff altitude: ${value.maxTakeOffAlt}</p>
                            <p class="card-text">Cost/km: $${value.price_per_km}</p>
                            <p class="card-text">Seats remaining: ${value.seats_remaining}</p>
                            <p class="card-text">Extra fuel charge: ${value.extraFuelCharge}</p>
                            <a href="#" class="btn btn-primary">Book Flight!</a>
                        </div>
                    </div>
                </div>
            `;
            $('#masonry-grid').append(cardHTML);
        });
        $('#masonry-grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            percentPosition: true
        });
    });
});

fetch('../Final/includes/public/mAirports.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network error could not load json data');
        }
        return response.json();
    })
    .then(data => {

        data.forEach(airport => {
            const coords = airport["Geographic Location"];
            const [latPart, lonPart] = coords.split(' ');

            const latDegrees = parseInt(latPart.slice(0, 2));
            const latMinutes = parseInt(latPart.slice(2, 4));
            const latNS = latPart.slice(4);

            if (lonPart.length === 6) {
                const lonDegrees = parseInt(lonPart.slice(0, 3));
                const lonMinutes = parseInt(lonPart.slice(3, 5));
                const lonEW = lonPart.slice(5);
            } else if (lonPart.length === 5) {
                const lonDegrees = parseInt(lonPart.slice(0, 2));
                const lonMinutes = parseInt(lonPart.slice(2, 4));
                const lonEW = lonPart.slice(4);
            }
            
            if (latNS.equals("S")) lat = lat - (lat + lat);
            if (lonEW.equals("W")) long = long - (long + long);

        });
    })
    .catch(error => {
        console.error('Error: ', error);
    });

