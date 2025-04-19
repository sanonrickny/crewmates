import { Link } from "react-router-dom";

function CrewmateCard({ crewmate }) {
  return (
    <div className="crewmate-card">
      <h3>{crewmate.name}</h3>
      <p>Strength: {crewmate.attribute1}</p>
      <p>Intelligence: {crewmate.attribute2}</p>
      <p>Speed: {crewmate.attribute3}</p>
      <div className="card-buttons">
        <Link to={`/crewmate/${crewmate.id}`}>View Details</Link>
        <Link to={`/update/${crewmate.id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default CrewmateCard;
