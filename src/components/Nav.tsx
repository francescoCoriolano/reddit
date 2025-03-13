import React from "react";

interface NavProps {
  onChangeInput: (value: string) => void;
  submit: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Nav: React.FC<NavProps> = ({ onChangeInput, submit, handleKeyDown }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 w-[100vw]  ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold">Reddit Multi-Viewer</h1>

        {/* Search Input & Button */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search subreddit..."
            className="px-3 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onChangeInput(e.target.value)}
            onKeyDown={handleKeyDown}
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
