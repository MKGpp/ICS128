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
    const apiKey = '9c76aba6ff79fcbd3854c714b2b241b6';
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

        if (selectedAirports.length === 2 && !areAirportsSame(selectedAirports)) {
            const distance = calcDistance(selectedAirports[0], selectedAirports[1]);

            const isItRaining = await Promise.all([
                fetchWeatherData(selectedAirports[0][0], selectedAirports[0][1]),
                fetchWeatherData(selectedAirports[1][0], selectedAirports[1][1])
            ]);

            const isRaining = isItRaining.some((item) => item.weather[0].description.toLowerCase().includes('rain'));

            displayFlights(distance, isRaining, null);
            $('#flightCatalog').html(`
                 <h1>Selected Flight Distance: ${distance.toFixed(2)}KM</h1>
                 <div class="dropdown d-flex justify-content-end mb-3">
                    <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter By...
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item" id="seats_remaining" onclick="displayFlights(${distance}, ${isRaining}, 'seats_remaining')">Seats Left</a></li>
                        <li><a class="dropdown-item" id="cost" onclick="displayFlights(${distance}, ${isRaining}, 'cost')">Total Cost</a></li>
                        <li><a class="dropdown-item" id="type" onclick="displayFlights(${distance}, ${isRaining}, 'type')">Plane Type</a></li>
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

const areAirportsSame = (airports) => {
    return JSON.stringify(airports[0]) === JSON.stringify(airports[1]);
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
                const marker = L.marker([lat, long], {icon: planeIcon}).addTo(map);
                marker.bindPopup(`
                    <b>${airport["Airport Name"]}</b><br>
                    ${airport["City Name"]}, ${airport["Country"]}<br>
                    `);
                marker.on('click',async () => {
                    const cityName = airport["City Name"];
                    localStorage.setItem('destination', cityName);
                    const weatherForAirports = await fetchWeatherData(lat, long);
                    if (weatherForAirports) {
                        const temp = weatherForAirports.main.temp;
                        const weatherDesc = weatherForAirports.weather[0].description;
                        let popupContent = marker.getPopup().getContent();
                        if (!popupContent.includes('Temperature:') || !popupContent.includes(weatherDesc)) {
                            marker.bindPopup(marker.getPopup().getContent() + `<br>Temperature: ${temp} <br>${weatherDesc}`).openPopup();
                        }
                     }
                    await clickAirport({ latlng: { lat: lat, lng: long } });
                });
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

let flightsArray= [];
const displayFlights = (distance, isRaining, sortBy) => {
    const scrollTop = $(window).scrollTop();
    $('#masonry-grid').html('');
    $.getJSON('../Final/includes/public/fake_flights.json', (data) => {
        
            flightsArray = data;

            if (sortBy === 'seats_remaining') {
                flightsArray.sort((a, b) => a.seats_remaining - b.seats_remaining);
            } else if (sortBy === 'cost') {
                flightsArray.sort((a, b) => calculateTotalCost(distance, a, isRaining) - calculateTotalCost(distance, b, isRaining));
            } else if (sortBy === 'type') {
                flightsArray.sort((a, b) => a.type_of_plane.localeCompare(b.type_of_plane));
            }
        $.each(data, (index, value) => {
            let totalCost = calculateTotalCost(distance, value, isRaining);
            let duration = calcTime(distance, value.speed_kph);

            let cardHTML = `
            <div class="col-md-3 mb-3">
                <div class="card" style="width: 18rem;">
                    <img src="${value.plane_image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${value.type_of_plane}</h5>
                        <p class="card-text">Speed: ${value.speed_kph}kmph</p>
                        <p class="card-text">Max altitude: ${value.maxTakeOffAlt}</p>
                        <p class="card-text">Cost/km: $${value.price_per_km}</p>
                        <p class="card-text">Seats remaining: ${value.seats_remaining}</p>
                        <p class="card-text">Extra fuel charge: ${value.extraFuelCharge}</p>
                        <p class="card-text">Duration of flight: ${duration}</p>
                        <p class="card-text"><strong>Total cost to fly: $${Math.round(totalCost)}</strong></p>
                        <a type="button" onclick="addFlightToCart(${totalCost})" class="btn btn-primary">Book Flight!</a>
                    </div>
                </div>
            </div>
        `;
            $('#masonry-grid').append(cardHTML);
        });
        $(window).scrollTop(scrollTop);
    });
}
const calculateTotalCost = (distance, value, isRaining) => {
    let totalCost = distance * value.price_per_km;
    if (isRaining) {
        totalCost *= value.extraFuelCharge;
    }
    return totalCost;
};

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
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('seats', cart.length);
    localStorage.setItem('total', totalCost);

    $('#emptyCart').remove();
    $('#cart').append(`
        <p>Seat Booked! Cost of seat: $${Math.round(costOfFlight)}
            <span class="float-end">
                <button type="button" class="btn-close" onclick="clearItem(${cart.length - 1})"></button>
            </span>
        </p>
    `);
    $('#seats').html(`Seats Booked: ${cart.length}`)
    $('#total').html(`Cart Total: $${Math.round(totalCost)}`);
}

const clearItem = (flight) => {
    const removedCost = cart[flight];
    totalCost -= parseFloat(removedCost);
    cart.splice(flight, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('seats', cart.length);
    localStorage.setItem('total', totalCost);

    refreshCart();
}

const refreshCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const storedTotal = parseFloat(localStorage.getItem('total')) || 0;
    const storedSeats = localStorage.getItem('seats') || 0;

    cart = storedCart;
    totalCost = storedTotal;
    $('#cart').empty();
    storedCart.forEach((costOfSeat, index) => {
        $('#cart').append(`
            <p>Seat Booked! Cost of seat: $${costOfSeat}
                <span class="float-end">
                    <button type="button" class="btn-close" onclick="clearItem(${index})"></button>
                </span>
            </p>
        `);
    });
    $('#seats').html(`Seats Booked: ${storedSeats}`);
    $('#total').html(`Cart Total: $${Math.round(storedTotal)}`);
}

window.onload = () => {
    localStorage.setItem('fname', '');
    refreshCart();
};
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

const personalValidation = () => {
    try {
        // Regex patterns for validating user information
        let namePattern = /^[A-Za-z]+$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phonePattern = /^(\d{3}[-\s]?){2}\d{4}$/;
        let postalPattern = /^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$|^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/;
        let addressPattern = /^(\d+\s[a-zA-Z\s]+)$/;

        // Get values from inputs
        let fName = $('#fName').val();
        let lName = $('#lName').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let address = $('#address').val();
        let postalCode = $('#postalCode').val();
        let city = $('#city').val();
        let country = $('#country').val();

        // Remove invalid class from all inputs
        $('input').removeClass('is-invalid');
        $('#errorOutput').html('');

        let errorArray = [];

        // Test inputs against regex patterns and apply styling
        if (!namePattern.test(fName)) {
            $('#fName').addClass('is-invalid');
            errorArray.push("Name must be letters only! No Spaces.");
        }
        if (!namePattern.test(lName)) {
            $('#lName').addClass('is-invalid');
            errorArray.push("Name must be letters only! No Spaces.");
        }
        if (!emailPattern.test(email)) {
            $('#email').addClass('is-invalid');
            errorArray.push("Email Address Invalid! Format is \"sampleemail@email.com\"");
        }
        if (!phonePattern.test(phone)) {
            $('#phone').addClass('is-invalid');
            errorArray.push("Phone Number Invalid! Must be 000-000-0000 or 000 000 0000 or 0000000000!");
        }
        if (!addressPattern.test(address)) {
            $('#address').addClass('is-invalid');
            errorArray.push("Address Invalid! Format is \"123 Main St\"");
        }
        if (!postalPattern.test(postalCode)) {
            $('#postalCode').addClass('is-invalid');
            errorArray.push("Postal Code Invalid! Must be A1A 1A1 or A1A1A1!");
        }
        if (!namePattern.test(city)) {
            $('#city').addClass('is-invalid');
            errorArray.push("Invalid City!");
        }
        if (!namePattern.test(country)) {
            $('#country').addClass('is-invalid');
            errorArray.push("Invalid Country!");
        }

        if (errorArray.length > 0) {
            $('#errorOutput').html(`<ul>${errorArray.map(error => `<li>${error}</li>`).join('')}</ul>`);
            return;
        }
        localStorage.setItem('fname', fName);
        localStorage.setItem('email', email);
        return fName;
    } catch (e) {
        $('#errorOutput').html(`${e}`);
    }
}

const paymentConfirmation = () => {
    try {
        let ccPattern = /^\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}$/;
        let expPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        let cvcPattern = /^\d{3}$/;

        let ccNum = $('#ccNumber').val();
        let expDate = $('#expDate').val();
        let cvc = $('#cvc').val();

        $('input').removeClass('is-invalid');
        $('#errorOutput').html('');

        let errorArray = [];

        if (!ccPattern.test(ccNum)) {
            $('#ccNumber').addClass('is-invalid');
            errorArray.push("Invalid Credit Card Number!")
        }
        if (!expPattern.test(expDate)) {
            $('#expDate').addClass('is-invalid');
            errorArray.push("Invalid Expiry Date! Format is mm/yy")
        }
        if (!cvcPattern.test(cvc)) {
            $('#cvc').addClass('is-invalid');
            errorArray.push("Invalid CVC Number! Must be a 3 digit number!")
        }
        if (errorArray.length > 0) {
            $('#ccError').html(`<ul>${errorArray.map(error => `<li>${error}</li>`).join('')}</ul>`);
        }
        return cvc;
    } catch (e) {
        $('#ccError').html(`${e}`);
    }
}

$('#clearCart').on('click', () => {
    totalCost = 0;
    localStorage.setItem('seats', '');
    localStorage.setItem('cart', '');
    localStorage.setItem('total', '');
    localStorage.setItem('fname', '');
    localStorage.setItem('email', '');
    localStorage.setItem('destination', '');
    cart = [];
    $('#cart').html(``);
    $('#total').html(`Cart Total: $${totalCost}`);
    $('#seats').html(`Seats Booked: ${cart.length}`)
});

$('#idCheck').on('click', () => {
    if (personalValidation()) {
        const total = parseFloat(localStorage.getItem('total')) || 0;
        const fname = localStorage.getItem('fname');
        const destination = localStorage.getItem('destination');
        const cityName = destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();
        $('#checkoutModal').modal('hide');
        $('#paymentModal').modal('show');
        $('#name').html(`Payment information for ${fname}. Flight to ${cityName}`);
        $('#cartTotal').html(`Total: $${total}`)
    }
});

$('#confirmPay').on('click', () => {
    if (paymentConfirmation()) {
        const total = parseFloat(localStorage.getItem('total')) || 0;
        const fname = localStorage.getItem('fname');
        const seats = localStorage.getItem('seats');
        const email = localStorage.getItem('email');
        const destination = localStorage.getItem('destination');
        const cityName = destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();
        $('#paymentModal').modal('hide');
        $('#bookingComplete').modal('show');
        $('#bookingInfo').html(`
            <h5>${fname}, Thank you for booking!</h5>
            <p>You have Booked ${seats} seats to ${cityName}</p>
            <p>For a total of $${total}</p>
            <p>Your payment confirmation and boarding passes will be sent to ${email}</p>
        `)  ;
    }
});

$('#finish').on('click', () => {
    localStorage.clear();
    refreshCart();
    $('#bookingComplete').modal('hide');
    window.location.reload();
});

$('#autoFill').on('click', () => {
    $('#fName').val('Joe');
    $('#lName').val('Nelson');
    $('#email').val('joe_is_dope@awesome.com');
    $('#phone').val('555-555-5555');
    $('#address').val('123 main st');
    $('#postalCode').val('A1B 2C3');
    $('#city').val('Victoria');
    $('#country').val('Canada');
});

$('#autoFill2').on('click', () => {
   $('#ccNumber').val('1234 1234 1234 1234');
   $('#expDate').val('06/30');
   $('#cvc').val('456');
});

