/***
 * Initial load of hotel room info cards
 ***************************************/


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
                        <h5 class="card-title"><strong>${hotelRooms[i].roomType}</strong></h5>
                        <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                        <p class="card-text">${hotelRooms[i].roomDesc}</p>
                        <p class="card-text">${hotelRooms[i].price}</p>
                        <div class="d-flex justify-content-end"><button class="btn btn-success" onclick="roomBookedBtn('${hotelRooms[i].bookBtn}')" id="${hotelRooms[i].bookBtn}">Book Room</button></div>
                    </div>
                </div>
            </div>
        </div>`
}
/***************************************/

/***
 * Function to add rows to table on button click
 ***********************************************/

let count = 2;

const tableBtnClick = () => {
        let table = document.getElementById("sampleTable");

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
const roomBookedBtn = (btnId) => {
        switch (btnId) {
            case 'standard':
                alert(`Your room price is ${hotelRooms[0].price} per night.`);
                break;
            case 'deluxe':
                alert(`Your room price is ${hotelRooms[1].price} per night.`);
                break;
            case 'vip':
                alert(`Your room price is ${hotelRooms[2].price} per night.`);
                break;
            default:
                console.error('Invalid button id');
        }
    }
/**********************************************************/

/***
 * Event listeners for button clicks
 ***********************************/
document.getElementById('myButton').addEventListener('click', tableBtnClick);

/***********************************/