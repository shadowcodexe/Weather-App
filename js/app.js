const search = document.querySelector('.search-bar__icon')

const dropdownMenu = document.querySelector('.dropdown-menu')

const searchInput = document.querySelector('.search-bar__input')

const overlay = document.querySelector('.overlay')

const container = document.querySelector('.container')

let citiesList = ['Vinnytsia', 'Dnipro', 'Donetsk', 'Zhytomyr', 'Zaporizhzhia', 'Ivano-Frankivsk', 'Kyiv', 'Kropyvnytskyi', 'Luhansk', 'Lutsk', 'Lviv', 'Mykolayiv', 'Odessa', 'Poltava', 'Rivne', 'Simferopol', 'Sumy', 'Ternopil', 'Uzhhorod', 'Kharkiv', 'Kherson', 'Khmelnytskyi', 'Cherkasy', 'Chernivtsi']

let geoposition = document.querySelector('.geoposition')

let temperature = document.querySelector('.temperature')

let weatherCondition = document.querySelector('.weather-condition')

let weatherIcon = document.querySelector('.weather-condition__icon')

let humidityPercent = document.querySelector('.humidity')

let windSpeed = document.querySelector('.wind-speed')

let weatherBlockInfo = document.querySelector('.weather-block-info')

let weatherBlockSecondary = document.querySelector('.weather-block-secondary')


search.addEventListener('click',searchActive)

function fillOptions() {

    citiesList.forEach(el => {
        let option = document.createElement('div')

        option.innerHTML = el

        option.classList.add('dropdown-menu__option')

        dropdownMenu.appendChild(option)
        
        option.addEventListener('click',() => {

            container.style.height = '80vh'

            overlay.classList.remove('active')

            search.removeEventListener('click',searchDisable)
            
            search.addEventListener('click',searchActive)
            
            dropdownMenu.className = 'dropdown-menu'
            
            searchInput.style.borderBottomLeftRadius = 18 + 'px'
            
            searchInput.style.borderBottomRightRadius = 18 + 'px'

            searchInput.style.opacity = .5

            getWeatherAPI(option.innerHTML)
            .then((data) => {

                console.log(data)

                geoposition.innerHTML = `Ukraine, ${option.innerHTML}`

                temperature.innerHTML = `${Math.floor(data.main.temp)}°C`

                humidityPercent.innerHTML = `Humidity: ${data.main.humidity}%`

                switch(data.weather[0].main) {
                    
                    case 'Clear':

                        weatherIcon.src = 'src/icons/sun.png'

                        weatherIcon.style.opacity = 1

                        weatherCondition.textContent = 'Clear sky'

                        break

                    case 'Clouds':

                        weatherCondition.textContent = 'Cloudy'

                        weatherIcon.src = 'src/icons/cloud.png'
                        
                        weatherIcon.style.opacity = 1

                        break

                    case 'Snow':

                        weatherCondition.textContent = 'Snowy'

                        weatherIcon.style.opacity = 1

                        weatherIcon.src = 'src/icons/snow.png'
                        
                        break

                    case 'Rain':

                        weatherCondition.textContent = 'Rainy'

                        weatherIcon.style.opacity = 1

                        weatherIcon.src = 'src/icons/rainy.png'

                        break
                }

                windSpeed.innerHTML = `Wind speed: ${data.wind.speed} km/h`

                updateLocal()

            })
        })
    })

}

fillOptions()

searchInput.addEventListener('input',searchFilterFunction)

function searchFilterFunction() {

    dropdownMenu.className = 'dropdown-menu-active'

    dropdownMenu.innerHTML = ''

    this.style.borderBottomLeftRadius = 0 + 'px'

    this.style.borderBottomRightRadius = 0 + 'px'

    this.style.opacity = 1

    overlay.style.opacity = 1

    overlay.style.pointerEvents = 'all'

    overlay.addEventListener('click', () => {

        openOrCloseDropdown(18,.5,false)

        overlay.classList.remove('active')

        overlay.style.opacity = 0

        overlay.style.pointerEvents = 'none'

        search.addEventListener('click',searchActive)
    })

    let newList = citiesList.filter(el => el.startsWith(searchInput.value))

    newList.forEach(el => {
        let option = document.createElement('div')

        option.className = 'dropdown-menu__option'

        option.innerHTML = el

        option.addEventListener('click',() => {
            {
                overlay.classList.remove('active')

                overlay.style.opacity = 0

                overlay.style.pointerEvents = 'none'
            
                search.removeEventListener('click',searchDisable)
                
                search.addEventListener('click',searchActive)

                container.style.height = '80vh'
                
                dropdownMenu.className = 'dropdown-menu'
                
                searchInput.style.borderBottomLeftRadius = 18 + 'px'
                
                searchInput.style.borderBottomRightRadius = 18 + 'px'

                searchInput.style.opacity = .5
    
                getWeatherAPI(option.innerHTML)
                .then((data) => {
    
                    console.log(data)
    
                    geoposition.innerHTML = `Ukraine, ${option.innerHTML}`
    
                    temperature.innerHTML = `${Math.floor(data.main.temp)}°C`
    
                    humidityPercent.innerHTML = `Humidity: ${data.main.humidity}%`
    
                    switch(data.weather[0].main) {
                        
                        case 'Clear':
    
                            weatherIcon.src = 'src/icons/sun.png'
    
                            weatherIcon.style.opacity = 1
    
                            weatherCondition.textContent = 'Clear sky'
    
                            break
    
                        case 'Clouds':
    
                            weatherCondition.textContent = 'Cloudy'
    
                            weatherIcon.src = 'src/icons/cloud.png'
                            
                            weatherIcon.style.opacity = 1
    
                            break
    
                        case 'Snow':
    
                            weatherCondition.textContent = 'Snowy'
    
                            weatherIcon.src = 'src/icons/snow.png'
                            
                            break
    
                        case 'Rain':
    
                            weatherCondition.textContent = 'Rainy'
    
                            weatherIcon.src = 'src/icons/rainy.png'
    
                            break
                    }
    
                    windSpeed.innerHTML = `Wind speed: ${data.wind.speed} km/h`

                    updateLocal()
    
                })
    
            }
        })

        dropdownMenu.appendChild(option)
    })
}

function searchDisable() {

    overlay.classList.remove('active')

    openOrCloseDropdown(18,.5,false)

    this.addEventListener('click',searchActive)

}

function openOrCloseDropdown(px,op,status) {
    overlay.classList.add('active')

    searchInput.style.borderBottomLeftRadius = px + 'px'

    searchInput.style.borderBottomRightRadius = px + 'px'

    searchInput.style.opacity = op

    if (status) {
        
        dropdownMenu.className = 'dropdown-menu-active'

    } else {

        dropdownMenu.className = 'dropdown-menu'

    }

}

function searchActive() {

    openOrCloseDropdown(0,1,true)

    overlay.addEventListener('click', () => {

            openOrCloseDropdown(18,.5,false)

            overlay.classList.remove('active')

            search.addEventListener('click',searchActive)
    })

    this.removeEventListener('click',searchActive) 

    this.addEventListener('click',searchDisable)

}

async function getWeatherAPI(city) {

    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=08220894fadd2470d1417a4ce413f0b8`)

    const response = await request.json()

    const result = await response
    
    return result

}

function updateLocal() {

    localStorage.setItem('activeWeather',weatherBlockInfo.innerHTML)

}