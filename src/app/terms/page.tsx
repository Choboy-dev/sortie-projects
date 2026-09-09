import { LegalPage, legalMetadata } from "@/components/marketing/legal-page";
import { websiteTerms } from "@/content/legal/terms";

export const metadata = legalMetadata(websiteTerms);

export default function TermsPage() {
  return <LegalPage document={websiteTerms} />;
}
