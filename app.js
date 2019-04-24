window.addEventListener("load", () => {
  let lat;
  let long;

  let weatherLocation = document.querySelector(".weather-location");
  let statusTemperature = document.querySelector(".status-temperature");
  let statusSummary = document.querySelector(".status-summary");
  let temperatureSpan = document.querySelector(".temp-span span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat, long);
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/a87427362efac00863586e8b94747b0d/${lat},${long}`;

      fetch(api)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          weatherLocation.textContent = data.timezone;
          statusTemperature.textContent = temperature;
          statusSummary.textContent = summary;

          console.log(icon);
          let celsius = (temperature - 32) * (5 / 9);

          setIcons(icon, document.querySelector(".icon"));

          statusTemperature.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              statusTemperature.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              statusTemperature.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
