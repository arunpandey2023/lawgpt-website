import { cookiePolicy } from "@/data/legal/cookies";
import { disclaimer } from "@/data/legal/disclaimer";
import { privacyPolicy } from "@/data/legal/privacy";
import { termsOfService } from "@/data/legal/terms";
import type { LegalDocument } from "@/types/legal";

export const legalDocuments: LegalDocument[] = [
  privacyPolicy,
  termsOfService,
  cookiePolicy,
  disclaimer,
];

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((doc) => doc.slug === slug);
}

export { cookiePolicy, disclaimer, privacyPolicy, termsOfService };
