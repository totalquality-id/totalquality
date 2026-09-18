import DOMPurify from "dompurify";

/**
 * Membersihkan HTML dari RichTextEditor sebelum dirender lewat
 * dangerouslySetInnerHTML.
 *
 * Konten ini ditulis oleh admin, tapi satu akun admin yang jebol (atau paste
 * dari sumber luar) cukup untuk menanam <script> permanen di halaman publik.
 * Allowlist di bawah hanya memuat tag & atribut yang memang dihasilkan editor.
 *
 * Catatan: DOMPurify butuh DOM, jadi fungsi ini hanya boleh dipanggil di
 * client component. Saat dipanggil di server (prerender) ia mengembalikan
 * string kosong, dan komponen akan mengisinya setelah hydration.
 */
const ALLOWED_TAGS = [
  "p", "br", "hr", "div", "span",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "u", "s", "strike", "mark", "small", "sub", "sup",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
];

const ALLOWED_ATTR = [
  "href", "target", "rel",
  "src", "alt", "title", "width", "height", "loading",
  "class", "colspan", "rowspan",
  // Editor memakai inline style untuk warna teks, highlight, dan perataan.
  // Isinya disaring ketat oleh hook di bawah.
  "style",
];

/**
 * Properti CSS yang boleh bertahan di atribut style.
 *
 * Tanpa pembatasan ini, atribut style bisa dipakai untuk menutupi seluruh
 * halaman (position/z-index), menarik resource eksternal lewat url(), atau
 * membuat elemen tak terlihat di atas tombol lain (clickjacking).
 */
const ALLOWED_CSS_PROPERTIES = new Set([
  "color",
  "background-color",
  "text-align",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-decoration-line",
]);

/** Nilai CSS yang aman: warna, kata kunci, angka, persen. Tanpa url()/expression. */
const SAFE_CSS_VALUE = /^[#a-z0-9\s(),.%-]+$/i;
const UNSAFE_CSS_TOKENS = /url\s*\(|expression\s*\(|javascript:|@import|<|>/i;

function sanitizeStyleAttribute(style: string): string {
  const safe: string[] = [];

  for (const declaration of style.split(";")) {
    const [rawProperty, ...rest] = declaration.split(":");
    if (!rawProperty || rest.length === 0) continue;

    const property = rawProperty.trim().toLowerCase();
    const value = rest.join(":").trim();

    if (!ALLOWED_CSS_PROPERTIES.has(property)) continue;
    if (!value || value.length > 100) continue;
    if (UNSAFE_CSS_TOKENS.test(value)) continue;
    if (!SAFE_CSS_VALUE.test(value)) continue;

    safe.push(`${property}: ${value}`);
  }

  return safe.join("; ");
}

let hookInstalled = false;

function installHook() {
  if (hookInstalled) return;
  hookInstalled = true;

  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    const element = node as Element;

    if (element.hasAttribute?.("style")) {
      const cleaned = sanitizeStyleAttribute(
        element.getAttribute("style") ?? ""
      );
      if (cleaned) element.setAttribute("style", cleaned);
      else element.removeAttribute("style");
    }

    // Link ke luar selalu dibuka di tab baru tanpa membocorkan window.opener.
    if (element.tagName === "A" && element.hasAttribute("target")) {
      element.setAttribute("rel", "noopener noreferrer");
    }
  });
}

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";

  // Tidak ada DOM (server render) — tunda sampai hydration.
  if (typeof window === "undefined") return "";

  installHook();

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Hanya izinkan skema link yang aman; menutup javascript:/data: URI.
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/)/i,
    // Buang seluruh isi tag berbahaya, bukan cuma tag-nya.
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
    FORBID_ATTR: ["srcset", "formaction", "onerror", "onload"],
  });
}
