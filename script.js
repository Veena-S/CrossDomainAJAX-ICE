
const dateLabel = document.createElement('label');
dateLabel.innerText = 'Date';
const dateInput = document.createElement('input');
dateInput.setAttribute('type', 'text');
document.body.appendChild(dateLabel);
document.body.appendChild(dateInput);

const getCurrentWeather = () => {

  const divWeatherDisplay = document.createElement('div');
  
  // Get the geo location data
   if(!navigator.geolocation) {
     divWeatherDisplay.innerText = 'Geolocation is not supported by your browser';
  } else {
    divWeatherDisplay.innerText = 'Locating…';
    navigator.geolocation.getCurrentPosition((position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    // axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`)
    axios.get(`https://metaweather-with-cors.now.sh/api/location/search/?lattlong=${latitude},${longitude}`)
    .then((returnedLocation) =>{
      console.log(returnedLocation);
      console.log(returnedLocation.data[0].woeid);

      axios.get(`https://metaweather-with-cors.now.sh/api/location/${returnedLocation.data[0].woeid}/${dateInput.value}`)
    .then((returnedWeather) =>{
      console.log(returnedWeather);
     
      // divWeatherDisplay.innerText = JSON.stringify( returnedWeather.data.consolidated_weather[0]);
      // weather_state_name;

      divWeatherDisplay.innerText += JSON.stringify( returnedWeather.data[0]);
      const abbr = returnedWeather.data[0].weather_state_abbr;
      console.log(abbr);
      document.body.appendChild(divWeatherDisplay);

       const imgEl = document.createElement('img');
        imgEl.src = `https://www.metaweather.com/static/img/weather/ico/${abbr}.ico`;
        document.body.appendChild(imgEl);

    })
    .catch((err) => {
      console.log(err);
    })

    })
    .catch((err) => {
      console.log(err);
    })
  }
    , ((error) => {
      divWeatherDisplay.innerText = 'Unable to retrieve your location';      
    }));
  }
}



const weatherButton = document.createElement('button');
weatherButton.innerText = "Current Weather";
document.body.appendChild(weatherButton);

weatherButton.addEventListener('click', getCurrentWeather);