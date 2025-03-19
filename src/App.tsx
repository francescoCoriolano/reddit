/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import Nav from "./components/Nav";
import { fetchSubredditPosts } from "./services/getSubreddit";
import Column from "./components/Column";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertMessageDialog } from "./components/SubredditExistsDialog";

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
  const [subredditExists, setSubredditExists] = useState(false);
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
    if (columnList.some((obj) => obj.title === subredditName)) {
      setSubredditExists(true);
      setSubredditName("");
      setLoading(false);
      return;
    }
    try {
      const fetchedPosts = await fetchSubredditPosts(subredditName);
      const newColumnData = {
        title: subredditName,
        content: fetchedPosts,
      };

      const updatedColumns = [...columnList, newColumnData];
      setColumnList(updatedColumns);

      // Save to localStorage
      localStorage.setItem("savedSubreddits", JSON.stringify(updatedColumns));

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

  const handleDeleteColumn = (subredditName: string) => {
    const updatedColumns = columnList.filter(
      (column) => column.title !== subredditName
    );
    setColumnList(updatedColumns);
    localStorage.setItem("savedSubreddits", JSON.stringify(updatedColumns));
  };
  console.log("columnList", columnList);
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
        {/* {error && <p className="text-red-500">{error}</p>} */}
        {subredditExists || error ? (
          <div className="w-[100vw] h-[100vh] z-50 bg-gray-200/50 fixed top-0 left-0 flex justify-center items-center">
            <AlertDialog
              open={subredditExists || error !== ""}
              onOpenChange={() => {
                setSubredditExists(false);
                setError("");
              }}
            >
              <AlertMessageDialog
                onClose={() => {
                  setSubredditExists(false);
                  setError("");
                }}
                title={
                  (subredditExists && "Subreddit Already Exists") ||
                  (error && "Error")
                }
                message={
                  (subredditExists &&
                    "This subreddit is already in your columns list. Please try adding a different subreddit.") ||
                  (error && "Please enter a valid subreddit name.")
                }
              />
            </AlertDialog>
          </div>
        ) : (
          ""
        )}

        <div className="flex w-full max-w-[120rem] overflow-x-auto">
          {columnList.map((column, index) => (
            <Column
              key={index}
              subredditName={column.title}
              posts={column.content}
              onDelete={handleDeleteColumn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
