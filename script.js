const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b504673daa3188ecc8745715498eb069';


$(document).ready(function () {
    weatherFn('Noida'); 
});
const colors = ['#f0f8ff', '#ffe4e1', '#e6ffe6', '#fff0f5', '#f5f5dc'];
let colorIndex = 0;

$('#bg-toggle-btn').click(function () {
    $('body').css('background-color', colors[colorIndex]);
    colorIndex = (colorIndex + 1) % colors.length;
});

async function weatherFn(cityName) {
    const tempUrl = `${url}?q=${cityName}&appid=${apiKey}&units=metric`; 
    try {
        const res = await fetch(tempUrl);
        const data = await res.json();

        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.'); 
        }
    } catch (error) {
        console.error('Error fetching weather data:', error); 
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name); 
    $('#date').text(moment().format('MMM Do YYYY, h:mm:ss a')); 
    $('#temperature').html(`${Math.round(data.main.temp)}°C`); 
    $('#description').text(data.weather[0].description); 

$('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr( 
        'src',
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );

    $('#weather-info').fadeIn(); 
}
