import {
  useContext,
  createContext,
  useState,
  useEffect,
  
} from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("bhubaneswar");
  const [thisLocation, setLocation] = useState("");
  const fetchWeather = async () => {
    // const options = {
    //   method: "GET",
    //   url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
    //   params: {
    //     aggregateHours: "24",
    //     location: place,
    //     contentType: "json",
    //     unitGroup: "metric",
    //     shortColumnNames: 0,
    //   },
    //   headers: {
    //     "x-rapidapi-key": "81a170e592msh6a271bce2a7524ap109e15jsna70f95d66a50",
    //     "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
    //   },
    // };

    try {
        const response = await axios.get('https://visual-crossing-weather.p.rapidapi.com/forecast', {
            params: {
              aggregateHours: '24',
              location: place,
              contentType: 'json',
              unitGroup: 'metric',
              shortColumnNames: 0,
            },
            headers: {
              'x-rapidapi-key': '81a170e592msh6a271bce2a7524ap109e15jsna70f95d66a50',
              'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
            },
          });
    //   const response = await axios.request(options);
      console.log(response.data);
      const thisData = Object.values(response.data.locations)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
    } catch (e) {
      console.error(e);
      // if the api throws error.
      alert("This place does not exist");
    }
  };
  useEffect(() => {
    fetchWeather()
}, [place])

useEffect(() => {
    console.log(values)
}, [values])

return (
    <StateContext.Provider value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place
    }}>
        {children}
    </StateContext.Provider>
)
};
export const useStateContext = () => useContext(StateContext)