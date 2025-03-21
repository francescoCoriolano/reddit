import React from "react";

interface NavProps {
  onChangeInput: (value: string) => void;
  submit: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
}

const Nav: React.FC<NavProps> = ({
  onChangeInput,
  submit,
  handleKeyDown,
  value,
}) => {
  return (
    <nav className="bg-sidebar-ring dark:bg-gray-800 text-white p-4 w-[100vw]  ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold text-black dark:text-white ">
          Reddit Multi-Viewer
        </h1>

        {/* Search Input & Button */}
        <div className="flex items-center gap-2 mr-14 bg-blend-darken">
          <input
            type="text"
            placeholder="Search subreddit..."
            className="px-3 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onChangeInput(e.target.value)}
            onKeyDown={handleKeyDown}
            value={value}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            onClick={submit}
          >
            Add
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
