import * as form from './lab05.js';
import * as calc from './lab08.js';
import * as hotel from './lab06.js';
import * as weather from './weather.js';

const newHotel = new hotel.Hotel("Hyundai Beachfront Resort", "Busan", 12, 4, true);
const modal = new bootstrap.Modal(document.getElementById('modal'));
const restaurantList = hotel.displayRestaurants();

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
    </div>;
`);

const bookRoom = () => {
    console.log("TEST");
    const choice = $("input[name='roomType']:checked").attr("id");
    const days = calc.daysSelected();
    let result = days;
    let cost;
    if (choice === 'Standard') {
        result *= 89;
        cost = 89;
    } else if (choice === 'Deluxe') {
        result *= 149;
        cost = 149;
    } else {
        result *= 389;
        cost = 389;
    }
    $('#roomsLeft').html(`
        <p>Room Booked! There are ${newHotel.booked}/${newHotel.rooms} rooms booked.</p>
    `);
    $('#result').html(`
        <p>Your length of stay is: ${days} days</p>
        <p>$${cost}/night</p>
        <p>Total: $${result}</p>
    `);

}
const loadImage = (source) => {
    $('#image').attr('src', source);
}

const hotelRooms = [{
    imgFile: 'includes/images/standard.jpg',
    roomType: 'Standard',
    roomDesc: 'Single room - King Size Bed',
    price: '$169',
    bookBtn: 'standard'
}, {
    imgFile: 'includes/images/double.jpg',
    roomType: 'Deluxe',
    roomDesc: 'Double room - 2 King Size Beds',
    price: '$289',
    bookBtn: 'deluxe'
}, {
    imgFile: 'includes/images/vip.jpg',
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
                        <a onclick="loadImage('${hotelRooms[i].imgFile}')">
                            <img src="${hotelRooms[i].imgFile}" class="img-fluid rounded-start h-100" width="250px" alt="hotel room">
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


document.getElementById("bookRoom").addEventListener('click', () => {
    console.log("TEST");
    bookRoom();
    modal.show();
});
