let weather = {
  apikey: "c0823d214dd464951c6a5c0cac7a3742",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=fr&appid=" + this.apikey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity, pressure } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Météo à " + name;
    document.querySelector(".icon").src =  "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".feels_like").innerText = "Température ressentie: " + feels_like + "°C";
    document.querySelector(".humidity").innerText = "Humidité: " + humidity + "%";
    document.querySelector(".pressure").innerText = "Pression atmosphèrique: " + pressure + "hPa";
    document.querySelector(".wind").innerText = "Vitesse du vent: " + speed + "m/s";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Paris");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service worker registered:', registration);
      })
      .catch(error => {
        console.log('Service worker registration failed:', error);
      });
  });
}


    let deferredPrompt;
    const installButton = document.querySelector("install-button");
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = "block";
    });
    installButton.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("L'application a été installée avec succès");
            }
            deferredPrompt = null;
        });
    });




