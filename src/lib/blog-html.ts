import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ["target", "rel"],
  });
}

export function addHeadingIds(html: string): string {
  let count = 0;
  return html.replace(/<h([2-4])([^>]*)>(.*?)<\/h[2-4]>/gi, (_m, level, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, "");
    const id =
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60) + `-${count++}`;
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}

export function processBlogHtml(html: string): string {
  return addHeadingIds(sanitizeHtml(html));
}

export function extractPlainTextExcerpt(html: string, maxLength = 155): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}
