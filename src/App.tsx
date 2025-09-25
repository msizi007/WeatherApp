import { FaSun } from "react-icons/fa6";
import "./App.css";
import Header from "./components/Header/Header";
import WeatherCard from "./components/WeatherCard/WeatherCard";

function App() {
  return (
    <>
      <Header location="Cape Town" />
      <WeatherCard day="Today" icon={FaSun} temperature={0} status="Sunny" />
    </>
  );
}

export default App;
