import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import ProgramCard from "../components/ProgramCard";

const TOPICS = [
  "All",
  "Technology",
  "Leadership",
  "Entrepreneurship",
  "Outdoors",
  "Other",
];

function Home() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [topic, setTopic] = useState("All");

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await apiRequest("/programs");

        setPrograms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPrograms();
  }, []);

  const visiblePrograms =
    topic === "All" ? programs : programs.filter((p) => p.topic === topic);

  if (loading)
    return (
      <main>
        <p>Loading programs...</p>
      </main>
    );
  if (error)
    return (
      <main>
        <p role="alert"> Could not load programs: {error}</p>
      </main>
    );

  return (
    <main>
      <h1>Find a camp</h1>

      <label htmlFor="topic-filter">Topic</label>
      <select
        id="topic-filter"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      >
        {TOPICS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {visiblePrograms.length === 0 ? (
        <p>No programs match this topic yet.</p>
      ) : (
        <div className="program-grid">
          {visiblePrograms.map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
