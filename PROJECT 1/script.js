const container = document.querySelector('.container');
const searchButton = document.querySelector('.bx-search');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const inputField = document.getElementById('uniqueId');

const fetchWeather = (city) => {
    const apikey = '0db3b9595d6b866969726bfec647999d';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            container.style.height = '600px';
            weatherbox.classList.add('active');
            weatherdetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            switch (data.weather[0].main.toLowerCase()) {
                case 'clear':
                    image.src = "images/haze.png";
                    break;
                case 'rain':
                    image.src = "images/rainy.png";
                    break;
                case 'snow':
                    image.src = "images/snow.png";
                    break;
                case 'clouds':
                    image.src = 'images/clouds.png';
                    break;
                case 'haze':
                    image.src = 'images/haze.png';
                    break;
                case 'thunderstorm':
                    image.src = 'images/storm.png';
                    break;
                case 'mist':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/clouds.png';
                    break;
            }

            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;

            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            humidity.textContent = `${data.main.humidity}%`;
            wind.textContent = `${data.wind.speed} km/h`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            container.style.height = '400px';
            weatherbox.classList.remove('active');
            weatherdetails.classList.remove('active');
            error404.classList.add('active');
        });
};

searchButton.addEventListener('click', () => {
    const city = inputField.value.trim();
    if (city !== '') {
        fetchWeather(city);
    }
});

inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = inputField.value.trim();
        if (city !== '') {
            fetchWeather(city);
        }
    }
});
