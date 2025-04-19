import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function CreateCrewmate() {
  console.log("CreateCrewmate component rendered"); // Debugging log

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [attribute1, setAttribute1] = useState("");
  const [attribute2, setAttribute2] = useState("");
  const [attribute3, setAttribute3] = useState("");
  const [description, setDescription] = useState("");

  // Sample attribute values
  const strengthValues = ["Strong", "Average", "Weak"];
  const intelligenceValues = ["Genius", "Smart", "Average", "Below Average"];
  const speedValues = ["Fast", "Normal", "Slow"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging log

    try {
      const { data, error } = await supabase.from("crewmates").insert([
        {
          name,
          attribute1,
          attribute2,
          attribute3,
          description,
        },
      ]);

      if (error) throw error;

      console.log("Crewmate created:", data); // Debugging log
      // Redirect to gallery after successful creation
      navigate("/gallery");
    } catch (error) {
      console.error("Error creating crewmate:", error.message);
    }
  };

  return (
    <div className="create-page">
      <h1>Create a New Crewmate</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="submit-button">
          Create Crewmate
        </button>
      </form>
    </div>
  );
}

export default CreateCrewmate;
