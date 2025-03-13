/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { fetchSubredditPosts } from "./services/getSubreddit";
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

  return (
    <>
      <Nav onChangeInput={setSubreddit} submit={handleFetch} />
      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
      {/* Posts List */}
      <div className="mt-4">
        {posts.length > 0 ? (
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.id} className="border p-2 rounded-md">
                <a
                  href={`https://www.reddit.com${post.permalink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>No posts found.</p>
        )}
      </div>
    </>
  );
}

export default App;
