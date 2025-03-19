/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import Nav from "./components/Nav";
import { fetchSubredditPosts } from "./services/getSubreddit";
import Column from "./components/Column";

interface Post {
  id: string;
  permalink: string;
  title: string;
  author: string;
  num_comments: number;
  ups: number;
}

interface ColumnData {
  title: string;
  content: Post[];
}

function App() {
  const [subredditName, setSubredditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [columnList, setColumnList] = useState<ColumnData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("savedSubreddits");
    if (savedData) {
      setColumnList(JSON.parse(savedData));
    }
  }, []);

  const handleFetch = async () => {
    if (!subredditName.trim()) return;
    setLoading(true);
    setError("");

    try {
      const fetchedPosts = await fetchSubredditPosts(subredditName);
      const newColumnData = {
        title: subredditName,
        content: fetchedPosts,
      };

      // FIX: Properly update state instead of mutating columnList
      const updatedColumns = [...columnList, newColumnData];
      setColumnList(updatedColumns);

      // Save to localStorage
      localStorage.setItem("savedSubreddits", JSON.stringify(updatedColumns));

      // FIX: Clear input AFTER successfully adding a column
      setSubredditName("");
    } catch (err: any) {
      setError(err.message);
      setSubredditName("");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFetch();
      setSubredditName("");
    }
  };

  return (
    <div>
      <Nav
        onChangeInput={setSubredditName}
        submit={handleFetch}
        handleKeyDown={handleKeyDown}
        value={subredditName}
      />

      <div className="flex flex-col items-center justify-center min-h-screen over">
        {/* Loading State */}
        {loading && <p className="text-gray-500">Loading...</p>}
        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex w-full max-w-[120rem] overflow-x-auto">
          {columnList.map((column, index) => (
            <Column
              key={index}
              subredditName={column.title}
              posts={column.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
