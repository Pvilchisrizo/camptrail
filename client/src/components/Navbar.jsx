import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav aria-label="Main navigation">
        <Link to="/">CampTrail</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Log in</Link>
        <Link to="/register">Sign up</Link>
      </nav>
    </header>
  );
}

export default Navbar;
