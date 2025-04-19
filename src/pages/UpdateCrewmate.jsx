import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function UpdateCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [attribute1, setAttribute1] = useState("");
  const [attribute2, setAttribute2] = useState("");
  const [attribute3, setAttribute3] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Sample attribute values
  const strengthValues = ["Strong", "Average", "Weak"];
  const intelligenceValues = ["Genius", "Smart", "Average", "Below Average"];
  const speedValues = ["Fast", "Normal", "Slow"];

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

      // Set form values
      setName(data.name);
      setAttribute1(data.attribute1);
      setAttribute2(data.attribute2);
      setAttribute3(data.attribute3);
      setDescription(data.description || "");
    } catch (error) {
      console.error("Error fetching crewmate:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("crewmates")
        .update({
          name,
          attribute1,
          attribute2,
          attribute3,
          description,
        })
        .eq("id", id);

      if (error) throw error;

      // Redirect to details page after successful update
      navigate(`/crewmate/${id}`);
    } catch (error) {
      console.error("Error updating crewmate:", error.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this crewmate?"
    );

    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from("crewmates")
          .delete()
          .eq("id", id);

        if (error) throw error;

        // Redirect to gallery after successful deletion
        navigate("/gallery");
      } catch (error) {
        console.error("Error deleting crewmate:", error.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="update-page">
      <h1>Update Crewmate</h1>

      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Strength:</label>
          <div className="attribute-buttons">
            {strengthValues.map((value) => (
              <button
                key={value}
                type="button"
                className={attribute1 === value ? "selected" : ""}
                onClick={() => setAttribute1(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Intelligence:</label>
          <div className="attribute-buttons">
            {intelligenceValues.map((value) => (
              <button
                key={value}
                type="button"
                className={attribute2 === value ? "selected" : ""}
                onClick={() => setAttribute2(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Speed:</label>
          <div className="attribute-buttons">
            {speedValues.map((value) => (
              <button
                key={value}
                type="button"
                className={attribute3 === value ? "selected" : ""}
                onClick={() => setAttribute3(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Update Crewmate
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Crewmate
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCrewmate;
