const vicLat = 48.425864;
const vicLong = -123.365590;
let planeIcon = L.icon({
    iconUrl: '../Final/includes/images/airplane.svg',
    iconSize: [15, 15],
    iconAnchor: [10, 10],
    clickable: true,
    zIndexOffset: 1000,
    riseOnHover: true,
    riseOffset: 500,
});
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

async function fetchWeatherData(lat, long) {
    const apiKey = 'a5fa944263c3cb4029171f7b252c65f1';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

const myLat = localStorage.getItem("myLatitude");
const myLong = localStorage.getItem("myLongitude");

if (myLat && myLong) {
    map = L.map('map', { worldCopyJump: true }).setView([myLat, myLong], 12);
} else {
    map = L.map('map', { worldCopyJump: true }).setView([vicLat, vicLong], 12);
}

L.control.scale().addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let selectedAirports = [];
let line;

const clickAirport = async (event) => {
    const lat = event.latlng.lat;
    const long = event.latlng.lng;

    if (selectedAirports.length < 2) {
        selectedAirports.push([lat, long]);

        if (selectedAirports.length === 2) {
            const distance = calcDistance(selectedAirports[0], selectedAirports[1]);

            const [weatherOne, weatherTwo] = await Promise.all([
                fetchWeatherData(selectedAirports[0][0], selectedAirports[0][1]),
                fetchWeatherData(selectedAirports[1][0], selectedAirports[1][1])
            ]);

            const isRainingOne = weatherOne && weatherOne.weather[0].description.toLowerCase().includes('rain');
            const isRainingTwo = weatherTwo && weatherTwo.weather[0].description.toLowerCase().includes('rain');

            displayFlights(distance, isRainingOne, isRainingTwo);
            $('#flightCatalog').html(`
                 <h1>Selected Flight Distance: ${distance.toFixed(2)}KM</h1>
                 <div class="dropdown d-flex justify-content-end mb-3">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter By...
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item active" type="button">Duration</a></li>
                        <li><a class="dropdown-item" type="button">Total Cost</a></li>
                        <li><a class="dropdown-item" type="button">Plane Type</a></li>
                    </ul>
                 </div>
            `);

            if (line) {
                map.removeLayer(line);
            }
            line = L.polyline(selectedAirports, { color: 'red' }).addTo(map);

            const secondAirportMarker = getMarkerByLatLng(selectedAirports[1]);

            if (secondAirportMarker) {
                const popup = secondAirportMarker.getPopup();
                const popupContent = popup.getContent();

                if (!popupContent.includes('Distance:')) {
                    popup.setContent(popupContent + `<br><b>Distance: ${distance.toFixed(2)} km</b>`);
                    popup.on('remove', () => {
                        const updatedPopupContent = popup.getContent().replace(`<br><b>Distance: ${distance.toFixed(2)} km</b>`, '');
                        popup.setContent(updatedPopupContent);
                    });
                }
            }
            selectedAirports = [];
        }
    } else {
        selectedAirports = [];
        if (line) {
            map.removeLayer(line);
        }
    }
}

fetch('../Final/includes/public/mAirports.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network error could not load json data');
        }
        return response.json();
    })
    .then(data => {

        data.forEach(async airport => {
            const coords = airport["Geographic Location"];
            const [latPart, lonPart] = coords.split(' ');

            const latDegrees = parseInt(latPart.slice(0, 2));
            const latMinutes = parseInt(latPart.slice(2, 4));
            const latNS = latPart.slice(4);

            let lat = latDegrees + latMinutes / 60;
            let long;

            if (latNS === "S") lat = -lat;
            if (lonPart.length === 6) {
                const lonDegrees = parseInt(lonPart.slice(0, 3));
                const lonMinutes = parseInt(lonPart.slice(3, 5));
                const lonEW = lonPart.slice(5);

                long = lonDegrees + lonMinutes / 60;
                if (lonEW === "W") long = -long;
            } else if (lonPart.length === 5) {
                const lonDegrees = parseInt(lonPart.slice(0, 2));
                const lonMinutes = parseInt(lonPart.slice(2, 4));
                const lonEW = lonPart.slice(4);

                long = lonDegrees + lonMinutes / 60;
                if (lonEW === "W") long = -long;
            }
            if (lat !== undefined && long !== undefined) {
                const weatherForAirports = await fetchWeatherData(lat, long);
                if (weatherForAirports) {
                    const temp = weatherForAirports.main.temp;
                    const weatherDesc = weatherForAirports.weather[0].description;

                    const marker = L.marker([lat, long], {icon: planeIcon}).addTo(map);
                    marker.bindPopup(`
                        <b>${airport["Airport Name"]}</b><br>
                        ${airport["City Name"]}, ${airport["Country"]}<br>
                        Temperature: ${temp}°C<br>Weather: ${weatherDesc}`);
                    marker.on('click', clickAirport)
                }
            } else {
                console.error(`Invalid coordinates for airport: ${airport["Airport Name"]}`);
            }
        });
    })
    .catch(error => {
        console.error('Error: ', error);
    });

const calcDistance = (airportOne, airportTwo) => {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    let lon1 = airportOne[1];
    let lon2 = airportTwo[1];
    let lat1 = airportOne[0];
    let lat2 = airportTwo[0];

    let R = 6371;

    let x1 = lat2 - lat1;
    let dLat = toRad(x1);
    let x2 = lon2 - lon1;
    let dLon = toRad(x2);
    let a = Math.sin(dLat /2) * Math.sin(dLat / 2) +
                     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                     Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

const displayFlights = (distance, isRainingOne, isRainingTwo) => {
    $('#masonry-grid').empty();
    $.getJSON('../Final/includes/public/fake_flights.json', (data) => {
        $.each(data, function(index, value) {
            let totalCost = distance * value.price_per_km;

            if (isRainingOne || isRainingTwo) {
                totalCost *= value.extraFuelCharge;
            }
            let cardHTML = `
            <div class="col-md-3 grid-item mb-3">
                <div class="card" style="width: 18rem;">
                    <img src="${value.plane_image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${value.type_of_plane}</h5>
                        <p class="card-text">Speed: ${value.speed_kph}kmph</p>
                        <p class="card-text">Max altitude: ${value.maxTakeOffAlt}</p>
                        <p class="card-text">Cost/km: $${value.price_per_km}</p>
                        <p class="card-text">Seats remaining: ${value.seats_remaining}</p>
                        <p class="card-text">Extra fuel charge: ${value.extraFuelCharge}</p>
                        <p class="card-text">Duration of flight: ${calcTime(distance, value.speed_kph)}</p>
                        <p class="card-text"><strong>Total cost to fly: $${totalCost.toFixed(0)}</strong></p>
                        <a type="button" onclick="addFlightToCart(${totalCost})" class="btn btn-primary">Book Flight!</a>
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
}

const calcTime = (distance, speed) => {
    const durationToCalc = (distance / speed) * 60;

    if (durationToCalc > 60) {
        const hrs = Math.floor(durationToCalc / 60);
        const min = Math.round(durationToCalc % 60);

        const hrsAsString = hrs > 0 ? `${hrs} Hours` : '';
        const minAsString = min > 0 ? `${min} Min` : '';

        return `${hrsAsString} ${minAsString}`;
    } else {
        const minAsString = Math.round(durationToCalc);
        return `${minAsString} Min`;
    }
}

let totalCost = 0;
let cart = [];
const addFlightToCart = (costOfFlight) => {
    totalCost += parseFloat(costOfFlight.toFixed(0));
    cart.push(parseFloat(costOfFlight.toFixed(0)));

    $('#emptyCart').remove();
    $('#cart').append(`
        <p>Flight added: $${Math.round(costOfFlight)}
            <span class="float-end">
                <button type="button" class="btn-close" onclick="clearItem(${cart.length - 1})"></button>
            </span>
        </p>
    `);
    let total = $('#total');
    total.html(`Cart Total: $${Math.round(totalCost)}`);
}

const clearItem = (flight) => {
    totalCost -= parseFloat(cart[Math.round(flight)]);
    cart.splice(flight, 1);
    $('#cart').empty();
    cart.forEach(costOfFlight => {
        $('#cart').append(`
            <p>Flight added: $${Math.round(costOfFlight)}
                <span class="float-end">
                    <button type="button" class="btn-close" onclick="clearItem(${cart.indexOf(costOfFlight)})"></button>
                </span>
            </p>
        `);
    });
    let total = $('#total');
    total.html(`Cart Total: $${Math.round(totalCost)}`);
}

const getMarkerByLatLng = (latLng) => {
    const layers = map._layers;
    let marker = null;
    Object.keys(layers).forEach((key) => {
        const layer = layers[key];
        if (layer instanceof L.Marker && layer.getLatLng().equals(latLng)) {
            marker = layer;
        }
    });
    return marker;
};

$('#clearCart').on('click', () => {
    totalCost = 0;
    $('#cart').html(``);
    $('#total').html('Cart Total: $0');
});
