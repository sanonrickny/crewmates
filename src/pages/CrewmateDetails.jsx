import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function CrewmateDetails() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setCrewmate(data);
    } catch (error) {
      console.error("Error fetching crewmate details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!crewmate) return <p>Crewmate not found!</p>;

  return (
    <div className="details-page">
      <h1>{crewmate.name} Details</h1>

      <div className="crewmate-details">
        <p>
          <strong>Strength:</strong> {crewmate.attribute1}
        </p>
        <p>
          <strong>Intelligence:</strong> {crewmate.attribute2}
        </p>
        <p>
          <strong>Speed:</strong> {crewmate.attribute3}
        </p>

        <div className="description-box">
          <h3>Description:</h3>
          <p>{crewmate.description || "No description available."}</p>
        </div>

        <p>
          <strong>Created at:</strong>{" "}
          {new Date(crewmate.created_at).toLocaleString()}
        </p>
      </div>

      <div className="action-buttons">
        <Link to={`/update/${crewmate.id}`} className="button">
          Edit Crewmate
        </Link>
        <Link to="/gallery" className="button">
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}

export default CrewmateDetails;
