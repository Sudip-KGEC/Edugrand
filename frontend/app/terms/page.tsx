import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the EduGrand scholarship portal.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="January 2026"
      sections={[
        { heading: "Using EduGrand", body: "EduGrand lists scholarships so students can discover them. We are not the provider of these scholarships and do not decide who receives them." },
        { heading: "Accuracy of information", body: "We work to keep listings accurate, but amounts, dates and rules can change. Always confirm details on the official provider website before applying." },
        { heading: "No fees", body: "EduGrand is free for students. We never ask for payment to apply for or receive a scholarship." },
        { heading: "External links", body: "Apply links take you to third party websites. We are not responsible for their content or policies." },
        { heading: "Changes", body: "We may update these terms from time to time. Continued use of the site means you accept the updated terms." },
      ]}
    />
  );
}
