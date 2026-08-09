import { contactPublic } from "@/data/contact";
import type { LegalDocument } from "@/types/legal";

const email = contactPublic.generalEmail;

export const cookiePolicy: LegalDocument = {
  slug: "cookies",
  title: "Cookie Policy",
  shortTitle: "Cookie Policy",
  description:
    "How LawGPT uses essential, analytics, functional, and future marketing cookies on the website and platform.",
  lastUpdated: "2026-08-09",
  lastUpdatedLabel: "9 August 2026",
  intro:
    "This Cookie Policy explains how LawGPT AI Products (P.) Limited (“LawGPT”, “we”, “us”, or “our”) uses cookies and similar technologies on our website and related services. It should be read with our [Privacy Policy](/privacy).",
  seo: {
    title: "Cookie Policy | LawGPT",
    description:
      "Learn how LawGPT uses essential, analytics, functional, and future marketing cookies, and how you can manage your preferences.",
    keywords: [
      "LawGPT cookie policy",
      "LawGPT cookies",
      "website cookies India",
      "analytics cookies LawGPT",
    ],
  },
  sections: [
    {
      id: "what-are-cookies",
      title: "What are cookies?",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. Similar technologies include local storage, session storage, pixels, and software development kits that store or read identifiers on your browser or device.",
        "Cookies help websites remember preferences, keep you signed in, understand traffic patterns, and—where enabled—measure marketing performance.",
      ],
    },
    {
      id: "how-we-use",
      title: "How LawGPT uses cookies",
      paragraphs: [
        "We use cookies to operate LawGPT securely, remember settings, understand how visitors use Legal Guides, workflows pages, search, and pricing content, and improve the product experience. The categories below describe our current and planned use.",
      ],
    },
    {
      id: "essential-cookies",
      title: "Essential cookies",
      paragraphs: [
        "Essential cookies are required for core site and application functions. Without them, LawGPT may not work correctly.",
      ],
      lists: [
        {
          items: [
            "Authentication and session management for user accounts",
            "Security and fraud-prevention controls",
            "Load balancing and basic infrastructure operation",
            "Remembering cookie preference choices where a preference centre is available",
            "Protecting forms and preventing abuse of contact or signup flows",
          ],
        },
      ],
      subsections: [
        {
          id: "essential-note",
          title: "Consent",
          paragraphs: [
            "Because these cookies are necessary to provide the service you request, they are typically set regardless of analytics or marketing preferences.",
          ],
        },
      ],
    },
    {
      id: "analytics-cookies",
      title: "Analytics cookies",
      paragraphs: [
        "Analytics cookies help us understand how visitors use LawGPT in aggregate. This may include pages viewed, referral sources, device type, approximate location, search usage on the website, and whether users reach key journeys such as workflows, Legal Guides, pricing, or contact.",
        "We use this information to improve navigation, content, and product design. Analytics cookies are not used to sell your personal information.",
      ],
    },
    {
      id: "functional-cookies",
      title: "Functional cookies",
      paragraphs: [
        "Functional cookies remember choices that make LawGPT more convenient, such as interface preferences, previously selected options, or whether you have dismissed a notice. They are not strictly required for basic operation, but they improve usability across the website and application.",
      ],
    },
    {
      id: "marketing-cookies",
      title: "Marketing cookies (future)",
      paragraphs: [
        "We may introduce marketing or advertising cookies in the future to measure campaign performance, understand which channels bring visitors to LawGPT, or deliver more relevant messages about product updates.",
        "If marketing cookies are enabled, we will update this policy and, where required, provide appropriate notice or choice. Until then, LawGPT does not rely on marketing cookies as a core part of the current website experience.",
      ],
    },
    {
      id: "local-storage",
      title: "Local storage and similar technologies",
      paragraphs: [
        "In addition to cookies, LawGPT may use browser local storage or session storage to keep temporary UI state, draft form progress where supported, or preference flags. These technologies are treated similarly to cookies for the purposes of this policy.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party cookies",
      paragraphs: [
        "Some cookies may be set by third-party providers that support hosting, analytics, authentication, customer communication, or—if later enabled—marketing measurement. Those providers process data according to their own policies and our agreements with them.",
        "Embedded content, if added later (for example maps or media players), may also set third-party cookies. We will identify material third-party cookie use as the platform’s tooling expands.",
      ],
    },
    {
      id: "managing-cookies",
      title: "Managing cookies",
      paragraphs: [
        "You can control cookies through your browser settings. Most browsers let you block or delete cookies, or alert you before a cookie is stored. If you block essential cookies, parts of LawGPT—including sign-in and secure document features—may not function.",
        "Where we offer an in-product cookie preference control, you can use it to adjust non-essential categories. You can also clear site data from your browser for lawgpt.ai, lawgptapp.com, and related domains.",
      ],
      lists: [
        {
          items: [
            "Browser settings: use your browser’s privacy or cookies panel to manage site data",
            "Analytics opt-outs: some analytics providers offer their own opt-out mechanisms",
            "Device-level controls: mobile operating systems may offer additional tracking limitations",
          ],
        },
      ],
    },
    {
      id: "retention",
      title: "Cookie duration",
      paragraphs: [
        "Session cookies expire when you close your browser. Persistent cookies remain for a set period or until deleted. Retention periods vary by purpose—for example, security cookies may last for a session, while preference or analytics cookies may persist longer.",
      ],
    },
    {
      id: "updates",
      title: "Updates to this policy",
      paragraphs: [
        "We may update this Cookie Policy when our use of cookies changes or when we introduce new tools. The “Last updated” date at the top of this page will be revised accordingly.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `Questions about cookies or this policy can be sent to [${email}](mailto:${email}) or through our [Contact](/contact) page.`,
      ],
    },
  ],
};
