// ! Weather data API. Require Lat and Lon
// ! Geocoding API for getting lon and lat from city name

const loading = document.querySelector('#loading')
const results = document.querySelector('#results')
const searchBar = document.querySelector('#searchBar')
const appContainer = document.querySelector("body > main")
const form = document.querySelector("body > main > section > form")

let mouseDown = false;
let startX, scrollLeft;
const slider = document.querySelector('#slider');

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
  if(!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
}

// Add the event listeners
slider.addEventListener('mousemove', move, false);
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);
