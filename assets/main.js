// document selectors
const results = document.querySelector('#results')
const searchBar = document.querySelector('#searchBar')
const searchBtn = document.querySelector('#searchBtn')
const resultSection = document.querySelector('#resultSection')
const loader = document.querySelector('#loader')
const currentCity = document.querySelector("#currentCity")
const largeIcon = document.querySelector("#largeIcon")
const todayTemp = document.querySelector("#todayTemp")
const todayWind = document.querySelector("#todayWind")
const todayHumid = document.querySelector("#todayHumid")
const todayDate = document.querySelector("#todayDate")
const todayDay = document.querySelector("#todayDay")

const recentSearchBtn = document.querySelector('#recentSearchBtn')
const recentSearchList = document.querySelector('#recentSearchList')

// dayjs selectors
const currentDate = dayjs()
const getTodayDay = dayjs().format('dddd')
const getTodayDate = dayjs().format('MM/DD/YYYY')

// global search value that is set, then used to call getWeather function
let searchedValue


searchBtn.addEventListener('click', (event) => { // event listener for city search bar
  event.preventDefault()

  searchedValue = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value},&appid=548a7af7dc28b5422813335d1da2e872&units=imperial`

  loader.classList.remove('hidden') // shows the loading animation

  todayDay.textContent = getTodayDay // displays the current day
  todayDate.textContent = getTodayDate // displays the current date

  getWeather(searchedValue) // calls function to retrieve the days weather
  recentSearchList.classList.remove('active') // hides the recently searched list if its open
  searchedValue = '' // resets the searchedValue variable
})

recentSearchList.addEventListener('click', (e) => { // event listener for the recently searched list
  if (e.target.nodeName === 'SPAN') { // if the 'x' is clicked it removes the line item
    e.target.parentElement.remove()
    saveLocalStorage()
  } else { // if the line item is clicked, the app shows results for that city
    loader.classList.remove('hidden') 

    searchedValue = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.textContent.slice(0, -1)},&appid=548a7af7dc28b5422813335d1da2e872&units=imperial` // new url to pass to get weather
    getWeather(searchedValue)

    searchedValue = ''
    recentSearchList.classList.remove('active')
  }
})

recentSearchBtn.addEventListener('click', toggleSearchMenu) // opens and closed the recent search list menu

function getWeather(url) { // function to fetch weather info
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Invalid location') // throws error is page can not be located
      }
      return res.json()
    })
    .then(data => {
      getFiveDayForecast(data.coord.lat, data.coord.lon)

      let weatherIcon = data.weather[0].icon
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
      largeIcon.setAttribute('src', iconUrl)
 
      // sets DOM elements based on API data return
      currentCity.textContent = data.name
      todayTemp.innerHTML = `${Math.floor(data.main.temp)} <span>&#176;</span>`
      todayWind.innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.floor(data.wind.speed)}mph`
      todayHumid.innerHTML = `RH: ${Math.floor(data.main.humidity)} <i class="fa-solid fa-percent"></i>`

      if (searchBar.value.length > 0) { // ! prevents empty strings getting added to recent search list
        addRecentSearch() // adds the appropriate html elements to display the recent search
        saveLocalStorage() // saves the inner HTML to local storage
        searchBar.value = ''
      }

    })
    .catch((err) => { // catches and displays errors
      loader.classList.add('hidden')
      const errorMsg = document.querySelector('#errorMsg')
      errorMsg.style.color = 'red'
      errorMsg.textContent = err
      searchBar.value = ''
      setInterval(() => { // clears the error message after 2 seconds
        errorMsg.textContent = ''
      }, 2000)
      clearInterval()
      console.error(err)
    })
}

function getFiveDayForecast(lat, lon) { // secondary fetch to get information for 5 day forecast.
  const coordUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=548a7af7dc28b5422813335d1da2e872&units=imperial`

  fetch(coordUrl)
    .then(res => res.json())
    .then(data => {
      let fiveDayTemp = []
      let fiveDayIcon = []
      let fiveDayDate = []
      let fiveDayWind = []
      let fiveDayHumid = []

      const futureTemp = document.querySelectorAll('.future-temp')
      const futureIcon = document.querySelectorAll('.weather-sub-card img')
      const futureDate = document.querySelectorAll('.future-date')
      const futureWind = document.querySelectorAll('.future-wind')
      const futureHumid = document.querySelectorAll('.future-humid')

      data.list.forEach(item => {
        const daysDate = new Date(item.dt * 1000)
        if (daysDate.getHours() === 11) { // checks all API responses that are returned. only works with responses for the 11 o'clock hour to get average temperature for 5 day forecast

          // pushes info into arrays
          fiveDayTemp.push(item.main.temp)
          let fiveDayIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
          fiveDayIcon.push(fiveDayIconUrl)
          fiveDayWind.push(item.wind.speed)
          fiveDayHumid.push(item.main.humidity)
        }
      })

      // loops through arrays above and maps data to each card for the next 5 days
      futureTemp.forEach((temp, i) => {
        temp.innerHTML = `${Math.floor(fiveDayTemp[i])} <span>&#176;</span>`
      })
      futureIcon.forEach((icon, i) => {
        icon.setAttribute('src', fiveDayIcon[i])
      })
      for (let i = 0; i < 5; i++) {
        const nextDate = currentDate.add(i + 1, 'day');
        fiveDayDate.push(nextDate.format('ddd MM/DD'));
      }
      futureDate.forEach((day, i) => {
        day.textContent = fiveDayDate[i]
      })
      futureWind.forEach((value, i) => {
        value.innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.floor(fiveDayWind[i])} mph`
      })
      futureHumid.forEach((value, i) => {
        value.innerHTML = `RH: ${Math.floor(fiveDayHumid[i])} <i class="fa-solid fa-percent"></i> `
      })

      loader.classList.add('hidden') // removes loading animation
      resultSection.classList.remove('hidden') // shows results
    })
}

function toggleSearchMenu() {
  recentSearchList.classList.toggle('active')
  renderLocalStorage()
}

function addRecentSearch() { // adds search bar value to recent search list
  const createHistoryItem = document.createElement('li')
  const removeSearchItem = document.createElement('span')
  removeSearchItem.innerHTML = '\u00d7'

  createHistoryItem.textContent = searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1)
  recentSearchList.prepend(createHistoryItem)
  createHistoryItem.appendChild(removeSearchItem)

}

function saveLocalStorage() { // saves recent search list to local storage
  localStorage.setItem('recentSearches', recentSearchList.innerHTML)
}

function renderLocalStorage() { // displays local storage
  const searchHistory = localStorage.getItem('recentSearches')
  recentSearchList.innerHTML = searchHistory
}

// functionality for horizontal sliding for 5 day forecast
const slider = document.querySelector('#slider');
let interactionActive = false;
let startX, scrollLeft;

const startDragging = (e) => {
  interactionActive = true;
  startX = (e.type === 'touchstart') ? e.touches[0].pageX : e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};

const stopDragging = () => {
  interactionActive = false;
};

const move = (e) => {
  e.preventDefault();
  if (!interactionActive) return;
  const x = (e.type === 'touchmove') ? e.touches[0].pageX : e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
};

slider.addEventListener('touchstart', startDragging, false);
slider.addEventListener('touchmove', move, false);
slider.addEventListener('touchend', stopDragging, false);
slider.addEventListener('touchleave', stopDragging, false);

slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mousemove', move, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);