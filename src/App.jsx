import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    "bg-[url('./assets/back.jpg')]"
  );

  const APIkey = "7049505e2b97b870974310086bcf1703";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;
  const searchLocation = (e) => {
    axios.get(url).then((response) => {
      setData(response.data);
      setWeatherBackground(response.data.main.temp);
    });

    setLocation("");
  };

  const setWeatherBackground = (temperature) => {
    console.log(temperature);
    const temps = Math.round(parseInt(temperature) - 273.15);
    if (temps >= 25) {
      setBackgroundImage("bg-[url('./assets/hot.jpg')]");
    } else if (temps >= 15 && temps < 25) {
      setBackgroundImage("bg-[url('./assets/cloudy.jpg')]");
    } else if (temps >= 0 && temps < 15) {
      setBackgroundImage("bg-[url('./assets/cool.jpg')]");
    } else {
      setBackgroundImage("bg-[url('./assets/cold.jpg')]");
    }
  };

  return (
    <div
      className={`min-h-screen bg-cover text text-white flex items-center justify-center ${backgroundImage}`}
    >
      {" "}
      <header className="top-0 fixed text-white italic left-0 font-semibold">
        {" "}
        @SEDICAST
        <div className="text-base font-serif text-orange-700">
          find your location's weather cast
        </div>
      </header>
      <div className="left-2 space-x-2 max-w-fit max-h-96 flex-col top-10 text-2xl font-bold">
        <div className="space-x-2">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Enter Your Location"
            className="rounded-md p-2 text-black font-thin"
          />
          <button
            className=" bg-red-700 text-base rounded-xl p-2.5  "
            onClick={searchLocation}
          >
            Search
          </button>
        </div>
        <div>
          <p>Location: {data.name} </p>
        </div>
        {data.main && (
          <div>
            <h1>{Math.round(data.main.temp - 273.15)}&deg;C</h1>
          </div>
        )}
        {data.main && (
          <div>
            <p>{data.weather[0].description}</p>
          </div>
        )}
        {data.main && (
          <div>
            <p>Feels Like: {Math.round(data.main.feels_like - 273.0)}&deg;C</p>
          </div>
        )}
        {data.main && (
          <div>
            <p>Humidity: {data.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
