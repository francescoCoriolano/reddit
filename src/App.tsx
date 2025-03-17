/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
interface columnData {
  title: string;
  content: Post[];
}
function App() {
  const [subredditName, setSubredditName] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [columnData, setColumnData] = useState<columnData>({
    title: "",
    content: [],
  });
  const [columnList, setColumnList] = useState<columnData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("savedSubreddits");
    if (savedData) {
      setColumnList(JSON.parse(savedData));
    }
  }, []);

  const handleFetch = async () => {
    if (!subredditName) return;
    setLoading(true);
    setError("");

    try {
      const fetchedPosts = await fetchSubredditPosts(subredditName);
      const newColumnData = {
        title: subredditName,
        content: fetchedPosts,
      };
      setColumnData(newColumnData);
      columnList.push(newColumnData);

      localStorage.setItem("savedSubreddits", JSON.stringify(columnList));
    } catch (err: any) {
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFetch();
    }
  };
  console.log("posts", posts);
  return (
    <div>
      <Nav
        onChangeInput={setSubredditName}
        submit={handleFetch}
        handleKeyDown={handleKeyDown}
      />
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Loading State */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-row w-[100%]">
          {columnList &&
            columnList.map((column) => (
              <Column subredditName={column.title} posts={column.content} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
