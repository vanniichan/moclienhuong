import { useState } from "react";

const Dropdown = ({ sortProductsByPrice }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        id="sortPriceDropdown"
        onClick={toggleDropdown}
        aria-expanded={isOpen ? "true" : "false"}
      >
         Sắp xếp theo giá
      </button>
      {isOpen && (
        <ul
          className="absolute right-0 mt-1 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-labelledby="sortPriceDropdown"
        >
          <li>
            <button
              className="block w-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => sortProductsByPrice("asc")}
            >
              Thấp đến cao
            </button>
          </li>
          <li>
            <button
              className="block w-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => sortProductsByPrice("desc")}
            >
              Cao đến thấp
            </button>
          </li>
        </ul>
      )}
    </div>
  )
};

export default Dropdown;

