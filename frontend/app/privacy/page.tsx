import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Prose";
import { SITE } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How EduGrand collects, uses and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="January 2026"
      sections={[
        { heading: "Information we collect", body: "We collect only what you choose to share with us, such as your name, email address and message when you contact us or subscribe to scholarship alerts." },
        { heading: "How we use it", body: "We use your details to reply to your questions and to send scholarship updates you asked for. We do not sell your personal information." },
        { heading: "Chat assistant", body: "Messages typed into the scholarship assistant are used only to find matching scholarships and are not linked to your identity." },
        { heading: "Chat assistant", body: "Messages typed into the scholarship assistant are sent to Google's Gemini service to generate a reply, together with a few matching scholarships from our database. We do not link them to your identity. Please do not type personal details such as phone numbers, ID numbers or passwords in the chat." },
        { heading: "Your choices", body: `You can unsubscribe from emails at any time or ask us to delete your data by writing to ${SITE.email}.` },
      ]}
    />
  );
}
