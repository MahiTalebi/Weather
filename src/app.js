const input = document.querySelector("input");
const searchButton = document.querySelector("button");

searchButton.addEventListener("click", () => {
  let getLocation = input.value;
  console.log(getLocation);
});
