const vicLat = 48.425864;
const vicLong = -123.365590;

let map = L.map('map').setView([vicLat, vicLong], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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

