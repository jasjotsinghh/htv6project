var weather = {
    apiKey: "f6902b61290e2388304ea9ace5e478ae", //optain an api key from openweathermap.org (a weather api)
    getWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey //fetching weather in city/country using api
            )
            .then((response) => {
                return response.json();
            })
            .then((data) => this.showWeather(data));
    },
    showWeather: function(data) {
        const { name } = data;
        const { icon } = data.weather[0];
        const { temp } = data.main;

        //change the weather in given loaction
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".temp").innerText = temp + "°C";

        //update the sports depending on the weather
        updateSports(temp);

        //find a picture of selected place
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x1600/?" + name + "')";
    },
    find: function() {
        this.getWeather(document.querySelector(".search-bar").value); //when searched use the value in the search bar 
    },
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.find();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.find();
        }
    });

//start in toronto
weather.getWeather("Toronto");

//update the sports 
function updateSports(x) {
    if (x < 0) { //indicating if condition
        //listing sports relevant to weather in region (cold)
        document.querySelector(".sport1").innerText = "Ice Hockey";
        document.querySelector(".sport2").innerText = "Skiing";
        document.querySelector(".sport3").innerText = "Curling";
        document.querySelector(".SportIcon1").src = "https://static.billets.ca/artist/czl/s1/coupe-du-monde-de-hockey-2016-200x200.jpg";
        document.querySelector(".SportIcon2").src = "https://alpineairadventures.com/wp-content/uploads/2014/02/1people-768x1024-1-200x200.jpg";
        document.querySelector(".SportIcon3").src = "https://cdn-japantimes.com/wp-content/uploads/2020/05/np_file_11599-200x200.jpeg";
    } else {
        // listing sports relevant to weather in region (warm)
        document.querySelector(".sport1").innerText = "Soccer";
        document.querySelector(".sport2").innerText = "Swimming";
        document.querySelector(".sport3").innerText = "Tennis";
        document.querySelector(".SportIcon1").src = "https://choose901.com/wp-content/uploads/2017/11/soccer-ball-200x200.jpeg";
        document.querySelector(".SportIcon2").src = "https://static.onecms.io/wp-content/uploads/sites/12/2012/09/reasons-to-keep-swimming-200x200.jpg";
        document.querySelector(".SportIcon3").src = "https://static.thenounproject.com/png/40678-200.png";
    }
}