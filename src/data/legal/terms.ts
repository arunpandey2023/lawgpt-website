import { contactPublic } from "@/data/contact";
import { siteConfig } from "@/data/site";
import type { LegalDocument } from "@/types/legal";

const company = contactPublic.companyName;
const email = contactPublic.generalEmail;
const office = contactPublic.registeredOffice.lines.join(" ");

export const termsOfService: LegalDocument = {
  slug: "terms",
  title: "Terms of Service",
  shortTitle: "Terms of Service",
  description:
    "Terms governing use of the LawGPT website, AI workflows, document generation, Lawyer Review+, accounts, and payments.",
  lastUpdated: "2026-08-09",
  lastUpdatedLabel: "9 August 2026",
  intro:
    "These Terms of Service (“Terms”) govern your access to and use of LawGPT, including our website, application, Legal Guides, guided workflows, AI assistance, document generation, Lawyer Review+, filing packages, and related services. By using LawGPT, you agree to these Terms.",
  seo: {
    title: "Terms of Service | LawGPT",
    description:
      "Read the LawGPT Terms of Service covering platform use, AI limitations, Lawyer Review+, payments, liability, and governing law in India.",
    keywords: [
      "LawGPT terms of service",
      "LawGPT user agreement",
      "AI legal platform terms India",
      "Lawyer Review+ terms",
    ],
  },
  sections: [
    {
      id: "agreement",
      title: "Agreement to these Terms",
      paragraphs: [
        `These Terms form a binding agreement between you and ${company} (“LawGPT”, “we”, “us”, or “our”). If you use LawGPT on behalf of an organisation, you represent that you have authority to bind that organisation.`,
        "If you do not agree to these Terms, do not use the platform. Additional product-specific terms may apply to certain paid features; if they conflict with these Terms for that feature, the specific terms control for that feature.",
      ],
    },
    {
      id: "the-platform",
      title: "The LawGPT platform",
      paragraphs: [
        "LawGPT is an AI operating system for legal services. It provides tools that help users:",
      ],
      lists: [
        {
          items: [
            "Understand a legal problem through guided intake",
            "Complete structured legal workflows",
            "Generate lawyer-grade draft documents",
            "Access legal research context relevant to a matter",
            "Optionally request Lawyer Review+",
            "Download filing packages and manage documents in a secure workspace",
            "Browse Legal Guides and use platform search on the website",
          ],
        },
      ],
      subsections: [
        {
          id: "not-a-law-firm",
          title: "LawGPT is not a law firm",
          paragraphs: [
            "LawGPT is a technology company. We are not a law firm and do not create an advocate–client relationship merely because you use the website, workflows, AI features, or document tools. Please read our [Disclaimer](/disclaimer).",
          ],
        },
      ],
    },
    {
      id: "accounts",
      title: "Accounts and eligibility",
      paragraphs: [
        "You must provide accurate account information and keep it updated. You are responsible for safeguarding login credentials and for activity under your account.",
        "You must be at least 18 years old and legally capable of entering into these Terms. You may not share accounts in a way that violates these Terms or compromises security.",
      ],
    },
    {
      id: "platform-usage",
      title: "Platform usage",
      paragraphs: [
        "Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable right to access and use LawGPT for your internal personal or business purposes.",
        `The marketing website at ${siteConfig.url} and the application at ${siteConfig.appUrl} may offer different features. We may update, add, or remove features as the product evolves.`,
      ],
    },
    {
      id: "user-responsibilities",
      title: "User responsibilities",
      paragraphs: ["You agree that you will:"],
      lists: [
        {
          items: [
            "Provide information that is accurate to the best of your knowledge",
            "Review all AI-generated guidance, documents, research outputs, and filing packages before relying on them or submitting them to any authority, court, employer, or counterpart",
            "Obtain any permissions needed to upload documents or share third-party personal data",
            "Comply with applicable laws, court rules, and professional obligations that apply to you",
            "Use Lawyer Review+ outputs and any lawyer communications responsibly and only for the intended matter",
          ],
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: ["You may not:"],
      lists: [
        {
          items: [
            "Use LawGPT for unlawful, fraudulent, harassing, or abusive purposes",
            "Attempt to reverse engineer, scrape, or disrupt the platform except as permitted by law",
            "Upload malware or content you do not have rights to use",
            "Misrepresent AI-generated drafts as independently lawyer-drafted work when they have not been reviewed under Lawyer Review+ or by your own counsel",
            "Interfere with other users, security controls, or platform integrity",
            "Use the service to build a competing product by systematically extracting LawGPT workflows, prompts, templates, or content",
          ],
        },
      ],
    },
    {
      id: "ai-limitations",
      title: "AI limitations",
      paragraphs: [
        "AI systems can be incomplete, outdated, or incorrect. LawGPT outputs may omit relevant facts, misinterpret your inputs, or fail to reflect local practice, recent legal changes, or case-specific strategy.",
        "You must independently evaluate whether an output is suitable for your situation. Except where Lawyer Review+ expressly applies, platform outputs are informational and workflow-assistance tools, not legal advice.",
      ],
    },
    {
      id: "lawyer-review",
      title: "Lawyer Review+",
      paragraphs: [
        "Lawyer Review+ is an optional paid add-on through which a human legal professional may review selected materials associated with your matter. Availability, scope, turnaround, and pricing may vary by workflow and offering.",
        "Lawyer Review+ does not convert LawGPT into a law firm. The reviewing professional’s engagement, if any, is limited to the review scope described at the time of purchase or request. You remain responsible for final decisions, filings, and compliance with procedural requirements.",
      ],
    },
    {
      id: "documents-and-filings",
      title: "Documents, research, and filings",
      paragraphs: [
        "Document generation, legal research tools, and filing packages are designed to help you organise and prepare materials. They do not guarantee acceptance by any court, authority, employer, bank, or opposing party.",
        "You are solely responsible for verifying facts, attaching correct evidence, meeting limitation periods, paying applicable fees, and making any required submissions.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "LawGPT and its software, workflows, interfaces, branding, Legal Guides, templates, and documentation are owned by us or our licensors and are protected by intellectual property laws.",
        "Subject to these Terms, you retain rights in the content you submit. You grant LawGPT a licence to host, process, transmit, and display that content as needed to operate the service, provide AI processing, deliver Lawyer Review+, improve safety and reliability, and meet legal obligations.",
        "Drafts and packages generated for you may be used by you for your matter. You may not copy LawGPT’s product design, workflow logic, or proprietary content to create a competing service.",
      ],
    },
    {
      id: "payments",
      title: "Payments",
      paragraphs: [
        "Certain features require payment, including Pro subscriptions and Lawyer Review+ add-ons. Prices, billing intervals, taxes, and included entitlements are described on the [Pricing](/pricing) page or at checkout and may change from time to time.",
        "By purchasing a paid feature, you authorise us and our payment processors to charge the applicable amounts. Subscriptions renew according to the plan you select until cancelled in accordance with the product’s cancellation flow or by contacting support.",
      ],
    },
    {
      id: "refunds",
      title: "Refunds",
      paragraphs: [
        "Except where required by applicable law or expressly stated at the time of purchase, fees for subscriptions and Lawyer Review+ are generally non-refundable once the relevant service period has started or the review has been initiated.",
        "If you believe you were charged in error, contact us promptly at [support@lawgptapp.com](mailto:support@lawgptapp.com) or through [Contact](/contact). We may offer goodwill adjustments at our discretion. A more detailed refund policy may be published as paid offerings expand.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      paragraphs: [
        "Our collection and use of personal information is described in the [Privacy Policy](/privacy). By using LawGPT, you also acknowledge that policy.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party services",
      paragraphs: [
        "The platform may integrate or depend on third-party services such as hosting, email delivery, analytics, and payment processors. Those services are subject to their own terms. We are not responsible for third-party services we do not control.",
      ],
    },
    {
      id: "suspension",
      title: "Suspension and termination",
      paragraphs: [
        "We may suspend or terminate access if you violate these Terms, create risk for other users or the platform, fail to pay amounts due, or if required by law. You may stop using LawGPT at any time. Provisions that by their nature should survive termination will survive, including intellectual property, disclaimers, limitations of liability, and governing law.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      paragraphs: [
        "To the maximum extent permitted by law, LawGPT is provided on an “as is” and “as available” basis. We disclaim warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement, except where such disclaimers are not permitted.",
        "We do not warrant that workflows, AI outputs, documents, research, or filing packages will be error-free, uninterrupted, or suitable for every jurisdiction, forum, or strategy. Additional important notices appear in the [Disclaimer](/disclaimer).",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by applicable law, LawGPT and its directors, employees, and partners will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost data, business interruption, or procurement of substitute services, arising out of or related to your use of the platform.",
        "To the maximum extent permitted by law, our aggregate liability for claims relating to the service will not exceed the greater of (a) the amounts you paid to LawGPT for the service giving rise to the claim during the three months before the event, or (b) INR 5,000. Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the fullest extent permitted.",
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      paragraphs: [
        "You agree to indemnify and hold harmless LawGPT and its officers, directors, employees, and agents from claims, damages, losses, and expenses (including reasonable legal fees) arising out of your misuse of the platform, your content, your filings or submissions, or your violation of these Terms or applicable law.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law and disputes",
      paragraphs: [
        "These Terms are governed by the laws of India, without regard to conflict-of-law principles. Courts in Bengaluru, Karnataka, India shall have exclusive jurisdiction over disputes arising out of or relating to these Terms or the service, subject to any mandatory consumer protections that apply to you.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these Terms",
      paragraphs: [
        "We may update these Terms as LawGPT evolves. We will revise the “Last updated” date and may provide additional notice for material changes. Continued use after changes become effective constitutes acceptance of the updated Terms.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `Questions about these Terms may be sent to ${company} at [${email}](mailto:${email}), ${contactPublic.phones.join(" / ")}, or ${office}. You may also reach us via [Contact](/contact).`,
      ],
    },
  ],
};
