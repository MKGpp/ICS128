import * as form from './lab05.js';
import * as hotel from './lab06.js';
import {Hotel} from "./lab06.js";

const modal = new bootstrap.Modal(document.getElementById('modal')); //modal for results
const newHotel = new hotel.Hotel("Hyundai Beachfront Resort", "Busan", 12, 4, true);
const restaurantList = hotel.displayRestaurants();
async function fetchWeatherDataForBusan() {
    const apiKey = 'a5fa944263c3cb4029171f7b252c65f1';
    const lat = '35.2100';
    const lon = '129.0689';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;

        const url = `https://openweathermap.org/img/wn/${icon}.png`

        $('#temperature').html(`Current temp: ${temp}`);
        $('#description').html(desc);
        $('#weatherIcon').attr('src', url);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}
window.onload = fetchWeatherDataForBusan;

$('#formSubmit').on('click', () => {
    form.formSubmit();
});

$('#hotelBusan').html(`
    <div>                            
            <h4>${newHotel.name}</h4>
            <p>Busans premier resort</p>
            Hotel Amenities: 
            <br>
            Airport shuttle: Complementary! 
            <br>
            Swimming Pool: We have 3!
             <br>
            Gym: Overlooks the Ocean  <br>
            <br>
            Restaurants on-site: 
            <br>
            <div><ol>${restaurantList}</ol></div>
            <br>               
        </p>
    </div>
`);

/**
 * takes the date inputs and calculates the
 * difference in number of days between them
 * @returns number of days selected
 */
const daysSelected = () => {
    const start = new Date($('#dateOne').val());
    const end = new Date($('#dateTwo').val());

    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

/**
 * calculate and display the price * number of days selected
 * @param choice determines the price
 */
const calcResult = (choice) => {
    let numDays = daysSelected();
    let result = numDays;
    let price;
    if (choice === 'Standard') {
        price = 169;
        result *= price;
    } else if (choice === 'Deluxe') {
        price = 289;
        result *= price;
    } else {
        price = 699;
        result *= price;
    }
    $("#roomsLeft").html(`There are ${Hotel.booked}/${Hotel.rooms} rooms booked.`);
    $('#result').html(`
        <p>Your length of stay is: ${numDays} days</p>
        <p>$${price}/night</p>
        <p>Total: $${result}</p>
    `);
}

const hotelRooms = [{
    imgFile: './includes/images/standard.jpg',
    roomType: 'Standard',
    roomDesc: 'Single room - King Size Bed',
    price: '$169',
    bookBtn: 'standard'
}, {
    imgFile: './includes/images/double.jpg',
    roomType: 'Deluxe',
    roomDesc: 'Double room - 2 King Size Beds',
    price: '$289',
    bookBtn: 'deluxe'
}, {
    imgFile: './includes/images/vip.jpg',
    roomType: 'Penthouse',
    roomDesc: '800sqft VIP Penthouse - 2 Bedrooms <br> Bar <br> Whirlpool Tub',
    price: '$699',
    bookBtn: 'vip'
}];

const displayCards = () => {
    for (let i = 0; i < hotelRooms.length; i++) {
        let cardDisplay = document.getElementById("cards");

        cardDisplay.innerHTML += `
            <div class="card mb-3 bg-dark text-light">
                <div class="row g-0">
                    <div class="col-md-4">
                        <a onclick="$('#image').attr('src', '${hotelRooms[i].imgFile}')">
                            <img src="${hotelRooms[i].imgFile}" class="img-fluid rounded-start h-100" alt="hotel room">
                        </a>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title"><strong>${hotelRooms[i].roomType}</strong></h5>
                            <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                            <p class="card-text">${hotelRooms[i].roomDesc}</p>
                            <p class="card-text">${hotelRooms[i].price}</p>                      
                        </div>
                    </div>
                </div>
            </div>`
    }
}
displayCards();


/**
 * event handler for the book room button
 */
$('#bookRoom').on('click', () => {
    calcResult($("input[name='roomType']:checked").attr("id"));
    modal.show();
});
