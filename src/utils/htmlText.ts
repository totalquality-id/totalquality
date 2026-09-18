/**
 * Helper untuk menampilkan cuplikan konten yang aslinya berupa HTML dari
 * RichTextEditor sebagai teks biasa.
 *
 * Tanpa ini, `content.substring(0, 150)` memotong string HTML mentah sehingga
 * tag seperti <h3> dan <div> ikut tampil di kartu artikel, dan potongannya
 * bisa berhenti di tengah tag.
 */

const ENTITIES: Array<[RegExp, string]> = [
  [/&nbsp;/g, " "],
  [/&amp;/g, "&"],
  [/&lt;/g, "<"],
  [/&gt;/g, ">"],
  [/&quot;/g, '"'],
  [/&#39;/g, "'"],
];

/** Buang seluruh tag HTML dan decode entity umum, sisakan teks bersih. */
export function stripHtml(html: string): string {
  if (!html) return "";

  // Buang isi <script>/<style> lebih dulu supaya kodenya tidak ikut terbaca
  // sebagai teks.
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");

  // Ubah pemisah blok menjadi spasi agar kata tidak saling menempel.
  text = text.replace(/<\/(p|div|h[1-6]|li|tr|blockquote)>/gi, " ");
  text = text.replace(/<br\s*\/?>/gi, " ");

  text = text.replace(/<[^>]+>/g, " ");

  for (const [pattern, replacement] of ENTITIES) {
    text = text.replace(pattern, replacement);
  }

  return text.replace(/\s+/g, " ").trim();
}

/**
 * Potong konten HTML menjadi teks biasa sepanjang `maxLength`, dipotong di
 * batas kata terdekat supaya tidak berhenti di tengah kata.
 */
export function truncateContent(html: string, maxLength = 160): string {
  const plain = stripHtml(html);
  if (plain.length <= maxLength) return plain;

  const slice = plain.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice;

  return cut.trimEnd() + "...";
}
