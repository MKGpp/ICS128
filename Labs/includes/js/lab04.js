/***
 * Initial load of hotel room info cards
 ***************************************/

const hotelRooms = [{
    imgFile: './includes/images/standard.jpg',
    roomType: 'Standard',
    roomDesc: 'Single room - King Size Bed',
    price: '$169',
    bookBtn: '<div class="d-flex justify-content-end"><button class="btn btn-success" id="standard">Book Standard</button></div>'
}, {
    imgFile: './includes/images/double.jpg',
    roomType: 'Deluxe',
    roomDesc: 'Double room - 2 King Size Beds',
    price: '$289',
    bookBtn: '<div class="d-flex justify-content-end"><button class="btn btn-success" id="deluxe">Book Deluxe</button></div>'
}, {
    imgFile: './includes/images/vip.jpg',
    roomType: 'Penthouse',
    roomDesc: '800sqft VIP Penthouse - 2 Bedrooms <br> Bar <br> Whirlpool Tub',
    price: '$699',
    bookBtn: '<div class="d-flex justify-content-end"><button class="btn btn-success" id="vip">Book Penthouse</button></div>'
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
                        <div class="w-100 bg-secondary" height="1px"></div>
                        <p class="card-text">${hotelRooms[i].roomDesc}</p>
                        <p class="card-text">${hotelRooms[i].price}</p>
                        ${hotelRooms[i].bookBtn}
                    </div>
                </div>
            </div>
        </div>`
}
/***************************************/

/***
 * Function to add rows to table on button click
 ***********************************************/

function tableBtnClick() {
    let table = document.getElementById("sampleTable");
    let count = 2;

    table.innerHTML += `
    <tr>
        <td>Row${count} cell1</td>
        <td>Row${count} cell2</td>
    </tr>`;
    count++;
}
/***********************************************/

/***
 * Function to display(alert) room's price on button click
 **********************************************************/
function roomBookedBtn() {
    if (bookBtn.getElementById("standard")) {
        alert(`Your room is ${hotelRooms[0].price} per night`);
    } else if (bookBtn.getElementById("deluxe")) {
        alert(`Your room is ${hotelRooms[1].price} per night`);
    } else {
        alert(`Your room is ${hotelRooms[2].price} per night`);
    }
}
/**********************************************************/

/***
 * Event listeners for button clicks
 ***********************************/
document.getElementById('myButton').addEventListener('click', tableBtnClick);
document.getElementById('bookBtn').addEventListener('click', roomBookedBtn);

/***********************************/