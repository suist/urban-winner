const API_KEY ="0189fd834054211507bbbb5576d34d71";
const COORDS = 'coords';
const weather = document.querySelector(".js-weather");



function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).
    then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place =json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordsObject){
    localStorage.setItem(COORDS,JSON.stringify(coordsObject))
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        latitude,//latitude: latitude,
        longitude//longitude: longitude
    };

    saveCoords(coordsObject);
    getWeather(latitude, longitude)
}

function handleGeoError(){
    console.log("can't access geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }

}

function init(){
    loadCoords();

}

init();