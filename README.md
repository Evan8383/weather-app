# Weather App README

This Weather App is a web application that allows users to check the current weather conditions and a 5-day forecast for a location. The app fetches weather data from the OpenWeatherMap API using the provided API key.

## Prerequisites

Before you can run this Weather App, you need to obtain an API key from OpenWeatherMap. You can sign up for an API key at [OpenWeatherMap API](https://openweathermap.org).

## Getting Started

To run the Weather App, follow these steps:

1. Clone or download the repository to your local machine.

2. Open the `index.html` file in a web browser to launch the app.

## Links
Repo: https://github.com/Evan8383/weather-app
Live page: https://evan8383.github.io/weather-app/

## Screenshots
![Screenshot 1](./assets/images/127.0.0.1_5500_index.html%20(1).png)
![Screenshot 2](./assets/images/127.0.0.1_5500_index.html%20(2).png)
![Screenshot 3](./assets/images/127.0.0.1_5500_index.html%20(3).png)
## Usage

### Searching for Weather

1. Enter the name of a city in the search bar.
2. Click the "Search" button to fetch the current weather data for the entered city.
3. The app will display the city name, current temperature, weather icon, wind speed, and humidity.
4. You can also view the 5-day weather forecast by scrolling through the forecast cards.

### Recent Searches

- Click the "Recent Searches" button to view a list of your recent searches.
- Click on a city in the recent searches list to view its weather data again.

## Code Overview

The code is divided into two main parts:

### HTML (`index.html`)

The HTML file contains the structure of the Weather App. It includes input fields, buttons, and placeholders for displaying weather information.

### JavaScript (`main.js`)

The JavaScript file is responsible for handling user interactions and making API requests to fetch weather data. Here is a summary of the key functionalities in the JavaScript code:

- Retrieving DOM elements: The code initializes variables for various HTML elements, making it easier to manipulate the DOM.

- Event Listeners: The code sets up event listeners to handle user interactions, such as clicking the search button and recent searches.

- API Requests: It sends API requests to OpenWeatherMap to fetch weather data and displays it on the app.

- Recent Searches: The app keeps track of recent searches and allows users to revisit them.

- 5-Day Forecast: The code also fetches and displays a 5-day weather forecast for the selected location.

## Dependencies

The Weather App uses the following dependencies:

- [Day.js](https://day.js.org/): A minimalist JavaScript library for handling dates and times.
- [Font Awesome](https://fontawesome.com/): Icons used for the wind speed icon and the percentage icon in the weather display.

## Contributing

If you would like to contribute to this project, feel free to open issues or submit pull requests on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Enjoy using the Weather App to check the weather in your favorite cities! If you encounter any issues or have suggestions for improvements, please don't hesitate to report them.