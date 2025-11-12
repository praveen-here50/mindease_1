import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

type Balloon = {
  id: number;
  x: number;
  y: number;
  alive: boolean;
  speed: number;
};

export default function StressReliefLauncher() {
  const [activeGame, setActiveGame] = useState<"bubble" | "sky" | "memory" | "doodle" | null>(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Bubble Chase
  const [bubbleScore, setBubbleScore] = useState<number>(0);
  const [bubbleCompleted, setBubbleCompleted] = useState<boolean>(false);
  const [bubblePos, setBubblePos] = useState({ top: 50, left: 50 });

  // Sky Pop
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [skyScore, setSkyScore] = useState<number>(0);
  const [skyCompleted, setSkyCompleted] = useState<boolean>(false);

  // Memory Game
  const colors = ["bg-red-400", "bg-green-400", "bg-blue-400", "bg-yellow-400"];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [memoryCompleted, setMemoryCompleted] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(true);

  // Doodle Pad
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Window resize
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------------- Bubble Chase ----------------
  const handleBubbleClick = () => {
    setBubbleScore((prev) => prev + 10);
    setBubblePos({ top: Math.random() * 300, left: Math.random() * 300 });
  };
  useEffect(() => {
    if (bubbleScore >= 100) setBubbleCompleted(true);
  }, [bubbleScore]);
  const resetBubbleChase = () => {
    setBubbleScore(0);
    setBubbleCompleted(false);
    setBubblePos({ top: 50, left: 50 });
  };

  // ---------------- Sky Pop ----------------
  useEffect(() => {
    if (activeGame === "sky") {
      const initialBalloons: Balloon[] = Array.from({ length: 10 }).map((_, i) => ({
        id: Math.random(),
        x: Math.random() * 300,
        y: 400 + i * 20,
        alive: true,
        speed: 1 + Math.random() * 2,
      }));
      setBalloons(initialBalloons);
      setSkyScore(0);
      setSkyCompleted(false);
    }
  }, [activeGame]);
  const popBalloon = (id: number) => {
    setBalloons((prev) => prev.map((b) => (b.id === id ? { ...b, alive: false } : b)));
    setSkyScore((prev) => prev + 10);
  };
  useEffect(() => {
    if (balloons.length > 0 && balloons.every((b) => !b.alive)) setSkyCompleted(true);
  }, [balloons]);
  useEffect(() => {
    if (activeGame !== "sky") return;
    const interval = setInterval(() => {
      setBalloons((prev) => prev.map((b) => (b.alive ? { ...b, y: b.y - b.speed } : b)));
    }, 50);
    return () => clearInterval(interval);
  }, [activeGame]);
  const resetSkyPop = () => {
    const initialBalloons: Balloon[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Math.random(),
      x: Math.random() * 300,
      y: 400 + i * 20,
      alive: true,
      speed: 1 + Math.random() * 2,
    }));
    setBalloons(initialBalloons);
    setSkyScore(0);
    setSkyCompleted(false);
  };

  // ---------------- Memory Game ----------------
  const flipCard = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) setMatched((prev) => [...prev, first, second]);
      setTimeout(() => setFlipped([]), 1000);
    }
  };
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) setMemoryCompleted(true);
  }, [matched, cards]);
  const resetMemoryGame = () => {
    setMatched([]);
    setFlipped([]);
    const shuffled = [...colors, ...colors].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setMemoryCompleted(false);
    setShowCards(true);
    setTimeout(() => setShowCards(false), 3000);
  };
  useEffect(() => {
    const shuffled = [...colors, ...colors].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setTimeout(() => setShowCards(false), 3000);
  }, []);

  // ---------------- Doodle Pad ----------------
  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
    ctx?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };
  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };
  const stopDrawing = () => setIsDrawing(false);

  // ---------------- Game Selection ----------------
  const games = [
    { id: "bubble", name: "Bubble Chase", icon: "🫧" },
    { id: "sky", name: "Sky Pop", icon: "🎈" },
    { id: "memory", name: "Memory Game", icon: "🧠" },
    { id: "doodle", name: "Doodle Pad", icon: "🖌" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Main Menu 4 Boxes */}
      {!activeGame && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-5xl h-[90vh] p-8">
          {games.map((game) => (
            <motion.div
              key={game.id}
              className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl border border-gray-200 bg-white cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveGame(game.id as any)}
            >
              <span className="text-6xl">{game.icon}</span>
              <p className="mt-4 text-xl font-semibold text-gray-800">{game.name}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* ---------------- Game Displays ---------------- */}
      {/* Bubble Chase */}
      {activeGame === "bubble" && (
        <div className="mt-6 p-6 border rounded-lg bg-blue-50 relative h-[500px] w-full max-w-4xl mx-auto">
          <button className="mb-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setActiveGame(null)}>
            ⬅ Back
          </button>
          <p className="mb-2">Click the bubble 🫧 to get points!</p>
          <motion.div
            className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer absolute"
            animate={{ top: bubblePos.top, left: bubblePos.left }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={handleBubbleClick}
          >
            🫧
          </motion.div>
          <p className="mt-2 font-bold">Score: {bubbleScore}</p>
          <button
            className="mt-3 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
            onClick={resetBubbleChase}
          >
            Reset
          </button>
          {bubbleCompleted && <Confetti width={windowSize.width} height={windowSize.height} />}
        </div>
      )}

    {/* Sky Pop */}
{activeGame === "sky" && (
  <div className="mt-6 p-6 border rounded-lg bg-blue-50 relative h-[500px] w-full max-w-4xl mx-auto overflow-hidden">
    <button className="mb-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setActiveGame(null)}>
      ⬅ Back
    </button>
    <p className="mb-2">Click the floating balloons 🎈 to pop them!</p>
    {balloons.map(
      (b) =>
        b.alive && (
          <motion.div
            key={b.id}
            className="w-16 h-16 flex items-center justify-center text-white absolute cursor-pointer text-4xl"
            style={{ top: b.y, left: b.x }}
            onClick={() => popBalloon(b.id)}
            animate={{ top: b.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            🎈
          </motion.div>
        )
    )}
    <p className="mt-2 font-bold">Score: {skyScore}</p>
    <button
      className="mt-3 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
      onClick={resetSkyPop}
    >
      Reset
    </button>
    {skyCompleted && <Confetti width={windowSize.width} height={windowSize.height} />}
  </div>
)}


      {/* Memory Game */}
      {activeGame === "memory" && (
        <div className="mt-6 p-6 border rounded-lg bg-yellow-50 relative h-[500px] w-full max-w-4xl mx-auto">
          <button className="mb-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setActiveGame(null)}>
            ⬅ Back
          </button>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {cards.map((color, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 rounded-lg cursor-pointer flex items-center justify-center shadow-md ${
                  showCards || flipped.includes(idx) || matched.includes(idx) ? color : "bg-gray-300"
                }`}
                onClick={() => flipCard(idx)}
              />
            ))}
          </div>
          <button
            className="mt-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={resetMemoryGame}
          >
            Reset
          </button>
          {memoryCompleted && <Confetti width={windowSize.width} height={windowSize.height} />}
        </div>
      )}

      {/* Doodle Pad */}
      {activeGame === "doodle" && (
        <div className="mt-6 p-6 border rounded-lg bg-pink-50 relative h-[500px] w-full max-w-4xl mx-auto">
          <button className="mb-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setActiveGame(null)}>
            ⬅ Back
          </button>
          <canvas
            ref={canvasRef}
            width={400}
            height={250}
            className="border rounded-lg bg-white shadow-md mt-4"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <button
            className="mt-3 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
            onClick={() => {
              const ctx = canvasRef.current?.getContext("2d");
              ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}