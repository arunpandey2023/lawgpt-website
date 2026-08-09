import { LegalRoute, buildLegalMetadata } from "@/components/legal/LegalRoute";
import { termsOfService } from "@/data/legal";

export const metadata = buildLegalMetadata(termsOfService);

export default function TermsPage() {
  return <LegalRoute document={termsOfService} />;
}
