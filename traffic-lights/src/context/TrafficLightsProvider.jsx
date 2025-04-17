import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const TrafficLightsContext = createContext();

export const TrafficLightsProvider = ({ children }) => {
  const [carLight, setCarLight] = useState("green");
  const [pedestrianLight, setPedestrianLight] = useState("red");
  const [countdown, setCountdown] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const car = data.find(d => d.type === "car" && d.isActive);
        const pedestrian = data.find(d => d.type === "pedestrian" && d.isActive);
        if (car) setCarLight(car.color);
        if (pedestrian) setPedestrianLight(pedestrian.color);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const updateSheet = async (carColor, pedestrianColor) => {
    const lightsToSend = [
      { id: 1, type: "car", color: "red", isActive: carColor === "red" },
      { id: 2, type: "car", color: "yellow", isActive: carColor === "yellow" },
      { id: 3, type: "car", color: "green", isActive: carColor === "green" },
      { id: 4, type: "pedestrian", color: "red", isActive: pedestrianColor === "red" },
      { id: 5, type: "pedestrian", color: "green", isActive: pedestrianColor === "green" },
    ];

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(lightsToSend),
    });
  };

  const triggerCountdown = (duration, setCountdownCallback) => {
    return new Promise(resolve => {
      let counter = duration;
      setCountdownCallback(counter);

      const interval = setInterval(() => {
        counter -= 1;
        setCountdownCallback(counter);
        if (counter === 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };

const triggerPedestrianSequence = async () => {
  if (isTransitioning || carLight !== "green") return;

  setIsTransitioning(true);

  setIsWaiting(true); 

  setCarLight("yellow");
  setCountdown(3);  
  updateSheet("yellow", "red");
  await triggerCountdown(3, setCountdown);

  setIsWaiting(false); 

  setCarLight("red");
  setPedestrianLight("green");
  setCountdown(10);  
  updateSheet("red", "green");
  await triggerCountdown(10, setCountdown);

  setPedestrianLight("red");
  setCarLight("yellow");
  setCountdown(3);  
  updateSheet("yellow", "red");
  await triggerCountdown(3, setCountdown);

  setCarLight("green");
  updateSheet("green", "red");
  setCountdown(null);

  setIsTransitioning(false);
};

  return (
    <TrafficLightsContext.Provider
      value={{
        carLight,
        pedestrianLight,
        triggerPedestrianSequence,
        countdown,
        isWaiting,
      }}
    >
      {children}
    </TrafficLightsContext.Provider>
  );
};

export const useTrafficLights = () => useContext(TrafficLightsContext);
