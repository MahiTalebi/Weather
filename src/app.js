const input = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherInfo = document.querySelector(".weather");
const wrapper = document.querySelector(".wrapper");
const backGround = document.querySelector("body>div");

function getWeatherData(location) {
  const request1 = fetch(
    `http://api.weatherapi.com/v1/current.json?key=c89d696c32c2479ebc294543232411&q=${location}&aqi=no`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw (input.style.borderColor = "red");
  });
  const request2 = fetch(
    `https://api.ipgeolocation.io/astronomy?apiKey=b256aaecb4f7418aadedc94e8712248b&location=${location}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw (input.style.borderColor = "red");
  });
  Promise.all([request1, request2])
    .then(([data1, data2]) => {
      console.log(data1, data2);
      const weatherData = data1;
      const timeZoneData = data2;
      const icon = weatherData.current.condition.icon;
      const temp = weatherData.current.temp_c;
      const locationName = weatherData.location.name;
      const weatherStatus = weatherData.current.condition.text;
      const windSpeed = weatherData.current.wind_kph;
      const humidity = weatherData.current.humidity;
      const time = Number(weatherData.location.localtime.slice(11, 13));
      const sunSet = Number(timeZoneData.sunset.slice(0, 2));
      const sunRise = Number(timeZoneData.sunrise.slice(0, 2));
      console.log(sunSet);
      console.log(sunRise);
      console.log(time);

      if (time >= sunRise && time <= sunSet) {
        backGround.style.background =
          " url('../src/image/background.jpg') no-repeat center center / cover ";
        wrapper.style.background = "linear-gradient(#22d3ee, #1d4ed8)";
      } else {
        backGround.style.background =
          " url('../src/image/darkBackground.jpg') no-repeat center center / cover ";
        wrapper.style.background = "linear-gradient(#0e7490, #1e3a8a)";
      }

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
