import { LegalPage, legalMetadata } from "@/components/marketing/legal-page";
import { accessibilityStatement } from "@/content/legal/accessibility";

export const metadata = legalMetadata(accessibilityStatement);

export default function AccessibilityPage() {
  return <LegalPage document={accessibilityStatement} />;
}
