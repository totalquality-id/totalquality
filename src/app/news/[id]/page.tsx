"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface News {
  id: number;
  title: string;
  content: string;
  image?: string;
  author?: string;
  createdAt: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!params?.id) {
          setError(true);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/news/${params.id}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
        <p className="text-[#364153] font-light text-lg">Loading news...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="text-center space-y-6 px-4">
          <h2 className="text-3xl font-light text-[#1a1a1a]">News Not Found</h2>
          <p className="text-[#364153] font-light">
            The news article you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#2B5589] font-light hover:text-[#1E3F69] transition-colors"
          >
            <span>Back to News</span>
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
        {news.image ? (
          <Image
            src={news.image}
            alt={news.title}
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
                {news.title}
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
                    {formatDate(news.createdAt)}
                  </p>
                  <p className="text-sm text-[#364153]/70 font-light">
                    {formatTime(news.createdAt)}
                  </p>
                </div>
              </div>

              {/* Author */}
              {news.author && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 p-3 bg-[#FACC01]/10 rounded-lg h-fit">
                    <User className="w-6 h-6 text-[#FACC01]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-light text-[#1a1a1a]">
                      Author
                    </h3>
                    <p className="text-base text-[#364153] font-light">
                      {news.author}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Article Content — render HTML dari RichTextEditor */}
            <div
              className="news-content"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </div>
      </section>

      {/* Styles untuk render HTML dari RichTextEditor */}
      <style>{`
        .news-content {
          color: #364153;
          font-size: 1.0625rem;
          line-height: 1.8;
          font-weight: 300;
        }
        .news-content h2 {
          font-size: 1.75rem;
          font-weight: 300;
          letter-spacing: -0.03em;
          color: #1a1a1a;
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f1f1f1;
        }
        .news-content h3 {
          font-size: 1.25rem;
          font-weight: 400;
          color: #1a1a1a;
          margin: 2rem 0 0.75rem;
        }
        .news-content p {
          margin: 0 0 1.25rem;
        }
        .news-content ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 1rem 0 1.5rem;
        }
        .news-content ol {
          list-style: decimal;
          padding-left: 1.5rem;
          margin: 1rem 0 1.5rem;
        }
        .news-content li {
          margin: 0.35rem 0;
        }
        .news-content blockquote {
          border-left: 3px solid #0201FF;
          margin: 1.75rem 0;
          padding: 0.75rem 1.25rem;
          background: #f8f9ff;
          color: #475569;
          border-radius: 0 0.375rem 0.375rem 0;
          font-style: italic;
        }
        .news-content a {
          color: #2B5589;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .news-content a:hover {
          color: #1E3F69;
        }
        .news-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }
        .news-content figure {
          margin: 2rem auto;
          text-align: center;
        }
        .news-content figure img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          display: block;
          margin: 0 auto;
        }
        .news-content figcaption {
          font-size: 0.8125rem;
          color: #94a3b8;
          margin-top: 0.5rem;
          font-style: italic;
        }
        .news-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        .news-content em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}