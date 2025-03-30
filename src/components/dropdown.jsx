import { CiStar } from "react-icons/ci";

const CurrencyDropdown = ({ 
  currencies, 
  currency, 
  setCurrency, 
  favorites, 
  handleFavorite, 
  title = "" 
}) => {
  return (
    <div className="relative inline-block w-48 animate-fade-in bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-md transition-all duration-500">
      {/* Label Styling */}
      <label htmlFor={title} className="block text-sm font-medium text-gray-800 mb-1">
        {title}
      </label>
      
      <div className="relative">
        <select
          id={title}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded p-2 w-full pr-10 bg-gray-100 text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500"
        >
          {/* Favorite Currencies Section */}
          {favorites.length > 0 && (
            <optgroup label="Favorites" className="bg-blue-100 text-blue-800">
              {favorites.map((cur) => (
                <option className="bg-blue-500 text-white" value={cur} key={cur}>
                  {cur}
                </option>
              ))}
            </optgroup>
          )}
          {/* All Currencies Section */}
          <optgroup label="All Currencies">
            {currencies?.map((cur) => (
              <option value={cur} key={cur}>
                {cur}
              </option>
            ))}
          </optgroup>
        </select>
        
        {/* Favorite Button */}
        <button 
          className={`absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-blue-500 transition-all ${favorites.includes(currency) ? 'text-blue-500' : ''}`}
          onClick={() => handleFavorite(currency)}
        >
          <CiStar size={22} />
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
