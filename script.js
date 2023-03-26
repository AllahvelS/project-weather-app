const form = document.querySelector("form")
const submit = document.querySelector("submit-button")
const main = document.querySelector("main")
const info = document.querySelector("#location-name").innerHTML
console.log(info)

form.addEventListener("submit", (event)=> {
    event.preventDefault()

    const locationInput = event.target[0].value

    
    
    // const locationInput = document.querySelector("#location-input")
    // console.log(locationInput.value)
    
    fetch(`https://wttr.in/${locationInput}?format=j1`)
    .then((response) => response.json())
    .then((data) =>  {
        console.log(data.current_condition)
        let near = data.nearest_area[0]
        let region = near.region[0].value
        let country = near.country[0].value
        let currently = data.current_condition[0].FeelsLikeF
        const article = document.querySelector("#current-weather")
        
        article.innerHTML = `
        <p id="area">${locationInput}</p>
        <p id="region">${region}</p>
        <p id="country">${country}</p>
        <p id="currently">${currently}</p>
        `
        
        if(locationInput){
           if(document.querySelector("#no-search")){
            document.querySelector("#no-search").remove()
           }
           const unOrdered = document.querySelector(".weather-history ul")
           const search = document.createElement("li")
           const link = document.createElement("a")
           link.setAttribute("href", `https://wttr.in/${locationInput}`)
           link.innerText = `${locationInput} - ${currently}°F`
           search.appendChild(link)
        //    search.innerText + ` - ${currently}°F`
           unOrdered.prepend(search)
        }
        
        console.log(article.innerHTML)


        const upcoming = document.querySelectorAll(".upcoming")
        const forecast = data.weather
        const today = forecast[0]
        const tomorrow = forecast[1]
        const dayAfterTomorrow = forecast[2]

        upcoming[0].innerHTML = `
        <h4>Today</h4>
        <h4>Average Temperature:</h4>
        <p>${today.avgtempF}</p>
        <h4>Max Temperature:</h4>
        <p>${today.maxtempF}</p>
        <h4>Min Temperature:</h4>
        <p>${today.mintempF}</p>
        `
        upcoming[1].innerHTML = `
        <h4>Tomorrow</h4>
        <h4>Average Temperature:</h4>
        <p>${tomorrow.avgtempF}</p>
        <h4>Max Temperature:</h4>
        <p>${tomorrow.maxtempF}</p>
        <h4>Min Temperature:</h4>
        <p>${tomorrow.mintempF}</p>
        `
        upcoming[2].innerHTML = `
        <h4>Day After Tomorrow</h4>
        <h4>Average Temperature:</h4>
        <p>${dayAfterTomorrow.avgtempF}</p>
        <h4>Max Temperature:</h4>
        <p>${dayAfterTomorrow.maxtempF}</p>
        <h4>Min Temperature:</h4>
        <p>${dayAfterTomorrow.mintempF}</p>
        `
        upcoming.append(main)
    })
    .catch((error) =>{
        console.log(error);
    });

event.target.reset()
});