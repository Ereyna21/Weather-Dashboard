// var api = "5538c9736af3a00e4feacc4d6eb29131";
var api = "f30dc0b71f772a037a522282770190be";
var url ="https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid="+ api;
var startButton = document.getElementById("weatherApp")
var inputField = document.getElementById("citySearch")

function startApp(e){
    e.preventDefault()
    var cityNameinput = inputField.value
    getdata(cityNameinput)
    
}


// beign function to fetch data from api

function getdata(cityName){
    var lookUpUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&lastupdate&appid=' + api +  "&units=imperial"
fetch(lookUpUrl)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data)
    })

}

startButton.addEventListener("click" , startApp);