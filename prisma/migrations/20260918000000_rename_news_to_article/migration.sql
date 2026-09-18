-- Rename the News table to Article.
-- The rename preserves all existing rows, the primary key and the identity
-- sequence, so no data is copied or lost.

ALTER TABLE "News" RENAME TO "Article";
ALTER TABLE "Article" RENAME CONSTRAINT "News_pkey" TO "Article_pkey";
ALTER SEQUENCE "News_id_seq" RENAME TO "Article_id_seq";

-- Row Level Security stays enabled through the rename; re-assert it so the
-- table is never reachable by Supabase's anon/authenticated API keys.
ALTER TABLE "Article" ENABLE ROW LEVEL SECURITY;
