import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiRequest } from "../services/api";
import { formatDate } from "../utils/formatDate";

function ProgramDetail() {
  const { id } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await apiRequest(`/programs/${id}`);
        setProgram(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPrograms();
  }, [id]);
  if (loading)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );

  if (error) {
    return (
      <main>
        <p role="alert">{error}</p>
        <Link to="/">Back to programs</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/">← All programs</Link>
      <p className="badge">{program.topic}</p>
      <h1>{program.title}</h1>
      <p>{program.description}</p>

      <ul className="details">
        <li>
          <strong>Ages:</strong>
          {program.ageMin} to {program.ageMax}
        </li>
        <li>
          <strong>Dates:</strong>
          {formatDate(program.startDate)} to {formatDate(program.endDate)}
        </li>
        <li>
          <strong>Capacity:</strong> {program.capacity} campers
        </li>
        <li>
          <strong>Status:</strong> {program.status}
        </li>
      </ul>
    </main>
  );
}

export default ProgramDetail;
