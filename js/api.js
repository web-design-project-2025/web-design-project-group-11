function loadWeather(countries) {
  //console.log(countries);
  console.log(countries[0]);

  const lat = countries[0].location.latitude;
  const lon = countries[0].location.longitude;

  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather data:", data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const temperatures = data.current.temperature_2m;
      temperatureElement = document.getElementById("temperature");
      temperature.textContent = temperatures;
      //temperatures.forEach((temp, index) => {
      //console.log(`Temperature at hour ${index}: ${temp}`);
      //});
    });
}
