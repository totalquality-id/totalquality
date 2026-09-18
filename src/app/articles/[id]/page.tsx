"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import LikeButton from "@/components/engagement/LikeButton";
import CommentSection from "@/components/engagement/CommentSection";

interface Article {
  id: number;
  title: string;
  content: string;
  image?: string;
  author?: string;
  createdAt: string;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!params?.id) {
          setError(true);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/articles/${params.id}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <p className="text-[#364153] font-light text-lg">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="text-center space-y-6 px-4">
          <h2 className="text-3xl font-light text-[#1a1a1a]">Article Not Found</h2>
          <p className="text-[#364153] font-light">
            The article you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[#2B5589] font-light hover:text-[#1E3F69] transition-colors"
          >
            <span>Back to Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative w-full h-[500px] sm:h-[550px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0201FF] to-[#0000d1]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC01]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>
        )}
      </section>

      {/* Article Content Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white border border-gray-200 p-8 lg:p-12 space-y-12">
            {/* Title */}
            <div className="border-b border-gray-100 pb-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter leading-tight text-[#1a1a1a]">
                {article.title}
              </h1>
            </div>

            {/* Article Meta Info */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Published Date */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 p-3 bg-[#0201FF]/5 rounded-lg h-fit">
                  <Calendar className="w-6 h-6 text-[#0201FF]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-light text-[#1a1a1a]">
                    Published Date
                  </h3>
                  <p className="text-base text-[#364153] font-light">
                    {formatDate(article.createdAt)}
                  </p>
                  <p className="text-sm text-[#364153]/70 font-light">
                    {formatTime(article.createdAt)}
                  </p>
                </div>
              </div>

              {/* Author */}
              {article.author && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 p-3 bg-[#FACC01]/10 rounded-lg h-fit">
                    <User className="w-6 h-6 text-[#FACC01]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-light text-[#1a1a1a]">
                      Author
                    </h3>
                    <p className="text-base text-[#364153] font-light">
                      {article.author}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Article Content — render HTML dari RichTextEditor */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
            />

            {/* Interaksi pengunjung: suka & komentar, tanpa perlu login. */}
            <div className="border-t border-gray-100 pt-8">
              <LikeButton targetType="article" targetId={article.id} />
            </div>

            <CommentSection targetType="article" targetId={article.id} />
          </div>
        </div>
      </section>

      {/* Styles untuk render HTML dari RichTextEditor */}
      <style>{`
        .article-content {
          color: #364153;
          font-size: 1.0625rem;
          line-height: 1.8;
          font-weight: 300;
        }
        .article-content h2 {
          font-size: 1.75rem;
          font-weight: 300;
          letter-spacing: -0.03em;
          color: #1a1a1a;
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f1f1f1;
        }
        .article-content h3 {
          font-size: 1.25rem;
          font-weight: 400;
          color: #1a1a1a;
          margin: 2rem 0 0.75rem;
        }
        .article-content p {
          margin: 0 0 1.25rem;
        }
        .article-content ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 1rem 0 1.5rem;
        }
        .article-content ol {
          list-style: decimal;
          padding-left: 1.5rem;
          margin: 1rem 0 1.5rem;
        }
        .article-content li {
          margin: 0.35rem 0;
        }
        .article-content blockquote {
          border-left: 3px solid #0201FF;
          margin: 1.75rem 0;
          padding: 0.75rem 1.25rem;
          background: #f8f9ff;
          color: #475569;
          border-radius: 0 0.375rem 0.375rem 0;
          font-style: italic;
        }
        .article-content a {
          color: #2B5589;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .article-content a:hover {
          color: #1E3F69;
        }
        .article-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }
        .article-content figure {
          margin: 2rem auto;
          text-align: center;
        }
        .article-content figure img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          display: block;
          margin: 0 auto;
        }
        .article-content figcaption {
          font-size: 0.8125rem;
          color: #94a3b8;
          margin-top: 0.5rem;
          font-style: italic;
        }
        .article-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        .article-content em {
          font-style: italic;
        }

        /* --- Elemen tambahan dari editor yang diperluas --- */
        .article-content h4 {
          font-size: 1.0625rem;
          font-weight: 500;
          color: #1a1a1a;
          margin: 1.5rem 0 0.5rem;
        }
        .article-content u { text-decoration: underline; text-underline-offset: 2px; }
        .article-content s,
        .article-content strike { text-decoration: line-through; opacity: 0.75; }
        .article-content mark {
          padding: 0.05em 0.25em;
          border-radius: 0.2em;
          background: #fef3c7;
          color: inherit;
        }
        .article-content sup,
        .article-content sub { font-size: 0.7em; line-height: 0; }
        .article-content sup { vertical-align: super; }
        .article-content sub { vertical-align: sub; }
        .article-content code {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          padding: 0.1rem 0.35rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 0.875em;
          color: #be123c;
        }
        .article-content pre {
          background: #0f172a;
          color: #e2e8f0;
          border-radius: 0.5rem;
          padding: 1rem 1.25rem;
          overflow-x: auto;
          margin: 1.75rem 0;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        .article-content pre code {
          background: none;
          border: none;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.75rem 0;
          font-size: 0.9375rem;
        }
        .article-content th,
        .article-content td {
          border: 1px solid #e5e7eb;
          padding: 0.6rem 0.85rem;
          text-align: left;
          vertical-align: top;
        }
        .article-content th {
          background: #f8f9ff;
          font-weight: 600;
          color: #1a1a1a;
        }
        .article-content tbody tr:nth-child(even) { background: #fcfcfd; }
        .article-content caption {
          caption-side: bottom;
          font-size: 0.8125rem;
          color: #94a3b8;
          padding-top: 0.5rem;
          font-style: italic;
        }
        /* Perataan teks dari toolbar editor */
        .article-content [style*="text-align: center"] { text-align: center; }
        .article-content [style*="text-align: right"] { text-align: right; }
        .article-content [style*="text-align: justify"] { text-align: justify; }
        /* Indentasi dari tombol indent (execCommand memakai blockquote polos) */
        .article-content blockquote:not([class]) { }

        /* Responsif: tabel dan blok kode tidak boleh merusak layout di HP */
        @media (max-width: 640px) {
          .article-content table { display: block; overflow-x: auto; white-space: nowrap; }
          .article-content pre { padding: 0.75rem 0.9rem; font-size: 0.8125rem; }
        }
      `}</style>
    </div>
  );
}