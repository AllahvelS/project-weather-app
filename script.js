const form = document.querySelector("form")
const submit = document.querySelector("submit-button")
const main = document.querySelector("main")
const info = document.querySelector("#location-name").innerHTML
console.log(info)

form.addEventListener("submit", (event)=> {
    event.preventDefault()

    const locationInput = event.target[0].value
    
   weatherPage(locationInput)
})
function weatherPage(locationInput){
    //fetch information from any inputted location
    fetch(`https://wttr.in/${locationInput}?format=j1`)
    .then((response) => response.json())
    .then((data) =>  {
        
                const upcoming = document.querySelectorAll(".upcoming")
                const forecast = data.weather
                const today = forecast[0]
                const tomorrow = forecast[1]
                const dayAfterTomorrow = forecast[2]
                let near = data.nearest_area[0]
                let region = near.region[0].value
                let country = near.country[0].value
                let currently = data.current_condition[0].FeelsLikeF
                const article = document.querySelector("#current-weather")
                
                //console.log(data.current_condition)

                let hour = data.weather[0].hourly[0]
                let sun = hour.chanceofsunshine
                let rain = hour.chanceofrain
                let snow = hour.chanceofsnow
                let weatherIcon = document.getElementById("weather-icon")

            
          if(sun > 50){
            weatherIcon.src = 'assets/icons8-summer.gif'
            weatherIcon.alt = 'sun'
          } 
          else if(rain > 50){
            weatherIcon.src = 'assets/icons8-torrential-rain.gif'
            weatherIcon.alt = 'rain'
          }
          else if(snow > 50){
            weatherIcon.src = 'assets/icons8-light-snow.gif'
            weatherIcon.alt = 'snow'
          } 
          else{
            weatherIcon.src = 'assets/icons8-rain-cloud.gif'
            weatherIcon.alt = 'light rain'
          }
          
          //console.log(weatherIcon)
        article.innerHTML = `
        ${weatherIcon.outerHTML}
        <p id="area"><strong>Nearest Area: </strong>${locationInput}</p>
        <p 
        id="region"><strong>Region: </strong>${region}</p>
        <p 
        id="country"><strong>Country: </strong>${country}</p>
        <p 
        id="currently"><strong>Currently: </strong>Feels Like 
        ${currently}°F</p>

        <p id="sun"><strong>Chance of Sunshine: </strong>${sun}%</p>
        <p id="rain"><strong>Chance of Rain: </strong>${rain}%</p>
        <p id="snow"><strong>Chance of Snow: </strong>${snow}%</p>
        `        
          //console.log(weatherIcon.innerHTML)
          console.log(weatherIcon.outerHTML)
          if(locationInput){
            if(document.querySelector("#no-search")){
               document.querySelector("#no-search").remove()
           }
           const unOrdered = document.querySelector(".weather-history ul")
           const search = document.createElement("li")
           const link = document.createElement("a")
         
           link.addEventListener("click", (event) =>{

            weatherPage(locationInput)
           })
           
           link.setAttribute("href", "#")
           link.innerText = `${locationInput}`
           search.innerText = ` - ${currently}°F`
           
           //Removes duplicate links when clicking link to city in previous searches
           const existingLink = Array.from(unOrdered.querySelectorAll('a')).find((a) =>
           a.innerText === link.innerText)
           
           if(!existingLink){
               unOrdered.prepend(search) 
               search.prepend(link)
           }
           //console.log(article.innerHTML)
       }
        

        upcoming[0].innerHTML = `
        <h4>Today</h4>
        <h5>Average Temperature:</h5>
        <p>${today.avgtempF}°F</p>
        <h5>Max Temperature:</h5>
        <p>${today.maxtempF}°F</p>
        <h5>Min Temperature:</h5>
        <p>${today.mintempF}°F</p>
        `
        upcoming[1].innerHTML = `
        <h4>Tomorrow</h4>
        <h5>Average Temperature:</h5>
        <p>${tomorrow.avgtempF}°F</p>
        <h5>Max Temperature:</h5>
        <p>${tomorrow.maxtempF}°F</p>
        <h5>Min Temperature:</h5>
        <p>${tomorrow.mintempF}°F</p>
        `
        upcoming[2].innerHTML = `
        <h4>Day After Tomorrow</h4>
        <h5>Average Temperature:</h5>
        <p>${dayAfterTomorrow.avgtempF}°F</p>
        <h5>Max Temperature:</h5>
        <p>${dayAfterTomorrow.maxtempF}°F</p>
        <h5>Min Temperature:</h5>
        <p>${dayAfterTomorrow.mintempF}°F</p>
        `
        upcoming.append(main)
    })
    .catch((error) =>{
        console.log(error);
    });
    

form.reset()
}


const converter = document.querySelector("#temperature-converter")
const farenheit = document.querySelector("#to-f")
const celsius = document.querySelector("#to-c")
const convertedTemp = document.querySelector("#converted-temperature")
let value = 0

converter.addEventListener("submit", (event)=> {
    event.preventDefault()
    // const convertInput = document.querySelector("temp-to-convert")
   const convertInput = event.target[0].value
    
   if(celsius.checked){
      value = (convertInput * 9/5) + 32
      convertedTemp.innerText = value.toFixed(2)
    console.log(value)
}
    else { 
        value = (convertInput - 32) * 5/9
        convertedTemp.innerText = value.toFixed(2)
        console.log(value)
        
}
 })