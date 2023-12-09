let inputs = document.getElementById('inputcity')
let image = document.querySelector('.sunny')


const srchWeather = () => {
  const city = inputs.value.trim()
  if (city === "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a city!',
    });
    return;
  }
  const apiKey = '2f5ce485e24430dda5abc588936a8e76';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputs.value.trim()}&appid=${apiKey}`
  fetch(apiUrl)
    .then((res) => res.json())
    .then(data => {

      if (data.message) {
        //  document.querySelector('.err').style.display = "block"
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'City not found!',
        })
      }

      else {
        // City found
        // document.querySelector('.err').style.display = "none"
      }

      console.log(data)

      document.querySelector('#temp').innerHTML = Math.round(data.main.temp - 273) + "°C";
      document.querySelector('#namecity').innerHTML = data.name;
      document.querySelector('#descrip').innerHTML = data.weather[0].description;
      document.querySelector('#humidP').innerHTML = Math.round(data.main.humidity) + "%";
      document.querySelector('#wind').innerHTML = Math.round(data.wind.speed) + "km/h";
      document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://source.unsplash.com/1600x900/?" + data.name + "')"

      if (data.weather[0].main == "Rain") {
        image.src = 'images/rainy.png'

      }
      else if (data.weather[0].main == "Clouds") {
        image.src = 'images/cloud.png'

      }
      else if (data.weather[0].main == "Clear") {
        image.src = 'images/sunny.png'
      }

      else {
        Swal.fire({
          title: 'Error!',
          text: 'No results Found',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }

    })
    .catch((err) => {
      console.log(err)
    })
}
