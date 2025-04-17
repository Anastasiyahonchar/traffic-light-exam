import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import TrafficLights from "./components/TrafficLights";
import { TrafficLightsProvider } from "./context/TrafficLightsProvider"; 
import "./App.css";

const App = () => {
  return (
    <TrafficLightsProvider>
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/traffic-lights/:orientation" element={<TrafficLights />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </TrafficLightsProvider>
  );
};

export default App;
