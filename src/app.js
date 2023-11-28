const input = document.querySelector("input");
const searchButton = document.querySelector("button");

searchButton.addEventListener("click", () => {
  let getLocation = input.value;
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=c89d696c32c2479ebc294543232411&q=${getLocation}&aqi=no
    `
  )
    .then((res) => res.json())
    .then((content) => {
      const weatherData = content;
      console.log(weatherData);
    })
    .catch((error) => {
      console.error("Error try again", error);
    });
});
