import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import CrewmateCard from "../components/CrewmateCard";

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setCrewmates(data || []);
    } catch (error) {
      console.error("Error fetching crewmates:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-page">
      <h1>Your Crewmate Gallery</h1>

      {loading ? (
        <p>Loading...</p>
      ) : crewmates.length === 0 ? (
        <div className="empty-gallery">
          <p>You haven't created any crewmates yet!</p>
          <a href="/create" className="button">
            Create Your First Crewmate
          </a>
        </div>
      ) : (
        <div className="crewmate-grid">
          {crewmates.map((crewmate) => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CrewmateGallery;
