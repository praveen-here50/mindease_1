import React, { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const MoodTracker: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  const logMood = (mood: string) => {
    const moodMap: Record<string, number> = { Sad: 0, Neutral: 1, Happy: 2 };
    const now = new Date().toLocaleTimeString();
    setLabels((prev) => [...prev, now]);
    setData((prev) => [...prev, moodMap[mood]]);
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Mood Over Time",
            data,
            borderColor: "#339966",
            backgroundColor: "#339966",
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          y: {
            min: 0,
            max: 2,
            ticks: {
              stepSize: 1,
              callback: (value) => ["😢", "😐", "😊"][value as number],
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-green-700 mb-2 text-center">
          Track Your Mood 🌸
        </h2>
        <p className="text-gray-600 text-center mb-6">
          How are you feeling today?
        </p>
        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={() => logMood("Happy")}
            className="text-3xl p-3 rounded-lg bg-white shadow hover:scale-110 transition"
          >
            😊
          </button>
          <button
            onClick={() => logMood("Neutral")}
            className="text-3xl p-3 rounded-lg bg-white shadow hover:scale-110 transition"
          >
            😐
          </button>
          <button
            onClick={() => logMood("Sad")}
            className="text-3xl p-3 rounded-lg bg-white shadow hover:scale-110 transition"
          >
            😢
          </button>
        </div>
        <canvas ref={chartRef} className="w-full max-h-[400px]" />
      </div>
    </div>
  );
};

export default MoodTracker;
