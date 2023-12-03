const input = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherInfo = document.querySelector(".weather");

function getWeatherData(location) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=c89d696c32c2479ebc294543232411&q=${location}&aqi=no`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw (input.style.borderColor = "red");
    })
    .then((content) => {
      const weatherData = content;
      const icon = weatherData.current.condition.icon;
      const temp = weatherData.current.temp_c;
      const locationName = weatherData.location.name;
      const weatherStatus = weatherData.current.condition.text;
      const windSpeed = weatherData.current.wind_kph;
      const humidity = weatherData.current.humidity;

      weatherInfo.innerHTML = `<img class="w-32 h-32" src="${icon}" alt="icon" />
                                <h2 class="text-white text-5xl font-semibold">${temp}&degc</h2>
                                <h3>
                                  <span class="text-white text-5xl">${locationName}</span> <br />
                                  <span class="block text-center text-white font-light">${weatherStatus}</span>
                                </h3>

                                <div class="weather-information flex gap-16 mb-8">
                                  <h2>
                                    <span class="text-white text-2xl">
                                      <i class="bx bx-wind"></i>${windSpeed} km/h</span> <br />
                                    <span class="block text-center text-white font-light text-sm">
                                      Wind Speed</span>
                                  </h2>
                                  <h2>
                                    <span class="text-white text-2xl">
                                      <i class="bx bxl-tailwind-css"></i>${humidity}%</span> <br />
                                    
                                    <span class="block text-center text-white font-light text-sm">
                                      Humidity</span>
                                  </h2>
                                </div>`;
    })
    .catch((error) => {
      console.error("Error try again", error);
    });
}
getWeatherData("Tehran");
searchButton.addEventListener("click", () => {
  let getLocation = input.value;
  getWeatherData(getLocation);
});
