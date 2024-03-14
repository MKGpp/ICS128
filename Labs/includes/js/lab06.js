
const roomTypes = ["Single", "<br>Double - 2 beds", "<br>Double - Queen", "<br>Suite", "<br>Penthouse"];
const restaurants = new Map([
            ["HanWoo Steakhouse", "Korean"],
            ["Izakaya Grill", "Japanese"],
            ["Mr.Pizza", "Korean/Italian"]
]);

class Hotel {
    constructor(name, city, rooms, booked, gym) {
        this._name = name;
        this._city = city;
        this._rooms = rooms;
        this._booked = booked;
        this._gym = gym;
    }

    get name() {
        return this._name;
    }
    get city() {
        return this._city;
    }
    get rooms() {
        return this._rooms;
    }
    get booked() {
        return this._booked;
    }
    get gym() {
        return this._gym;
    }

    set name(name) {
        this._name = name;
    }
    set city(city) {
        this._city = city;
    }
    set rooms(rooms) {
        this._rooms = rooms;
    }
    set booked(booked) {
        this._booked = booked;
    }
    set gym(gym) {
        this._gym = gym;
    }

    availableRooms() {
        return this._rooms - this._booked;
    }

    bookRoom() {
        if (this.availableRooms() > 0) {
            this._booked++;
            document.getElementById("roomsLeft").innerHTML = `There are ${hotel.booked}/${hotel.rooms} rooms booked.`;
            alert(`Room Booked! There are ${hotel.availableRooms()} rooms remaining.`);
        }
    }

    cancelRoom() {
        this._booked--;
        document.getElementById("roomsLeft").innerHTML = `There are ${hotel.booked}/${hotel.rooms} rooms booked.`;
        alert(`Room Cancelled! There are ${hotel.availableRooms()} rooms remaining.`);
    }
}

class Resort extends Hotel {
    constructor(name, city, rooms, booked, gym, resortType, beachFront, kidsClub) {
        super(name, city, rooms, booked, gym);
        this._resortType = resortType;
        this._beachfront = beachFront;
        this._kidsClub = kidsClub;
    }

    get resortType() {
        return this._resortType;
    }
    get beachFront() {
        return this._beachfront;
    }
    get kidsClub() {
        return this._kidsClub;
    }
    set resortType(resortType) {
        this._resortType = resortType;
    }
    set beachFront(beachFront) {
        this._beachfront = beachFront;
    }
    set kidsClub(kidsClub) {
        this._kidsClub = kidsClub;
    }
}

const hotel = new Hotel("Hotel California", "California", 25, 12, true);
hotel.location = "USA";
hotel.roomTypes = roomTypes;
hotel.shuttle = true;
hotel.pool = true;

const resort = new Resort("Hyundai Beachfront Resort", "Busan", 12, 4, true, "Family", true, true);
resort.location = "South Korea"
resort.bar = false;

const hotelDisplay = document.getElementById("hotel");
const resortDisplay = document.getElementById('resort');

const displayRestaurants = () => {
    let theRestaurants = '';
    for (let [key, value] of restaurants) {
        theRestaurants += `<li>${key} type: ${value}</li>`
    }
    return theRestaurants;
};

hotelDisplay.innerHTML = `
            <div>
                <h1>${hotel.name}</h1>
                <h5>Hotel Info:</h5>
                <p>
                    The ${hotel.name} is located in ${hotel.location} <br>
                    <br>
                    The available room types are: <br>
                    ${hotel.roomTypes}
                    <br>
                    Hotel Amenities: <br>
                    Airport shuttle: ${hotel.shuttle} <br>
                    Swimming Pool: ${hotel.pool} <br>
                    Gym: ${hotel.gym} <br>
                    Restaurants on-site: <br>
                    <div><ol>${displayRestaurants}</ol></div>
                    <br>
                    <p style="color: #65A46D" id="roomsLeft">There are ${hotel.booked}/${hotel.rooms} rooms booked</p>
                    <button class="btn btn-outline-primary" id="bookRoom" onclick="hotel.bookRoom()">Book Room</button>
                    <button class="btn btn-outline-danger" id="cancelRoom" onclick="hotel.cancelRoom()">Cancel Room</button>
                </p>
            </div>`;

resortDisplay.innerHTML = `
            <div>
                <h1>${resort.name}</h1>
                <h5>Resort Info:</h5>
                <p>
                    The ${resort.name} is located in ${resort.location} <br>
                    <br>
                    Is it on the beach? ${resort.beachFront}
                    <br>            
                    Does it have a bar? ${resort.bar}
                    <br>
                    Kids club? ${resort.kidsClub}
                    <br>
                    <p style="color: #65A46D">There are ${resort.booked}/${resort.rooms} rooms booked.</p>
                    <button class="btn btn-outline-primary" id="bookRoom" onclick="resort.bookRoom()">Book Room</button>
                    <button class="btn btn-outline-danger" id="cancelRoom" onclick="resort.cancelRoom()">Cancel Room</button>
                </p>
            </div>`;