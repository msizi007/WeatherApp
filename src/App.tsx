import { FaSun } from "react-icons/fa6";
import "./App.css";
import Header from "./components/Header/Header";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Searchbar from "./components/Searchbar/Searchbar";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [search, setSearch] = useState("");

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
      setWeatherData(response.data);
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
          <WeatherCard
            day="Today"
            icon={FaSun}
            temperature={Math.round(weatherData.current.temp_c)}
            status="Sunny"
          />
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default App;
