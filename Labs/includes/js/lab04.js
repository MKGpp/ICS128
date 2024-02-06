const hotelRooms = [{
    imgFile: './includes/images/standard.jpg',
    roomType: 'Standard',
    roomDesc: 'Single room - King Size Bed',
    price: '$169',
}, {
    imgFile: './includes/images/double.jpg',
    roomType: 'Deluxe',
    roomDesc: 'Double room - 2 King Size Beds',
    price: '$289',
}, {
    imgFile: './includes/images/vip.jpg',
    roomType: 'Penthouse',
    roomDesc: '800sqft VIP Penthouse - 2 Bedrooms <br> Bar <br> Whirlpool Tub',
    price: '$699',
}];

for (let i = 0; i < hotelRooms.length; i++) {
    let cardDisplay = document.getElementById("cards");

    cardDisplay.innerHTML += `
        <div class="card mb-3 bg-dark text-light">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${hotelRooms[i].imgFile}" class="img-fluid rounded-start h-100" width="250px" alt="hotel room">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${hotelRooms[i].roomType}</h5>
                        <p class="card-text">${hotelRooms[i].roomDesc}</p>
                        <p class="card-text">${hotelRooms[i].price}</p>
                        <div class="d-flex justify-content-end"><button class="btn btn-success">Book Room</button></div>
                    </div>
                </div>
            </div>
        </div>`
}

function roombooked() {

}