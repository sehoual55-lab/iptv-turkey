/**
 * Renders a JSON-LD block. Passing objects (not strings) keeps the payload
 * valid — JSON.stringify escapes anything that would break the script tag.
 */
export function StructuredData({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
