import { useState, useEffect } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {
  // State variables to manage currencies, amount, favorites, and conversion result
  const [currencies, setCurrencies] = useState([]); // Stores available currency options
  const [amount, setAmount] = useState(1); // Stores the user input amount
  const [fromCurrency, setFromCurrency] = useState("USD"); // Stores the currency to convert from
  const [toCurrency, setToCurrency] = useState("INR"); // Stores the currency to convert to
  const [convertedAmount, setConvertedAmount] = useState(null); // Stores the conversion result
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]); // Stores favorite currencies

  // Fetches available currencies from API when the component loads
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data = await res.json();
        setCurrencies(Object.keys(data)); // Stores fetched currency keys in state
      } catch (error) {
        console.error("Error Fetching", error);
      }
    };
    fetchCurrencies();
  }, []);

  // Fetches conversion rate and calculates converted amount
  const convertCurrency = async () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount); // If same currency, set amount as converted amount
      return;
    }

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]); // Store the converted amount
    } catch (error) {
      console.error("Error fetching conversion", error);
    }
  };

  // Handles adding/removing currencies from favorites
  const handleFavorite = (currency) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.includes(currency)
        ? prev.filter((fav) => fav !== currency) // Remove if already in favorites
        : [...prev, currency]; // Add to favorites if not present
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to local storage
      return updatedFavorites;
    });
  };

  // Swaps fromCurrency and toCurrency values
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    // Main container with a gradient background and fade-in animation
    <div className="max-w-4xl mx-auto my-10 p-5 bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg shadow-xl animate-fade-in transition-all duration-700">
      {/* Title */}
      <h2 className="mb-5 text-3xl font-bold text-indigo-900 text-center">Currency Converter</h2>
      
      {/* Dropdowns and swap button */}
      <div className="flex gap-4 items-center justify-center">
        <CurrencyDropdown favorites={favorites} currencies={currencies} currency={fromCurrency} setCurrency={setFromCurrency} title="From:" handleFavorite={handleFavorite} />
        
        {/* Swap button with hover scale effect */}
        <button onClick={swapCurrencies} className="p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-transform transform hover:scale-110">
          <HiArrowsRightLeft size={28} />
        </button>
        
        <CurrencyDropdown favorites={favorites} currencies={currencies} currency={toCurrency} setCurrency={setToCurrency} title="To:" handleFavorite={handleFavorite} />
      </div>
      
      {/* Amount input field */}
      <div className="mt-6 flex items-center justify-center">
        <label htmlFor="amount" className="text-sm font-medium text-gray-700 mr-2">Amount:</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="border rounded-lg p-3 w-32 focus:ring-2 focus:ring-indigo-400 shadow-sm" />
      </div>
      
      {/* Convert button with hover animation */}
      <div className="flex justify-center mt-6">
        <button onClick={convertCurrency} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg">Convert</button>
      </div>
      
      {/* Conversion result with pulse animation */}
      <div className="mt-6 text-xl font-semibold text-center text-indigo-800 animate-pulse">
        {convertedAmount !== null && `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}
      </div>
    </div>
  );
};

export default CurrencyConverter;
