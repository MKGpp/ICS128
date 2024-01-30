function displayNums() {

    let prices = document.getElementById("calcMean").value;
    let priceArray = prices.split(" ");

    let price1 = parseInt(priceArray[0]);
    let price2 = parseInt(priceArray[1]);
    let price3 = parseInt(priceArray[2]);

    let middleNum;
    if ((price1 >= price2 && price1 <= price3) || (price1 <= price2 && price1 >= price3)) {
        middleNum = price1;
    } else if ((price2 >= price1 && price2 <= price3) || (price2 <= price1 && price2 >= price3)) {
        middleNum = price2;
    } else {
        middleNum = price3;
    }
    let meanNum = (price1 + price2 + price3) / 3;

    let result = document.getElementById("result");
    result.innerHTML = `3 prices are: $${price1}, $${price2}, $${price3}<br>`;
    result.innerHTML += `Middle: <span id="midPrice">$${middleNum}</span><br>`;
    result.innerHTML += `Mean: $${meanNum.toFixed(0)}<br>`;

    let midPriceColor = document.getElementById("midPrice");

    if (middleNum % 2 === 0) {
        midPriceColor.style.color = "red";
    } else {
        midPriceColor.style.color = "black";
    }

}

function displayOccupancy() {

    const percent = document.getElementById("displayOccupancy").value;


    if (percent < 0 || percent > 100) {
        alert("Incorrect - not between 0-100");
        return;
    }
        const result = document.getElementById("occupancy");
        result.innerHTML = `The Hotel is:<br>`;
        result.innerHTML += `<span id="percent">${percent}%</span> booked!`;
        const percentColor = document.getElementById("percent")

        if (percent >= 90) {
            percentColor.style.color = "green";
        } else if (percent >= 80) {
            percentColor.style.color = "blue";
        } else if (percent >= 65) {
            percentColor.style.color = "yellow";
        } else if (percent >= 51) {
            percentColor.style.color = "black";
        } else {
            percentColor.style.color = "red";
        }
    }

function iterationOfANumber() {

    let numToIterate = parseInt(document.getElementById("iterateInput").value);
    let output = document.getElementById("iteration")

    output.innerHTML = "";

    for (let i = 1; i <= 9; i++) {
        let line = "";
        let digits = i <= 5 ? i : 10 - i;

        for (let j = 0; j < digits; j++) {
            line += numToIterate;
        }
        output.innerHTML += line + "<br>";
    }
}

function whoIsFaster() {

    let speed1 = parseInt(document.getElementById("speed1").value);
    let speed2 = parseInt(document.getElementById("speed2").value);

    let fastestSpeed;
    let slowerSpeed;
    let fasterAi;
    let slowerAi;

    if (speed1 > speed2) {
        fastestSpeed = speed1;
        slowerSpeed = speed2;
        fasterAi = "Alexa";
        slowerAi = "Siri";
    } else {
        fastestSpeed = speed2;
        slowerSpeed = speed1;
        fasterAi = "Siri";
        slowerAi = "Alexa";
    }

    let speedCompare = document.getElementById("fastest");
    speedCompare.innerHTML = `${fasterAi}'s speed is: <span style="color: red;">${fastestSpeed}</span><br>`;
    speedCompare.innerHTML += `${slowerAi}'s speed is: <span style="color: blue;">${slowerSpeed}</span><br>`;
    speedCompare.innerHTML += `<span style="color: red;">${fasterAi}</span> gets there first!`;
}

document.getElementById("firstBtn").addEventListener("click", displayNums);
document.getElementById("secondBtn").addEventListener("click", displayOccupancy);
document.getElementById("thirdBtn").addEventListener("click", iterationOfANumber);
document.getElementById("fourthBtn").addEventListener("click", whoIsFaster);