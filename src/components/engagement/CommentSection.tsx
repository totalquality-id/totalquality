"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";

type TargetType = "article" | "event";

interface Comment {
  id: number;
  name: string;
  content: string;
  createdAt: string;
}

const MAX_CONTENT = 2000;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function initialOf(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export default function CommentSection({
  targetType,
  targetId,
}: {
  targetType: TargetType;
  targetId: number;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: "", email: "", content: "" });
  // Honeypot: input tersembunyi yang hanya akan diisi bot pengisi-otomatis.
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{
    kind: "success" | "pending" | "error";
    text: string;
  } | null>(null);

  // Waktu form dirender, dipakai server untuk mendeteksi pengisian instan.
  const mountedAt = useRef(Date.now());

  const loadComments = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        targetType,
        targetId: String(targetId),
      });
      const res = await fetch(`/api/comments?${params}`);
      if (!res.ok) throw new Error("gagal");
      setComments(await res.json());
    } catch {
      // Gagal memuat komentar tidak boleh merusak halaman artikel.
    } finally {
      setLoading(false);
    }
  }, [targetType, targetId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setNotice(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setNotice(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetId,
          name: form.name,
          email: form.email || undefined,
          content: form.content,
          website: honeypot,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Gagal mengirim komentar");

      setForm({ name: "", email: "", content: "" });

      if (data.status === "approved" && data.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setNotice({ kind: "success", text: data.message });
      } else {
        setNotice({ kind: "pending", text: data.message });
      }
    } catch (err) {
      setNotice({
        kind: "error",
        text: err instanceof Error ? err.message : "Gagal mengirim komentar",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const remaining = MAX_CONTENT - form.content.length;

  return (
    <section
      className="border-t border-gray-100 pt-10 mt-4"
      aria-labelledby="comment-heading"
    >
      <h2
        id="comment-heading"
        className="flex items-center gap-3 text-2xl font-light tracking-tight text-[#1a1a1a] mb-8"
      >
        <MessageCircle className="w-5 h-5 text-[#0201FF]" aria-hidden="true" />
        Komentar
        {comments.length > 0 && (
          <span className="text-base text-[#364153]/60">
            ({comments.length})
          </span>
        )}
      </h2>

      {/* ── Form ───────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="mb-12 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="comment-name"
              className="block text-sm font-light text-[#364153] mb-1.5"
            >
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              id="comment-name"
              name="name"
              type="text"
              required
              maxLength={80}
              value={form.name}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Nama Anda"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-light text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-[#0201FF] focus:ring-2 focus:ring-[#0201FF]/10 transition-all disabled:bg-gray-50"
            />
          </div>

          <div>
            <label
              htmlFor="comment-email"
              className="block text-sm font-light text-[#364153] mb-1.5"
            >
              Email <span className="text-[#364153]/50">(opsional)</span>
            </label>
            <input
              id="comment-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={submitting}
              placeholder="email@contoh.com"
              aria-describedby="comment-email-help"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-light text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-[#0201FF] focus:ring-2 focus:ring-[#0201FF]/10 transition-all disabled:bg-gray-50"
            />
            <p id="comment-email-help" className="mt-1 text-xs text-[#364153]/60 font-light">
              Tidak ditampilkan publik.
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="comment-content"
            className="block text-sm font-light text-[#364153] mb-1.5"
          >
            Komentar <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment-content"
            name="content"
            required
            rows={4}
            maxLength={MAX_CONTENT}
            value={form.content}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Tulis pendapat Anda..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-light text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-[#0201FF] focus:ring-2 focus:ring-[#0201FF]/10 transition-all resize-y disabled:bg-gray-50"
          />
          <p className="mt-1 text-xs text-[#364153]/60 font-light text-right">
            {remaining.toLocaleString("id-ID")} karakter tersisa
          </p>
        </div>

        {/* Honeypot — tersembunyi dari manusia, tidak dari bot pengisi form. */}
        <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
          <label htmlFor="comment-website">Jangan isi kolom ini</label>
          <input
            id="comment-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {notice && (
          <div
            role="status"
            className={`flex items-start gap-2.5 px-4 py-3 rounded-lg text-sm font-light ${
              notice.kind === "error"
                ? "bg-red-50 border border-red-200 text-red-700"
                : notice.kind === "pending"
                  ? "bg-amber-50 border border-amber-200 text-amber-800"
                  : "bg-emerald-50 border border-emerald-200 text-emerald-800"
            }`}
          >
            {notice.kind === "error" ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <span>{notice.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#0201FF] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0000d1] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          {submitting ? "Mengirim..." : "Kirim Komentar"}
        </button>
      </form>

      {/* ── Daftar komentar ────────────────────────────────────────────── */}
      {loading ? (
        <p className="text-[#364153] font-light text-sm">Memuat komentar...</p>
      ) : comments.length === 0 ? (
        <p className="text-[#364153]/70 font-light text-sm">
          Belum ada komentar. Jadilah yang pertama berpendapat.
        </p>
      ) : (
        <ul className="space-y-6">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-4">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0201FF]/10 text-[#0201FF] flex items-center justify-center text-sm font-medium"
                aria-hidden="true"
              >
                {initialOf(comment.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                  <span className="text-sm font-medium text-[#1a1a1a]">
                    {comment.name}
                  </span>
                  <time
                    dateTime={comment.createdAt}
                    className="text-xs text-[#364153]/60 font-light"
                  >
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
                {/* Komentar dirender sebagai teks biasa, tidak pernah HTML. */}
                <p className="text-sm text-[#364153] font-light leading-relaxed whitespace-pre-wrap break-words">
                  {comment.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
