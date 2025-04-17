import Light from "./Light";
import PropTypes from "prop-types";
import { useTrafficLights } from "../context/TrafficLightsProvider";
import "../index.css";

const PedestrianTrafficLight = ({ pedestrianLight, onButtonClick, orientation, countdown, }) => {
  const pedestrianLights = ["red", "green"];
  const { isWaiting } = useTrafficLights();

  return (
    <div className="pedestrian-section">
      <div className={`traffic-lights-container ${orientation}`}>
        {pedestrianLights.map((color) => (
          <Light
            key={color}
            tlColor={color}
            isActive={pedestrianLight === color}
            isBlinking={pedestrianLight === color}
            countdown={
                color === "red" && pedestrianLight === "red" && isWaiting
                  ? countdown
                  : color === "green" && pedestrianLight === "green"
                  ? countdown
                  : null
              }
          />
        ))}
      </div>
      <button className="pedestrian-button" onClick={onButtonClick}>
        Cross the Road
      </button>
    </div>
  );
};

PedestrianTrafficLight.propTypes = {
  pedestrianLight: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  orientation: PropTypes.string,
  countdown: PropTypes.number,
};

export default PedestrianTrafficLight;
