import { LegalRoute, buildLegalMetadata } from "@/components/legal/LegalRoute";
import { disclaimer } from "@/data/legal";

export const metadata = buildLegalMetadata(disclaimer);

export default function DisclaimerPage() {
  return <LegalRoute document={disclaimer} />;
}
