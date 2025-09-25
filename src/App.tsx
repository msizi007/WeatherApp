import { FaSun } from "react-icons/fa6";
import "./App.css";
import Header from "./components/Header/Header";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Searchbar from "./components/Searchbar/Searchbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Hourlychart from "./components/HourlyChart/Hourlychart";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [hourlyTemp, setHourlyTemp] = useState<number[]>([]);
  const [hourlyRain, setHourlyRain] = useState<number[]>([]);
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
      setCity(
        `${response.data.location.name}, ${response.data.location.region}, ${response.data.location.country}`
      );
      setWeatherData(response.data);
      setHourlyTemp(
        response.data.forecast.forecastday[0].hour.map(
          (hour: any) => hour.temp_c
        )
      );
      setHourlyRain(
        response.data.forecast.forecastday[0].hour.map(
          (hour: any) => hour.chance_of_rain
        )
      );
      console.log("forecast...", response.data.forecast.forecastday[0]);
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    }
  };

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
          <Header location={city} />
          <Searchbar
            input={search}
            setInput={setSearch}
            onSearch={() => fetchWeather(search, 7)}
          />
          <div className="row">
            <WeatherCard
              day="Today"
              temperature={Math.round(weatherData.current.temp_c)}
            />
            <WeatherCard
              day="Tommorow"
              temperature={Math.round(
                weatherData.forecast.forecastday[1].day.avgtemp_c
              )}
            />
            <WeatherCard
              day="In 2 Days"
              temperature={Math.round(
                weatherData.forecast.forecastday[2].day.avgtemp_c
              )}
            />
          </div>
          <Hourlychart temp_data={hourlyTemp} rain_data={hourlyRain} />
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default App;
