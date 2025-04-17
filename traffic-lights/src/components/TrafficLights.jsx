import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Light from "./Light";
import { useTrafficLights } from "../context/TrafficLightsProvider";
import PedestrianTrafficLight from "./PedestrianTrafficLight";
import "../index.css";

const TrafficLights = () => {
  const { orientation } = useParams();
  const { carLight, pedestrianLight, triggerPedestrianSequence, countdown, } = useTrafficLights();
  const carLights = ["red", "yellow", "green"];

  return (
    <motion.div
      className={`traffic-page-container ${orientation}`}
      key={orientation}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`traffic-lights-wrapper ${orientation}`}>
        <div className="traffic-light-block">
          <div className="traffic-light-title">Car Traffic Light</div>
          <div className={`traffic-lights-container ${orientation}`}>
            {carLights.map((color) => (
              <Light
                key={color}
                tlColor={color}
                isActive={carLight === color}
                isBlinking={carLight === color}
                countdown={carLight === color ? countdown : null}
              />
            ))}
          </div>
        </div>

        <div className="traffic-light-block">
          <div className="traffic-light-title">Pedestrian Traffic Light</div>
          <PedestrianTrafficLight
            pedestrianLight={pedestrianLight}
            onButtonClick={triggerPedestrianSequence}
            orientation={orientation}
            countdown={countdown}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TrafficLights;
