const current = document.querySelector('.forecast-today');
const next = document.querySelector('.forecast-nextday');
const third = document.querySelector('#forecast-nextday');
const inputLoc = document.querySelector('#search');
console.log(inputLoc);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 var x = {};

 function searchInput(a){

  
  
let req =  new XMLHttpRequest();
 req.open('GET' , `  https://api.weatherapi.com/v1/forecast.json?key=8b516b213e884fcda02204825241101&q=${a}&days=3&wind_mph` );
req.send();

 req.addEventListener('loadend' , function(){
     if(req.status >= 200 && req.status < 300){
        x = JSON.parse(req.response);
        console.log(x);

        displyWeather();


    }
    
})

}

inputLoc.addEventListener('keyup' , function(a){
    searchInput(a.target.value);
})

function displyWeather(){
  let todayDate =  new Date(x.current.last_updated);
  let currentDate = x.forecast.forecastday[0].date;
let location = x.location.name;
let currentTemp = Math.floor(x.current.temp_c);
console.log(x.current.condition.icon);
let currentCond = x.current.condition.text;
console.log(Math.ceil(x.forecast.forecastday[1].day.mintemp_c)); //next day


current.innerHTML = `<div class="header1 d-flex align-items-center justify-content-between color">
<div class="day ms-2">${days[todayDate.getDay()]}</div>
<div class="date me-2">${todayDate.getDate() + ' ' + months[todayDate.getMonth()]}</div>
</div>
<div class="forecast-body mx-4">
<div class="zone my-4 color">${location}</div>
<div class="degree my-3">
<div class="d-flex justify-content-start align-items-center">
<div class="num">${currentTemp}</div>
<sup>o</sup>
c
</div>
<div class="icon ms-3 "><img src="https:${x.current.condition.icon}" alt=""></div>

</div>

<div class="status color text-primary">${currentCond}</div>
</div>
<div class="forecast-foot py-3 color">
<span class="ms-3"><img src="./img/icon-umberella.png" alt=""> 20%</span>
<span class="m-4"><img src="./img/icon-wind.png" alt="" > 18km/h</span>
<span><img src="./img/icon-compass.png" alt=""> East</span>
</div>`
next.innerHTML = ` <div class="header2 d-flex align-items-center justify-content-between">
<div class="day m-auto color">${days[new Date(x.forecast.forecastday[1].date).getDay()]}</div>
</div>
<div class="forecast-body nextday text-center">
<div class="icon mt-4 mb-2"><img  src="https:${x.forecast.forecastday[1].day.condition.icon}" alt=""></div>
<div class="degree m-auto mb-2">
<div class="num">${x.forecast.forecastday[1].day.maxtemp_c}</div>
<sup >o</sup>
c
</div>

<small>
${x.forecast.forecastday[1].day.mintemp_c}
<sup>o</sup>
</small>
<div class="status my-4 text-primary">${x.forecast.forecastday[1].day.condition.text}</div>
</div>`
third.innerHTML = ` <div class="header2 d-flex align-items-center justify-content-between">
<div class="day m-auto color">${days[new Date(x.forecast.forecastday[2].date).getDay()]}</div>
</div>
<div class="forecast-body nextday text-center">
<div class="icon mt-4 mb-2"><img  src="https:${x.forecast.forecastday[2].day.condition.icon}" alt=""></div>
<div class="degree m-auto mb-2">
<div class="num">${x.forecast.forecastday[2].day.maxtemp_c}</div>
<sup >o</sup>
c
</div>

<small>
${x.forecast.forecastday[2].day.mintemp_c}
<sup>o</sup>
</small>
<div class="status my-4 text-primary">${x.forecast.forecastday[2].day.condition.text}</div>
</div>`
}

searchInput('cairo');





