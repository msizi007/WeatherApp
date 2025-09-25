import { FaSun } from "react-icons/fa6";
import "./App.css";
import Header from "./components/Header/Header";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Searchbar from "./components/Searchbar/Searchbar";
import { useState } from "react";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState("");

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("Latitude:", lat);
          console.log("Longitude:", lon);
          setLatitude(lat);
          setLongitude(lon);

          // You can now use lat & lon to call your weather API
          axios
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  return (
    <>
      <Header location="Cape Town" />
      <Searchbar />
      <WeatherCard day="Today" icon={FaSun} temperature={0} status="Sunny" />
    </>
  );
}

export default App;
