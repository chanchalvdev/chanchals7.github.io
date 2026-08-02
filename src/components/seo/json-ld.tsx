/**
 * Renders a JSON-LD `@graph` document as a script tag.
 *
 * `<` is escaped so a stray "</script>" inside any string field (a blog title,
 * a project description) cannot terminate the block early and inject markup.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
