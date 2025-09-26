import "./App.css";
import Header from "./components/Header/Header";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Searchbar from "./components/Searchbar/Searchbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Hourlychart from "./components/HourlyChart/Hourlychart";
import { addCity } from "./utils/storage";

interface Hour {
  temp_c: number;
  temp_f: number;
  chance_of_rain: number;
  // other properties...
}

type ForecastDay = {
  hour: Hour[];
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    avghumidity: number;
    condition: {
      text: string;
    };
    maxwind_kph: number;
  };
};

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
  current: {
    temp_c: number;
    temp_f: number;
    humidity: number;
    wind_kph: number;
  };
  // other properties...
}

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [search, setSearch] = useState("");
  const [hourlyTemp, setHourlyTemp] = useState<number[]>([]);
  const [hourlyRain, setHourlyRain] = useState<number[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCelcius, setIsCelcius] = useState(true);
  const [changeCity, setChangeCity] = useState("");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  const fetchWeather = async (q: string, days: number) => {
    try {
      const response = await axios.get(
        "https://weatherapi-com.p.rapidapi.com/forecast.json",
        {
          params: {
            q: q,
            days: days,
          },
          headers: {
            "X-RapidAPI-Key":
              "179dfa5fd3msh772857b01a679bap11c067jsnbcd94abadcc8",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      console.log("Weather data:", response.data);
      setCity(response.data.location.name);
      setCountry(response.data.location.country);
      setWeatherData(response.data);

      // if units in celcius
      if (isCelcius) {
        setHourlyTemp(
          response.data.forecast.forecastday[0].hour.map(
            (hour: Hour) => hour.temp_c
          )
        );
      }
      // if units in fahrenheit
      else {
        setHourlyTemp(
          response.data.forecast.forecastday[0].hour.map(
            (hour: Hour) => hour.temp_f
          )
        );
      }
      setHourlyRain(
        response.data.forecast.forecastday[0].hour.map(
          (hour: Hour) => hour.chance_of_rain
        )
      );

      console.log("data", response.data.forecast.forecastday[0]);

      // adding the city
      addCity({ name: response.data.location.name, isPinned: false });
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    }
  };

  useEffect(() => {
    if (search) {
      fetchWeather(search, 7);
    }
  }, [changeCity]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather(`${latitude},${longitude}`, 7);
    }
  }, [latitude, longitude]);

  return (
    <>
      {weatherData ? (
        <>
          <Header
            city={city}
            country={country}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onSearch={(city) => fetchWeather(city, 7)}
            isCelcius={isCelcius}
            setIsCelcius={setIsCelcius}
            setSearchInput={setSearch}
            setCityChange={setChangeCity}
            fetchWeather={() => fetchWeather(changeCity, 7)}
          />
          <Searchbar
            input={search}
            setInput={setSearch}
            onSearch={() => fetchWeather(search, 7)}
          />
          <div className="row">
            <WeatherCard
              day="Today"
              temperature={
                isCelcius
                  ? Math.round(
                      weatherData.forecast.forecastday[0].day.avgtemp_c
                    )
                  : Math.round(
                      weatherData.forecast.forecastday[0].day.avgtemp_f
                    )
              }
              humidity={weatherData.forecast.forecastday[0].day.avghumidity}
              windSpeed={weatherData.forecast.forecastday[0].day.maxwind_kph}
              status={weatherData.forecast.forecastday[0].day.condition.text.trim()}
            />
            <WeatherCard
              day="Tommorow"
              temperature={
                isCelcius
                  ? Math.round(
                      weatherData.forecast.forecastday[1].day.avgtemp_c
                    )
                  : Math.round(
                      weatherData.forecast.forecastday[1].day.avgtemp_f
                    )
              }
              humidity={weatherData.forecast.forecastday[1].day.avghumidity}
              windSpeed={weatherData.forecast.forecastday[1].day.maxwind_kph}
              status={weatherData.forecast.forecastday[1].day.condition.text.trim()}
            />
            <WeatherCard
              day="In 2 Days"
              temperature={
                isCelcius
                  ? Math.round(
                      weatherData.forecast.forecastday[2].day.avgtemp_c
                    )
                  : Math.round(
                      weatherData.forecast.forecastday[2].day.avgtemp_f
                    )
              }
              humidity={weatherData.forecast.forecastday[2].day.avghumidity}
              windSpeed={weatherData.forecast.forecastday[2].day.maxwind_kph}
              status={weatherData.forecast.forecastday[2].day.condition.text.trim()}
            />
          </div>
          <Hourlychart
            temp_data={hourlyTemp}
            rain_data={hourlyRain}
            isCelcius={isCelcius}
          />
        </>
      ) : (
        <div className="center">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default App;
