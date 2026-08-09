import { permanentRedirect } from "next/navigation";

/** Legacy /resources URL — permanent redirect to Legal Guides. */
export default function ResourcesPage() {
  permanentRedirect("/academy");
}
