import { LegalRoute, buildLegalMetadata } from "@/components/legal/LegalRoute";
import { cookiePolicy } from "@/data/legal";

export const metadata = buildLegalMetadata(cookiePolicy);

export default function CookiesPage() {
  return <LegalRoute document={cookiePolicy} />;
}
