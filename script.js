const api = {
    key : "0c9d191190063620a414e558eb0d3be5",
    base: "http://api.openweathermap.org/data/2.5/",
    lang: "it"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value) 
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=it`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
}



function displayResults(weather){
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dataBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = ''
    let divtemp = document.createElement('div')
    divtemp.innerHTML = `<i class="fas fa-thermometer-three-quarters pr-3"></i>${Math.round(weather.main.temp)}°`
    temp.appendChild(divtemp)
    

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].description.toUpperCase();


    let locationIcon = document.querySelector('.weather-icon')
    const {icon} = weather.weather[0];
    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

    let wind = document.querySelector('.wind');
    wind.innerHTML = ''
    let divwind = document.createElement('div')
    divwind.innerHTML = `<span><i class="fas fa-wind mr-3"></i>Vento:</span>${Math.round(weather.wind.speed)} mph`
    wind.appendChild(divwind)

    let hilow = document.querySelector('.hilow');
    hilow.innerHTML=''
    let divhilow = document.createElement('div')
    divhilow.innerHTML =
        `
        <div class='mb-2'><i class="fas fa-thermometer-quarter mr-3"></i>Temp min:${Math.round(weather.main.temp_min)}°</div>  <div class='pt-3'><i class="fas fa-thermometer-full mr-3"></i>Temp max: ${Math.round(weather.main.temp_max)}°</div>
        
        `
    hilow.appendChild(divhilow)

    let humidity = document.querySelector('.humidity');
    humidity.innerHTML=''
    let divHumidity = document.createElement('div')
    divHumidity.innerHTML = `<span><i class="fas fa-water mr-3"></i>Umidità:</span>${weather.main.humidity}%`
    humidity.appendChild(divHumidity)


    
    
}


function dataBuilder(d){
    let months = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio",
    "Agosto","Settembre","Ottobre","Novembre","Dicembre"];

    let days = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    

    return `${day} ${date} ${month} `;
}

 




