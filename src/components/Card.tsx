interface Post {
  permalink: string;
  title: string;
  author: string;
  num_comments: number;
  ups: number;
}
const Card = ({ permalink, title, author, ups, num_comments }: Post) => {
  return (
    <div className="flex flex-col overflow-hidden h-[5rem]">
      <a
        href={`https://www.reddit.com${permalink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:underline overflow-hidden"
      >
        <h2 className="font-semibold"> {title}</h2>
        <p>✍️ {author}</p>
        <p>⬆️ {ups}</p>
        <p>💬 {num_comments}</p>
      </a>
    </div>
  );
};

export default Card;
