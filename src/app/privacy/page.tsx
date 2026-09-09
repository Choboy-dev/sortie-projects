import { LegalPage, legalMetadata } from "@/components/marketing/legal-page";
import { privacyPolicy } from "@/content/legal/privacy";

export const metadata = legalMetadata(privacyPolicy);

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />;
}
