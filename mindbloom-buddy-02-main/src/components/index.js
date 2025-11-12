import React from "react";
import { createRoot } from "react-dom/client";
import PomodoroTimer from "./PomodoroTimer";

const root = createRoot(document.getElementById("root"));
root.render(<PomodoroTimer />);