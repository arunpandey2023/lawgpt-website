import {
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/seo";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Homepage Organization + WebSite + SoftwareApplication schemas. */
export function HomeJsonLd() {
  return (
    <>
      <JsonLdScript data={organizationSchema()} />
      <JsonLdScript data={websiteSchema()} />
      <JsonLdScript data={softwareApplicationSchema()} />
    </>
  );
}
