import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const togglingTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleIncrease = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      if (newCount % 10 === 0) {
        setShowConfetti(true);
        setButtonsDisabled(true);
      }
      return newCount;
    });
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
    setButtonsDisabled(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    let timer;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
        setButtonsDisabled(false);
      }, 19000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center ${
        theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"
      }`}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Animated Counter with Theme Toggle
      </h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        key={count}
        className={`text-6xl font-extrabold text-center ${
          count > 0 && count % 10 === 0 ? "text-green-500" : ""
        }`}
      >
        {count}
      </motion.div>
      <div className="flex flex-col gap-5 mt-8">
        <button
          className={`px-10 py-2 rounded text-white ${
            buttonsDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } `}
          onClick={handleIncrease}
          disabled={buttonsDisabled}
        >
          Increase
        </button>
        <button
          className={`px-10 py-2 rounded text-white ${
            buttonsDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } `}
          onClick={handleDecrease}
          disabled={count === 0 || buttonsDisabled}
        >
          Decrease
        </button>
        <button
          className={`px-10 py-2 rounded text-white ${
            buttonsDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600"
          } `}
          onClick={handleReset}
          disabled={buttonsDisabled}
        >
          Reset
        </button>
        <button
          className="px-10 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
          onClick={togglingTheme}
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
    </div>
  );
}

export default App;
