// DEPRECATED: /api/news is an alias kept so the existing admin panel keeps
// working after the News -> Article rename. Point new clients at /api/articles.
export { GET, POST } from "@/app/api/articles/route";
