import { useEffect, useState } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch("/api/price");
      const data = await res.json();
      console.log("Data from API:", data);

      // Remove commas from the string before parsing it
      const priceValue = parseFloat(data.replace(/,/g, ''));

      if (!isNaN(priceValue)) {  // check if conversion was successful
        const formattedPrice = priceValue.toFixed(2);
        // Add commas back as thousands separators
        const formattedWithCommas = new Intl.NumberFormat().format(formattedPrice);
        setPrice(formattedWithCommas);
      }
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
