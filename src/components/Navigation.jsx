import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <h1>
        <a href="/">Crewmates App</a>
      </h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Crewmate</Link>
        <Link to="/gallery">Crewmate Gallery</Link>
      </div>
    </nav>
  );
}

export default Navigation;
