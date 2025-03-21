import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Post {
  permalink: string;
  title: string;
  author: string;
  num_comments: number;
  ups: number;
}
const Card = ({ permalink, title, author, ups, num_comments }: Post) => {
  return (
    <TooltipProvider>
      <div className="flex flex-col max-w-[14rem] text-black dark:text-white overflow-auto">
        <a
          href={`https://www.reddit.com${permalink}`}
          target="_blank"
          rel="noopener noreferrer"
          //className="text-white "
        >
          <Tooltip>
            <TooltipTrigger>
              <h2 className="font-semibold text-left pb-2"> {title}</h2>
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>

          <p>✍️ {author}</p>
          <div className="flex justify-between">
            <p>⬆️ {ups}</p>
            <p>💬 {num_comments}</p>
          </div>
        </a>
      </div>
    </TooltipProvider>
  );
};

export default Card;
