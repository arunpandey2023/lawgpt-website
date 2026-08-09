import { LegalRoute, buildLegalMetadata } from "@/components/legal/LegalRoute";
import { privacyPolicy } from "@/data/legal";

export const metadata = buildLegalMetadata(privacyPolicy);

export default function PrivacyPage() {
  return <LegalRoute document={privacyPolicy} />;
}
