import React from "react";

interface Post {
  id: string;
  permalink: string;
  title: string;
}

interface ColumnProps {
  posts: Post[];
}

const Column: React.FC<ColumnProps> = ({ posts }) => {
  return (
    <div className="mt-4">
      {posts.length > 0 && (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="border p-2 rounded-md">
              <a
                href={`https://www.reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Column;
