import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../index.css";

const Light = ({ tlColor = "red", isActive, isBlinking, countdown }) => {
  const [blink, setBlink] = useState(isBlinking);

  useEffect(() => {
    setBlink(isActive && isBlinking);
  }, [isActive, isBlinking]);

  return (
    <motion.div
      className={`light ${tlColor}`}
      animate={blink ? { opacity: [0.5, 1, 0.5, 1, 1] } : { opacity: isActive ? 1 : 0.5 }}
      transition={{ duration: 1, repeat: blink ? 2 : 0 }}
    >
      {isActive && countdown > 0 && (
        <span className="countdown-text">{countdown}</span>
      )}
    </motion.div>
  );
};

Light.propTypes = {
  tlColor: PropTypes.string,
  isActive: PropTypes.bool,
  isBlinking: PropTypes.bool,  
  countdown: PropTypes.number,
};

export default Light;
