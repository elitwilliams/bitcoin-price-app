import { useEffect, useState } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch("/api/price");
      const data = await res.text();
      setPrice(data);
    };
    fetchPrice();
  }, []);

  return (
    <div className={darkMode ? "dark bg-gray-900 h-screen" : "h-screen"}>
      <button
        className="p-3 bg-blue-500 text-white"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle Dark Mode
      </button>
      <h1 className="text-5xl text-center mt-10">
        Bitcoin Price: ${price}
      </h1>
    </div>
  );
}
