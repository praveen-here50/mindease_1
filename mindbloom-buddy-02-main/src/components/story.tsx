import React, { useState } from "react";

const stories = {
  education: {
    text: "Dr. Abdul Kalam, born into a humble family, walked barefoot to school and studied under streetlights. His dedication led him to become India’s Missile Man and President.",
    url: "https://www.edsys.in/motivational-stories-for-students/",
  },
  motivation: {
    text: "Nick Vujicic was born without arms or legs, yet he became a global motivational speaker. His story proves that inner strength can overcome any limitation.",
    url: "https://mindsetopia.com/true-motivational-stories/",
  },
  success: {
    text: "J.K. Rowling was rejected by 12 publishers before Harry Potter was accepted. She went from living on welfare to becoming one of the most successful authors.",
    url: "https://www.success.com/17-inspiring-success-stories/",
  },
  perseverance: {
    text: "Colonel Sanders was rejected over 1,000 times before someone accepted his chicken recipe. His perseverance built the KFC empire. Never give up on your dream.",
    url: "https://www.goalcast.com/perseverance-stories/",
  },
  time: {
    text: "Benjamin Franklin said, 'Lost time is never found again.' He created a daily planner to maximize productivity.",
    url: "https://www.lifehack.org/articles/productivity/10-inspiring-time-management-stories.html",
  },
  confidence: {
    text: "Malala Yousafzai stood up for girls’ education despite threats and violence. Her confidence changed global conversations.",
    url: "https://www.inc.com/amy-morin/7-inspiring-stories-that-will-boost-your-self-confidence.html",
  },
};

const themes = [
  { value: "education", label: "📘 Education" },
  { value: "motivation", label: "🔥 Motivation" },
  { value: "success", label: "💼 Success" },
  { value: "perseverance", label: "💪 Perseverance" },
  { value: "time", label: "⏰ Time Management" },
  { value: "confidence", label: "🌈 Self-Confidence" },
];

export default function App() {
  const [theme, setTheme] = useState<string>("");
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setTheme(value);
    setSelectedStory(stories[value as keyof typeof stories]);
    setOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #d4fc79 0%, #96e6a1 25%, #a1c4fd 75%, #c2e9fb 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          width: "90%",
          maxWidth: "650px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h2
          style={{
            color: "#176B87",
            marginBottom: "25px",
            fontSize: "2rem",
          }}
        >
          🌟 Boost Your Motivation
        </h2>

        {/* Custom Dropdown */}
        <div style={{ position: "relative", marginBottom: "25px" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))",
              color: "#1f1f1f",
              fontSize: "1rem",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
              textAlign: "left",
              position: "relative",
            }}
          >
            {theme
              ? themes.find((t) => t.value === theme)?.label
              : "Select a Theme"}
            <span
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1.2rem",
                color: "#176B87",
              }}
            >
              {open ? "▲" : "▼"}
            </span>
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                width: "100%",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.85))",
                borderRadius: "16px",
                boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
                zIndex: 5,
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              {themes.map((item) => (
                <div
                  key={item.value}
                  onClick={() => handleSelect(item.value)}
                  style={{
                    padding: "08px 14px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    borderBottom:
                      item.value === themes[themes.length - 1].value
                        ? "none"
                        : "1px solid rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #a1c4fd, #c2e9fb)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

      {/* Story */}
{selectedStory ? (
  <>
    <div
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
        borderRadius: "16px",
        padding: "24px 30px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        marginBottom: "25px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 14px 30px rgba(0,0,0,0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.08)";
      }}
    >
      <p
        style={{
          fontFamily: "'Playfair Display', serif", // 💎 Elegant, premium font
          fontSize: "1.15rem",
          color: "#1e1e1e",
          lineHeight: 1.8,
          letterSpacing: "0.3px",
          textAlign: "justify",
          margin: 0,
          textShadow: "0 1px 1px rgba(0,0,0,0.1)",
        }}
      >
        “{selectedStory.text}”
      </p>
    </div>

    <a
      href={selectedStory.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        background:
          "linear-gradient(90deg, #2a9d8f, #28c76f, #20bf55)",
        color: "white",
        padding: "12px 26px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: 600,
        boxShadow: "0 8px 20px rgba(42,157,143,0.3)",
        transition: "0.3s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 12px 25px rgba(42,157,143,0.5)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(42,157,143,0.3)";
      }}
    >
      Read More →
    </a>
  </>
) : (
  <p style={{ color: "#333", opacity: 0.9 }}>
    Select a theme above to reveal an inspiring story ✨
  </p>
)}

      </div>
    </div>
  );
}