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

interface ColumnData {
  subredditName: string;
  posts: Post[];
}

const Column: React.FC<ColumnData> = ({ subredditName, posts }) => {
  return (
    <div className="mt-4 min-w-[14rem] border-r-2 px-3 max-h-screen overflow-y-auto">
      <h2 className="font-bold py-4 capitalize"> {subredditName}</h2>
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
