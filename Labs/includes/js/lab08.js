/**
 * takes the date inputs and calculates the
 * difference in number of days between them
 * @returns number of days selected
 */
export const daysSelected = () => {
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
        <p>Your length of stay is: ${numDays} days</p>
        <p>$${price}/night</p>
        <p>Total: $${result}</p>
    `);
}

/**
 * event handler for the book room button
 */
$('#bookRoom').on('click', () => {
    calcResult($("input[name='roomType']:checked").attr("id"));
});
