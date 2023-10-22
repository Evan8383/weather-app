function getWeather(){
  fetch(geoUrl)
  .then(res => res.json())
  .then(data => {
    let weatherIcon = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    largeIcon.setAttribute('src', iconUrl)

    currentCity.textContent = data.name
    todayTemp.innerHTML = `${Math.floor(data.main.temp)} <span>&#176;</span>`
    todayWind.innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.floor(data.wind.speed)}mph`
    todayHumid.innerHTML = `RH: ${Math.floor(data.main.humidity)} <i class="fa-solid fa-percent"></i>`

    getFiveDayForecast(data.coord.lat, data.coord.lon)
  })
}

function getFiveDayForecast(lat, lon){
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
            value.innerHTML = `RH: ${Math.floor(fiveDayHumid[i])} <i class="fa-solid fa-percent"></i> `
          })
          recentSearchBtn.enable
          loader.classList.add('hidden')
          resultSection.classList.remove('hidden')
        })
    }