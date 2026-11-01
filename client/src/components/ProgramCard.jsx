import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

function ProgramCard({ program }) {
  return (
    <article className="card">
      <p className="badge">{program.topic}</p>
      <h2 className="card-title">{program.title}</h2>
      <p>
        Ages {program.ageMin} to {program.ageMax}
      </p>
      <p>
        {formatDate(program.startDate)} to {formatDate(program.endDate)}
      </p>
      <Link to={`/programs/${program._id}`} className="button">
        View details
      </Link>
    </article>
  );
}

export default ProgramCard;
