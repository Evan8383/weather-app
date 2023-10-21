// API key 548a7af7dc28b5422813335d1da2e872

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

const currentDate = dayjs()
const getTodayDay = dayjs().format('dddd')
const getTodayDate = dayjs().format('MM/DD/YYYY')

searchBtn.addEventListener('click', (event) => {
  event.preventDefault()
  loader.classList.remove('hidden')
  const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value.split(' ').join(',')},&appid=548a7af7dc28b5422813335d1da2e872&units=imperial`
  searchBar.value = ''

  todayDay.textContent = getTodayDay
  todayDate.textContent = getTodayDate


  fetch(geoUrl)
    .then(res => res.json())
    .then(data => {
      let weatherIcon = data.weather[0].icon
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`
      largeIcon.setAttribute('src', iconUrl)

      currentCity.textContent = data.name
      todayTemp.innerHTML = `${Math.floor(data.main.temp)} <span>&#176;</span>`
      todayWind.innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.floor(data.wind.speed)}mph`
      todayHumid.innerHTML = `<i class="fa-solid fa-percent"></i> ${Math.floor(data.main.humidity)}`

      const lat = data.coord.lat
      const lon = data.coord.lon
      const coordUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&&appid=548a7af7dc28b5422813335d1da2e872&units=imperial`

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
            if (daysDate.getHours() === 11) {
              fiveDayTemp.push(item.main.temp)
              let fiveDayIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
              fiveDayIcon.push(fiveDayIconUrl)
              fiveDayWind.push(item.wind.speed)
              fiveDayHumid.push(item.main.humidity)
            }
          })
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
            value.innerHTML = `<i class="fa-solid fa-percent"></i> ${Math.floor(fiveDayHumid[i])}`
          })
          loader.classList.add('hidden')
          resultSection.classList.remove('hidden')
        })
    })
})





const slider = document.querySelector('#slider');
let mouseDown = false;
let startX, scrollLeft;

const startDragging = (e) => {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

const stopDragging = (e) => {
  mouseDown = false;
}

const move = (e) => {
  e.preventDefault();
  if (!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
}

// Add the event listeners
slider.addEventListener('mousemove', move, false);
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);