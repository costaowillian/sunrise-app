import { getPhoto } from './img-bg.js'
import { config } from '../../config.js';
const apiKey = config.apiKeyMap;
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const weatherContainer = document.querySelector('#weather-data')

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');
const bodyElement = document.querySelector('body');

// Funções
const getWeatherData = async(city) => {

    const apiWhaterURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    
    const res = await fetch(apiWhaterURL);
    const data = await res.json();

    return data   
};

const showWeatherData = async (city, cityPhoto) => {
    const data = await getWeatherData(city);
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    weatherContainer.classList.remove('hide');
    screamSize(cityPhoto);
};


const screamSize = (cityPhoto) => {
    let Width = window.innerWidth

    if (Width < 992) {
        document.body.style.background = `linear-gradient(180deg, #FF6D45 36.98%, 
            rgba(254, 78, 105, 0) 79.32%),
        url('${cityPhoto}')  no-repeat center bottom 
        `;
        document.body.style.backgroundSize = 'cover';
    } else {
        document.body.style.background = `linear-gradient(90deg, #FE7752 36.28%, 
            rgba(254, 119, 82, 0) 76.94%),
        url('${cityPhoto}')  no-repeat center right 
        `;
        document.body.style.backgroundSize = 'cover';
    };  
}
const loadCityInformation = async () => {
    const city = cityInput.value;
    const cityPhoto = await getPhoto(city);
    showWeatherData(city, cityPhoto)
}
// Eventos
searchBtn.addEventListener('click',  async (e) => {
    e.preventDefault();
    loadCityInformation();
});

cityInput.addEventListener('keyup',  async (e) => {

    if(e.code === 'Enter') {
        loadCityInformation()
    }
});