
async function fetchWeatherData(lat, long) {
    const apiKey = 'a5fa944263c3cb4029171f7b252c65f1';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function getWeatherForBusan() {
    try {
        const weatherData = await fetchWeatherDataForBusan();

        if (weatherData) {
            console.log(weatherData);

        } else {
            console.log('Failed to fetch weather data for Busan.');
        }
    } catch (error) {
        console.error('Error getting weather data for Busan:', error);
    }
}
