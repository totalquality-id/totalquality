// DEPRECATED: /api/news/[id] is an alias kept so the existing admin panel keeps
// working after the News -> Article rename. Point new clients at /api/articles/[id].
export { GET, PATCH, DELETE } from "@/app/api/articles/[id]/route";
