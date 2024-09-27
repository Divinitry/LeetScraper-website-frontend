import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect, questionTitle }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem(`hasVisited_${questionTitle}`);

    if (!hasVisitedBefore) {
      const timer = setTimeout(() => {
        setIsDisabled(false);
        localStorage.setItem(`hasVisited_${questionTitle}`, true);
      }, 8000);

      return () => clearTimeout(timer);
    } else {
      setIsDisabled(false);
    }
  }, [questionTitle]);

  return (
    <div className="relative inline-block text-left ml-2 mb-4">
      <label className="mb-2 text-lg block">Language:</label>

      <Menu>
        <MenuButton
          disabled={isDisabled}
          className={`inline-flex justify-center items-center gap-x-2 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset h-[38px] ${
            isDisabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
          }`}
        >
          {isDisabled ? (
            <>
              <svg
                className="w-4 h-4 text-gray-300 animate-spin"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-900"
                ></path>
              </svg>
              <span>Generating starter code...</span>
            </>
          ) : (
            language
          )}
        </MenuButton>

        <MenuItems className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              as="button"
              className={`w-full text-left px-4 py-2 text-sm ${
                lang === language
                  ? "text-blue-600 bg-blue-100"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <span className="text-gray-600 text-sm">({version})</span>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
