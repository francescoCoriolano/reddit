import React from "react";
import Card from "./Card";
interface Post {
  id: string;
  permalink: string;
  title: string;
  author: string;
  num_comments: number;
  ups: number;
}

interface ColumnProps {
  posts: Post[];
  subreddit: string;
}

const Column: React.FC<ColumnProps> = ({ posts, subreddit }) => {
  return (
    <div className="mt-4 w-[17%] border-x-2 px-3 max-h-[100vh] overflow-scroll">
      <h2 className="font-bold py-4"> 🔴 {subreddit}</h2>
      {posts.length > 0 && (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="border p-2 rounded-md text-[12px]">
              <Card
                permalink={post.permalink}
                title={post.title}
                author={post.author}
                ups={post.ups}
                num_comments={post.num_comments}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Column;
