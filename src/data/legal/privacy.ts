import { contactPublic } from "@/data/contact";
import { siteConfig } from "@/data/site";
import type { LegalDocument } from "@/types/legal";

const company = contactPublic.companyName;
const email = contactPublic.generalEmail;
const office = contactPublic.registeredOffice.lines.join(" ");

export const privacyPolicy: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  shortTitle: "Privacy Policy",
  description:
    "How LawGPT collects, uses, stores, and protects personal information across accounts, workflows, documents, and contact forms.",
  lastUpdated: "2026-08-09",
  lastUpdatedLabel: "9 August 2026",
  intro:
    "This Privacy Policy explains how LawGPT AI Products (P.) Limited (“LawGPT”, “we”, “us”, or “our”) collects, uses, shares, and protects personal information when you use our website, platform, Legal Guides, contact forms, and related services.",
  seo: {
    title: "Privacy Policy | LawGPT",
    description:
      "Learn how LawGPT collects and protects account data, uploaded documents, AI workflow inputs, cookies, analytics, and contact form enquiries.",
    keywords: [
      "LawGPT privacy policy",
      "LawGPT data protection",
      "legal document privacy India",
      "AI legal platform privacy",
    ],
  },
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      paragraphs: [
        `${company} operates LawGPT, an AI-powered platform that helps users understand legal problems, complete guided workflows, generate lawyer-grade documents, access legal research context, optionally request Lawyer Review+, and download filing packages.`,
        `Our registered office is at ${office}. For privacy questions, contact us at [${email}](mailto:${email}) or through our [Contact](/contact) page.`,
      ],
    },
    {
      id: "scope",
      title: "Scope of this policy",
      paragraphs: [
        "This policy applies to personal information processed through:",
      ],
      lists: [
        {
          items: [
            `The LawGPT marketing website at ${siteConfig.url}, including Legal Guides, platform pages, pricing, search, and contact forms`,
            `The LawGPT application at ${siteConfig.appUrl}, including user accounts, workflows, document generation, legal research tools, Lawyer Review+, and secure document storage`,
            "Related communications such as support emails, product notifications, and enquiry acknowledgements",
          ],
        },
      ],
      subsections: [
        {
          id: "not-covered",
          title: "What this policy does not cover",
          paragraphs: [
            "This policy does not cover third-party websites or services that we do not control, even if they are linked from LawGPT. If a lawyer or other professional reviews your matter under Lawyer Review+, their professional obligations may also apply to how they handle materials shared for that review.",
          ],
        },
      ],
    },
    {
      id: "information-collected",
      title: "Information we collect",
      subsections: [
        {
          id: "account-information",
          title: "Account information",
          paragraphs: [
            "When you create or manage a LawGPT account, we may collect your name, email address, phone number, organisation or firm details (if provided), authentication credentials, and account preferences.",
          ],
        },
        {
          id: "workflow-and-case-inputs",
          title: "Workflow and case inputs",
          paragraphs: [
            "When you use guided legal workflows, we collect the information you enter to describe your matter. This may include facts about a dispute, employment details, consumer transaction history, cheque or FIR-related information, timelines, counterparties, and other case-specific answers required to progress a workflow.",
          ],
        },
        {
          id: "uploaded-documents",
          title: "Uploaded documents and generated materials",
          paragraphs: [
            "You may upload supporting files such as notices, contracts, memos, identity or address proofs, correspondence, or other evidence. LawGPT also stores materials generated for you, including draft documents, research summaries, workflow outputs, and filing packages.",
          ],
        },
        {
          id: "ai-processing-data",
          title: "AI processing data",
          paragraphs: [
            "To provide AI-powered guidance, document drafting, research assistance, and workflow recommendations, we process the content you submit in conversations, forms, uploads, and workflow steps. Processing is performed to generate outputs for your matter and to operate the platform safely and reliably.",
          ],
        },
        {
          id: "contact-form-data",
          title: "Contact and support enquiries",
          paragraphs: [
            "If you submit a contact form or support request, we collect your name, email, optional phone and company details, category, subject, message, and related metadata needed to route and respond to the enquiry (such as submission time). For more about public contact channels, see [Contact](/contact).",
          ],
        },
        {
          id: "usage-and-device",
          title: "Usage, device, and technical data",
          paragraphs: [
            "We may collect IP address, browser type, device information, pages viewed, referring URLs, search queries within the LawGPT site search, approximate location derived from IP, and diagnostic logs. This helps us secure the service, improve performance, and understand how the platform is used.",
          ],
        },
        {
          id: "payment-data",
          title: "Payment and subscription data",
          paragraphs: [
            "If you purchase Pro, Lawyer Review+, or other paid features, we and our payment processors collect billing-related information needed to process the transaction. We do not store full card numbers on LawGPT servers when payments are handled by a third-party processor.",
          ],
        },
      ],
    },
    {
      id: "how-we-use",
      title: "How we use information",
      paragraphs: ["We use personal information to:"],
      lists: [
        {
          items: [
            "Create and manage user accounts",
            "Operate guided legal workflows and AI assistance",
            "Generate lawyer-grade documents, research context, and filing packages",
            "Provide optional Lawyer Review+ when you request it",
            "Store documents securely in your workspace",
            "Respond to contact forms, demos, partnerships, media, careers, and support requests",
            "Process payments, subscriptions, and invoices",
            "Improve product quality, reliability, safety, and user experience",
            "Detect abuse, fraud, security incidents, and unacceptable use",
            "Comply with applicable law and enforce our [Terms of Service](/terms)",
          ],
        },
      ],
    },
    {
      id: "ai-processing",
      title: "AI processing",
      paragraphs: [
        "LawGPT uses AI systems to interpret workflow answers, suggest next steps, draft documents, and surface research-related context. AI outputs are generated from the information you provide and from platform models, templates, and tooling.",
        "AI processing is a core part of the service. You should not submit information that you are not authorised to share. AI outputs are not a substitute for independent legal advice unless a human lawyer reviews your matter under Lawyer Review+. See our [Disclaimer](/disclaimer).",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      paragraphs: [
        "We use cookies and similar technologies for essential site operation, authentication, preferences, analytics, and—where enabled in the future—marketing measurement. Details are set out in our [Cookie Policy](/cookies).",
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      paragraphs: [
        "We may use privacy-conscious analytics to understand aggregate traffic, feature usage, funnel completion, and product performance. Analytics helps us improve Legal Guides, workflows, search, and the overall platform experience. Where required, we configure analytics tools to limit unnecessary personal data collection.",
      ],
    },
    {
      id: "sharing",
      title: "When we share information",
      paragraphs: [
        "We do not sell your personal information. We may share information only in these circumstances:",
      ],
      lists: [
        {
          items: [
            "Service providers that help us host infrastructure, send emails, process payments, provide analytics, or deliver customer support, under appropriate contractual safeguards",
            "Lawyer Review+ professionals or review partners when you request that service, limited to materials needed for the review",
            "Legal, regulatory, or law-enforcement authorities when required by applicable law or to protect rights, safety, and security",
            "Business transfer counterparts in connection with a merger, acquisition, financing, or sale of assets, subject to appropriate protections",
          ],
        },
      ],
    },
    {
      id: "third-parties",
      title: "Third-party services",
      paragraphs: [
        "LawGPT relies on carefully selected third-party processors for functions such as cloud hosting, email delivery (for example, transactional mail providers), payment processing, analytics, and security monitoring. These providers are permitted to process personal information only as needed to perform services for us and as permitted by contract and law.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We design LawGPT so that case materials can remain in a secure workspace. We use administrative, technical, and organisational measures appropriate to the nature of the data, including access controls, encrypted transport, monitoring, and operational safeguards.",
        "No method of transmission or storage is completely secure. You are responsible for maintaining the confidentiality of your account credentials and for using strong authentication practices.",
      ],
    },
    {
      id: "retention",
      title: "Data retention",
      paragraphs: [
        "We retain personal information for as long as needed to provide the service, maintain your account and documents, comply with legal obligations, resolve disputes, and enforce agreements.",
        "Workflow inputs, uploaded documents, generated drafts, and filing packages are generally retained while your account remains active, or for a longer period if required for legal, security, or accounting reasons. Contact form records are retained as needed to handle the enquiry and maintain business records. When retention is no longer required, we delete or anonymise information in accordance with our operational practices.",
      ],
    },
    {
      id: "user-rights",
      title: "Your rights",
      paragraphs: [
        "Subject to applicable Indian law and any other laws that apply to you, you may request access to, correction of, or deletion of certain personal information, or ask us to restrict or object to certain processing. You may also update account profile details where the product allows self-service edits.",
        `To exercise a privacy request, email [${email}](mailto:${email}) with sufficient detail for us to verify your identity and respond. We may decline requests that are unlawful, excessive, or would compromise the rights of others.`,
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "LawGPT is intended for adults and organisations using the platform for legitimate legal workflow purposes. We do not knowingly collect personal information from children under 18. If you believe a child has provided us personal information, contact us and we will take appropriate steps.",
      ],
    },
    {
      id: "international",
      title: "International processing",
      paragraphs: [
        "LawGPT is operated from India. Depending on our service providers and infrastructure, information may be processed in India or in other countries where our vendors operate. Where we transfer personal information, we take steps designed to provide appropriate protection consistent with this policy and applicable law.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date at the top of this page. Material changes may also be communicated through the website, application, or email where appropriate. Continued use of LawGPT after an update means you acknowledge the revised policy.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `For privacy questions or requests, contact ${company} at [${email}](mailto:${email}), call ${contactPublic.phones.join(" or ")}, or write to ${office}. You may also use the [Contact](/contact) page.`,
      ],
    },
  ],
};
