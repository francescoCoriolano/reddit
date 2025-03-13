/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { fetchSubredditPosts } from "./services/getSubreddit";
import Column from "./components/Column";
function App() {
  const [subreddit, setSubreddit] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!subreddit) return;
    setLoading(true);
    setError("");

    try {
      const fetchedPosts = await fetchSubredditPosts(subreddit);
      setPosts(fetchedPosts);
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
  return (
    <div>
      <Nav
        onChangeInput={setSubreddit}
        submit={handleFetch}
        handleKeyDown={handleKeyDown}
      />
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Loading State */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Posts List */}
        {error && <Column posts={posts} subreddit={subreddit} />}
      </div>
    </div>
  );
}

export default App;
