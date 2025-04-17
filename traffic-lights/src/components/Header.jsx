import { NavLink } from "react-router-dom";
import "../index.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/traffic-lights/horizontal">
              Horizontal
            </NavLink>
          </li>
          <li>
            <NavLink to="/traffic-lights/vertical">
              Vertical
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;