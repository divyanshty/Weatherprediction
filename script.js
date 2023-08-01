const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemE1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const weatherForecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday']
const months = ['January', 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];

const API_KEY = '3454a8c9c596088eb9c6f3ff65bfaea7'
setInterval(() =>{
    const time =new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hourIn12HrFormat = hour >= 13 ? hour %12: hour 
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeE1.innerHTML = hourIn12HrFormat + ':' + minutes + ''+`<span id="am-pm">${ampm}</span>`
    
    dateE1.innerHTML = days[day] + ',' + date+ ' ' +months[month]
}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        let{latitude,longitude} = success.coords;
       fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=3454a8c9c596088eb9c6f3ff65bfaea7`).then(res => res.json() ).then(data =>{
        console.log(data)
        showWeatherData(data);
        console.log("hii");
       })
       

    })
}
function showWeatherData(data){
    let {humidity,pressure,sunrise,sunset,wind_speed} = data.current;

    currentWeatherItemE1.innerHTML =
    ` <div class="weather-items">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-items">
    <div>pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-items">
    <div>Wind speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weather-items">
    <div>sunrise</div>
    <div>${window.Comment(sunrise*1000).format('HH:mm a')}</div>
</div>
<div class="weather-items">
    <div>sunset</div>
    <div>${window.Comment(sunset*1000).format('HH:mm a')}</div>
</div>




`;
let otherDayForecast = ''
data.daily.forEach((d , idx)=>{
   if(idx==0) {

   }else{
    otherDayForecast += `
    <div class="weather-forecast-item">
                            <div class="day">${window.Comment(day.dt*1000).format('ddd')}</div>
                            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
                            <div class="temp">Night-25.6&#176;C</div>
                            <div class="temp">Day-30&#176;C</div> 
                        </div>
    `
   }
})
}