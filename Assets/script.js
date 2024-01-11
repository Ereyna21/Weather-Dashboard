var api = "5538c9736af3a00e4feacc4d6eb29131";
// var api = "f30dc0b71f772a037a522282770190be";
var url = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + api;
var startButton = document.getElementById("weatherApp")
var inputField = document.getElementById("citySearch")
var weatherContainerEl = document.getElementById("weatherContainer")
var weatherForecastEl = document.getElementById("weatherForecast")

function startApp(e) {
    e.preventDefault()
    var cityNameinput = inputField.value
    getdata(cityNameinput)

}

// Get the current date
var currentDate = dayjs().format('M/DD/YYYY');

// Display the current date
document.getElementById('current-date').textContent = currentDate;

// beign function to fetch data from api

function getdata(cityName) {
    var lookUpUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&lastupdate&appid=' + api + "&units=imperial"
    fetch(lookUpUrl)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            var citySearched = document.createElement("h3")
            var tempature = document.createElement("h3")
            var windSpeed = document.createElement("h3")
            var humidity = document.createElement("h3")
            var iconEl = data.weather[0].icon
            var iconImg = "http://openweathermap.org/img/wn/" + iconEl + ".png"
            var currentIcon = document.createElement("img")
            currentIcon.setAttribute("src", iconImg)
            var lat = data.coord.lat
            var lon = data.coord.lon

            // Add values to append to page
            console.log(data)
            citySearched.textContent = data.name
            weatherContainerEl.append(citySearched)

            tempature.textContent = data.main.temp + "°F"
            weatherContainerEl.append(tempature)

            windSpeed.textContent = data.wind.speed + "MPH"
            weatherContainerEl.append(windSpeed)

            humidity.textContent = data.main.humidity
            weatherContainerEl.append(humidity)

            weatherContainerEl.append(currentIcon)

            

            // start sub fuction to get weatherforecast
            var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + api;
            fetch(urlForecast)
                .then(function (res) {
                    return res.json()
                })
                .then(function (foreCastData) {
                    console.log(foreCastData)


                    for (var i = 1; i < 6; i++) {
                        var forecastDate = document.createElement("h3");
                        forecastDate.textContent = foreCastData.list[i].dt_txt;
                        weatherForecastEl.append(forecastDate);

                        var forecastTemp = document.createElement("h3");
                        var tempInKelvin = foreCastData.list[i].main.temp;
                        var tempInFahrenheit = ((tempInKelvin - 273.15) * 9 / 5) + 32;
                        forecastTemp.textContent = tempInFahrenheit.toFixed(2) + "°F";
                        weatherForecastEl.append(forecastTemp);

                        var forecastWind = document.createElement("h3");
                        forecastWind.textContent = foreCastData.list[i].wind.speed + "MPH";
                        weatherForecastEl.append(forecastWind);

                        var forecastHumidity = document.createElement("h3");
                        forecastHumidity.textContent = foreCastData.list[i].main.humidity;
                        weatherForecastEl.append(forecastHumidity);
                    }
                })

        })

}

startButton.addEventListener("click", startApp);