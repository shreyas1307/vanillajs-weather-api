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
      // console.log(lat, long);
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/45553e207c4ad5acf751d1b9d3a9da09/${lat},${long}`;
      // console.log(api);

      fetch(api)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          const { temperature, summary, icon } = data.currently;

          weatherLocation.textContent = data.timezone;
          statusTemperature.textContent = `It is presently ${temperature}`;
          statusSummary.textContent = summary;

          // console.log(icon);
          let celsius = (temperature - 32) * (5 / 9);

          setIcons(icon, document.querySelector(".icon"));

          statusTemperature.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              statusTemperature.textContent = `It is presently ${Math.floor(
                celsius
              )}`;
            } else {
              temperatureSpan.textContent = "F";
              statusTemperature.textContent = `It is presently ${temperature}`;
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
