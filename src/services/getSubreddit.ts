/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchSubredditPosts(subreddit: string) {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    if (!response.ok) throw new Error("Subreddit not found");

    const data = await response.json();
    return data.data.children.map((post: any) => post.data);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
