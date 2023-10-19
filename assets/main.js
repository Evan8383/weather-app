// ! Weather data API. Require Lat and Lon
// ! Geocoding API for getting lon and lat from city name

const loading = document.querySelector('#loading')
const results = document.querySelector('#results')
const searchBar = document.querySelector('#searchBar')
const appContainer = document.querySelector("body > main")
const form = document.querySelector("body > main > section > form")

form.addEventListener('submit', (e)=>{
  e.preventDefault()
  // e.stopImmediatePropagation()
    appContainer.setAttribute('data-status', 'loading')
    searchBar.value = ''
    const test = setInterval(()=>{
      appContainer.setAttribute('data-status', 'results')
      clearInterval(test)
    }, 1000, {once: true})
})

results.addEventListener('click', ()=>{
  appContainer.setAttribute('data-status', '')
})