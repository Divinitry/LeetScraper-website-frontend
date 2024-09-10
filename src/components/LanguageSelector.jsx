import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = () => {
  return (
    <div className="relative inline-block text-left">
      <label className="mb-2 text-lg block">Language:</label>
      
      <Menu>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Javascript
        </MenuButton>

        <MenuItems className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {languages.map(([language, version]) => (
            <MenuItem key={language} as="button" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              {language}
              &nbsp;
              <span className="text-gray-600 text-sm">{version}</span>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default LanguageSelector;