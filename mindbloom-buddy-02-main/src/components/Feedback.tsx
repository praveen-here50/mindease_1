import React, { useState, FormEvent } from "react";

const DailyFeedback: React.FC = () => {
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [stress, setStress] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!mood || !energy || !gratitude) {
      alert("Please fill in all required fields.");
      return;
    }

    setThankYouMessage(
      "Thank you for sharing, Revathi 🌿. Your reflection has been saved."
    );

    setMood("");
    setEnergy("");
    setGratitude("");
    setStress("");
  };

  const premiumInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    border: "1px solid #339966",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  };

  const premiumSelectStyle: React.CSSProperties = {
    ...premiumInputStyle,
    appearance: "none",
    backgroundColor: "#fefefe",
    cursor: "pointer",
    color: "#333",
  };

  const premiumButtonStyle: React.CSSProperties = {
    background: "#339966",
    color: "#fff",
    border: "none",
    padding: "14px",
    width: "100%",
    borderRadius: "14px",
    fontSize: "1.05rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    transition: "all 0.25s",
  };

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to right, #f0fff0, #e6f2ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "520px",
        }}
      >
        <h2
          style={{
            color: "#339966",
            marginBottom: "8px",
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Daily Reflection 🌸
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#555",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Take a moment to reflect on your day. Your feelings matter 💚
        </p>

        <form onSubmit={handleSubmit}>
          {/* Mood */}
          <label
            htmlFor="mood"
            style={{ display: "block", marginTop: "15px", fontWeight: 500, color: "#444" }}
          >
            How was your mood today?
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
            style={premiumSelectStyle}
          >
            <option value="">Select</option>
            <option value="Happy">😊 Happy</option>
            <option value="Neutral">😐 Neutral</option>
            <option value="Sad">😢 Sad</option>
          </select>

          {/* Energy */}
          <label
            htmlFor="energy"
            style={{ display: "block", marginTop: "15px", fontWeight: 500, color: "#444" }}
          >
            How was your energy level?
          </label>
          <select
            id="energy"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            required
            style={premiumSelectStyle}
          >
            <option value="">Select</option>
            <option value="High">⚡ High</option>
            <option value="Medium">🔋 Medium</option>
            <option value="Low">😴 Low</option>
          </select>

          {/* Gratitude */}
          <label
            htmlFor="gratitude"
            style={{ display: "block", marginTop: "15px", fontWeight: 500, color: "#444" }}
          >
            What are you grateful for today?
          </label>
          <input
            type="text"
            id="gratitude"
            placeholder="e.g. A kind friend, good weather"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            required
            style={premiumInputStyle}
          />

          {/* Stress */}
          <label
            htmlFor="stress"
            style={{ display: "block", marginTop: "15px", fontWeight: 500, color: "#444" }}
          >
            Did anything stress you out?
          </label>
          <textarea
            id="stress"
            rows={3}
            placeholder="Share if you'd like..."
            value={stress}
            onChange={(e) => setStress(e.target.value)}
            style={premiumInputStyle}
          />

          {/* Submit Button */}
          <button
            type="submit"
            style={premiumButtonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px) scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0) scale(1)")
            }
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "translateY(1px) scale(0.98)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px) scale(1.02)")
            }
          >
            Submit Feedback ✨
          </button>
        </form>

        <p
          style={{
            marginTop: "18px",
            fontSize: "0.95rem",
            color: "#555",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          {thankYouMessage}
        </p>
      </div>
    </div>
  );
};

export default DailyFeedback;