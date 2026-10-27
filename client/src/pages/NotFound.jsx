import { Link } from "react-router-dom";

//Shown for any URL  that doesn't match a route

function NotFound() {
  return (
    <main>
      <h1>Page not NotFound</h1>
      <Link to="/">Back to programs</Link>
    </main>
  );
}

export default NotFound;
