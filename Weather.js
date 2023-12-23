


weather ={
'apiKey': 'INSERT_OWN_API_KEY',
fetchWeather: function(city){
fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID='+ this.apiKey
).then((response)=> response.json())
.then((data)=> this.displayWeather(data))
},
displayWeather: function(data){
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp,humidity,feels_like } = data.main;
    const { speed } = data.wind;

    document.querySelector(".name").innerText = "Weather in " + name
    document.querySelector(".description").innerText =
    description
    document.querySelector(".icon").src ='https://openweathermap.org/img/wn/'+ icon +'@2x.png'
    document.querySelector('.temp').innerText = Math.floor(temp) + '°F'
    document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%'
    document.querySelector('.feelslike').innerText = 'Feels Like: ' + Math.floor(feels_like) + '°F'
    document.querySelector('.speed').innerText = 'Wind Speed: ' + Math.floor(speed) + ' mph'
},

search: function(){
    this.fetchWeather(document.querySelector('.search-bar').value)
    
},
getLocalWeather: function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Fetch weather information using the coordinates
                this.fetchWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error.message);
            }
        );
    } else {
        console.error('Geolocation is not supported by your browser or location was blocked manually.');
    }
},

fetchWeatherByCoordinates: function(latitude, longitude) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${this.apiKey}`
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data))
    .catch((error) => console.error('Error fetching weather:', error));
    
},

init: function() {
    let buttonClick = document.querySelector('.search-icon');
    buttonClick.addEventListener('click', () => this.search());

    this.getLocalWeather();
},
};

document.querySelector('.search-bar').addEventListener('keyup',function(event){
    if(event.key =='Enter'){
        weather.search()
    }
})

// Initialize the weather object
weather.init();





