const roomPricing = [
    {Standard: '$89'},
    {Deluxe: '$149'},
    {Penthouse: '$389'}
];

const calcResult = (choice) => {
    let numDays; //Make this the length of days selected by calendar!
    let result = numDays.val();
    let price;
    if (choice === 'Standard') {
        result *= 89;
        price = 89;
    } else if (choice === 'Deluxe') {
        result *= 149;
        price = 149;
    } else {
        result *= 389;
        price = 389;
    }
    $('#result').html(`
        <p>Your length of stay is: ${numDays.val()} days</p>
        <p>$${price}/night</p>
        <p>Total: $${result}</p>
    `);
}