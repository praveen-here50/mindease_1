import React, { useState, useEffect, useRef } from "react";

const fullCircle = 2 * Math.PI * 90; // SVG circle radius 90

const PomodoroTimer: React.FC = () => {
  const [studyTime, setStudyTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const [duration, setDuration] = useState<number>(studyTime * 60);
  const [isStudy, setIsStudy] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>(
    "Small steps every day lead to big results."
  );
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  const updateQuote = () => {
    const quotes: string[] = [
      "Small steps every day lead to big results.",
      "You’re doing great—keep going.",
      "Rest is productive too.",
      "Focus is a skill. You’re building it.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const resetTimer = () => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    setRunning(false);
    setIsStudy(true);
    setDuration(studyTime * 60);
  };
    const startTimer = () => {
    if (running) return;
    setRunning(true);
    let total = isStudy ? studyTime * 60 : breakTime * 60;
    setDuration(total);

    timerRef.current = setInterval(() => {
      setDuration((prev) => {
        if (prev <= 1) {
         const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

          setRunning(false);
          alarmRef.current?.play();
          updateQuote();
          setIsStudy((prevMode) => !prevMode);
          return isStudy ? breakTime * 60 : studyTime * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
  const seconds = String(duration % 60).padStart(2, "0");
  const total = isStudy ? studyTime * 60 : breakTime * 60;
  const offset = fullCircle - (duration / total) * fullCircle;

  useEffect(() => {
    setDuration(studyTime * 60);
  }, [studyTime]);

  return (
    <div className="pomodoro-wrapper">
      {/* Embedded CSS */}
      <style>{`
        body {
          margin: 0;
            font-family: 'Poppins', sans-serif;
          background: linear-gradient(to right, #ced5d7, #e6f2ff);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .container {
          background-color: rgb(231, 241, 229);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 90%;
          z-index: 2;
        }

        h2 {
          color: #9ee7c1;
          margin-bottom: 20px;
        }

        .inputs label {
          display: block;
          margin-top: 10px;
          font-weight: 500;
          color: #444;
        }

         .inputs input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          margin-bottom: 10px;
        }

        .circle {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 20px auto;
        }

        svg {
          width: 200px;
          height: 200px;
          transform: rotate(-90deg);
        }

        circle {
          fill: none;
          stroke-width: 12;
        }

        circle:first-child {
          stroke: #eee;
        }
           #progress {
          stroke: #339966;
          transition: stroke-dashoffset 1s linear;
        }

        #time {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          color: #444;
        }

        .controls button {
          background-color: #339966;
          color: white;
          border: none;
          padding: 10px 20px;
          margin: 10px;
          border-radius: 8px;
          cursor: pointer;
        }

        .controls button:hover {
          background-color: #2a7d5f;
        }

        #quote {
          margin-top: 20px;
          font-style: italic;
          color: #666;
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(51, 153, 102, 0.2);
          animation: float 10s infinite ease-in-out;
        }
 .bubble:nth-child(1) {
          width: 80px; height: 80px; top: 10%; left: 5%;
        }
        .bubble:nth-child(2) {
          width: 100px; height: 100px; bottom: 15%; right: 10%;
        }
        .bubble:nth-child(3) {
          width: 60px; height: 60px; top: 50%; left: 80%;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <div className="container">
        <h2>Mind Ease Pomodoro 🌿</h2>

        <div className="inputs">
          <label>Study Time (min)</label>
          <input
            type="number"
            value={studyTime}
            min={1}
            onChange={(e) =>
              setStudyTime(Math.max(1, parseInt(e.target.value)))
            }
          />
          <label>Break Time (min)</label>
          <input
            type="number"
            value={breakTime}
            min={1}
            onChange={(e) =>
                   setBreakTime(Math.max(1, parseInt(e.target.value)))
            }
          />
        </div>

        <div className="circle">
          <svg>
            <circle cx="100" cy="100" r="90" />
            <circle
              id="progress"
              cx="100"
              cy="100"
              r="90"
              style={{
                strokeDasharray: fullCircle,
                strokeDashoffset: offset,
              }}
            />
          </svg>
          <div id="time">{minutes}:{seconds}</div>
        </div>

        <div className="controls">
          <button onClick={startTimer}>Start</button>
          <button onClick={resetTimer}>Reset</button>
        </div>

        <p id="quote">{quote}</p>
        <audio ref={alarmRef} src="/alarm1.mp3" preload="auto"></audio>
      </div>
    </div>
  );
};

export default PomodoroTimer;

