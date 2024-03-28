import * as form from './lab05.js';
import * as calc from './lab08.js';
import { Hotel } from './lab06.js';

const hotel = new Hotel("Hyundai Beachfront Resort", "Busan", 12, 4, true);
const modal = new bootstrap.Modal(document.getElementById('modal'));

$('#formSubmit').on('click', () => {
    form.formSubmit;
});

$('#hotelBusan').html(`
    <div>                            
            <h4>Busans premier resort</h4>
            <p>RANDOM INFORMATION ABOUT THE HOTEL</p>
            Hotel Amenities: 
            <br>
            Airport shuttle: ${hotel.shuttle} 
            <br>
            Swimming Pool: ${hotel.pool}
             <br>
            Gym: ${hotel.gym}  <br>
            <br>
            Restaurants on-site: 
            <br>
            <div><ol>${hotel.displayRestaurants}</ol></div>
            <br>               
        </p>
    </div>\`;
`);

const bookRoom = () => {
    const choice = $("input[name='roomType']:checked").attr("id");
    const days = calc.daysSelected;
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
        <p>Room Booked! There are ${hotel.booked}/${hotel.rooms} rooms booked.</p>
    `);
    $('#result').html(`
        <p>Your length of stay is: ${days} days</p>
        <p>$${cost}/night</p>
        <p>Total: $${result}</p>
    `);
    modal.show();
}
$('#bookRoom').on('click', () => {
    bookRoom();
});