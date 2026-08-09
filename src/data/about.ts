import { siteConfig } from "@/data/site";

export interface AboutPerson {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  linkedin: string;
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
}

export interface AboutTechPoint {
  id: string;
  title: string;
  description: string;
}

export interface AboutStoryBlock {
  id: string;
  text: string;
}

/**
 * Leadership and Advisors are intentionally empty until real photos,
 * bios, designations, and LinkedIn URLs are provided.
 */
export const aboutPage = {
  seo: {
    title: "About LawGPT — Why We Exist",
    description:
      "LawGPT exists to make legal services more accessible through AI while keeping lawyers at the center. Read our mission, vision, story, technology, and values.",
    keywords: [
      "About LawGPT",
      "AI Operating System for Legal Services",
      "LawGPT mission",
      "legal technology India",
      "accessible legal help",
    ],
  },
  hero: {
    eyebrow: "About",
    title: "Making legal services more accessible—without replacing lawyers",
    description:
      "LawGPT is built for a simple idea: people should be able to understand their legal problem, prepare high-quality documents, and reach professional help with clarity and confidence.",
  },
  mission: {
    id: "mission",
    eyebrow: "Our mission",
    title: "Why LawGPT exists",
    paragraphs: [
      "Millions of people struggle to access timely, understandable, and affordable legal help. The legal system is often difficult to navigate—not only because the stakes are high, but because procedure is complex, information is fragmented, and professional support can be expensive.",
      "LawGPT exists to make legal services dramatically more accessible through AI, while keeping lawyers at the center whenever professional expertise is required.",
      "The goal is not to replace lawyers. The goal is to help people reach lawyers better prepared, better informed, and with high-quality lawyer-grade documents already in hand.",
    ],
  },
  vision: {
    id: "vision",
    eyebrow: "Our vision",
    title: "Build the AI Operating System for Legal Services",
    description:
      "LawGPT is not just another legal-tech application. It is a unified platform where the work of understanding a legal problem and preparing to act on it happens in one place.",
    capabilities: [
      "AI guidance",
      "Context-aware questioning",
      "Legal reasoning",
      "Lawyer-grade document generation",
      "Legal research",
      "Lawyer review",
      "Filing package preparation",
    ],
    closing:
      "These are not disconnected tools. They come together in one seamless workflow—so a matter can move from confusion to a filing-ready package without losing context along the way.",
  },
  story: {
    id: "story",
    eyebrow: "Our story",
    title: "A personal experience that shaped the product",
    blocks: [
      {
        id: "origin",
        text: "The idea for LawGPT was born from a deeply personal experience. One of the co-founders has witnessed the realities of the Indian legal system firsthand while his family has been involved in a civil property dispute spanning more than three decades.",
      },
      {
        id: "reality",
        text: "Over those years, the family experienced countless court visits, significant legal expenses running into several lakhs of rupees, repeated delays, procedural complexity, and the emotional toll that prolonged litigation places on ordinary people.",
      },
      {
        id: "truth",
        text: "The experience highlighted a simple truth: for millions of people, understanding and navigating the legal system is often as difficult as the legal problem itself.",
      },
      {
        id: "question",
        text: "That experience became the seed for LawGPT. The founders began asking a simple question: what if technology could make legal guidance, legal documents, and legal processes dramatically more accessible, transparent, and affordable—without replacing lawyers?",
      },
      {
        id: "today",
        text: "That question evolved into LawGPT. Today, our mission is to build the AI Operating System for Legal Services—helping individuals and businesses navigate legal problems with greater confidence, while enabling lawyers to focus on the work that truly requires professional expertise.",
      },
    ] satisfies AboutStoryBlock[],
  },
  leadership: {
    id: "leadership",
    eyebrow: "Leadership",
    title: "The people building LawGPT",
    description:
      "A small founding team focused on making legal workflows clearer, more complete, and more usable.",
    people: [
      {
        id: "arun-pandey",
        name: "Arun Pandey",
        role: "Founder & CEO",
        bio: "Serial entrepreneur with two successful exits and more than 25 years of technology leadership. An AI Innovator Award winner, bestselling author, patent holder, and three-time MVP Award winner at Oracle, Arun leads AI, technology, and product at LawGPT.",
        image: "/assets/about/arun-pandey.jpg",
        imageAlt: "Arun Pandey, Founder and CEO of LawGPT",
        linkedin: "https://www.linkedin.com/in/arun-pandey-88143311",
      },
      {
        id: "alok-bharti",
        name: "Alok Bharti",
        role: "Co-Founder & CSO",
        bio: "Serial entrepreneur and digital marketing platforms veteran, including experience at IndiaMART. Alok brings deep expertise across digital marketing ecosystems and leads sales and marketing for LawGPT.",
        image: "/assets/about/alok-bharti.jpg",
        imageAlt: "Alok Bharti, Co-Founder and CSO of LawGPT",
        linkedin: "https://www.linkedin.com/in/bharti-alok/",
      },
      {
        id: "ashish-awasthi",
        name: "Ashish Awasthi",
        role: "Co-Founder & Engineering Head",
        bio: "Product, engineering, data, and AI leader with prior experience at Flipkart, Ola, Lazada, and Jabong. Ashish leads product engineering and scale at LawGPT.",
        image: "/assets/about/ashish-awasthi.jpg",
        imageAlt: "Ashish Awasthi, Co-Founder and Engineering Head of LawGPT",
        linkedin: "https://www.linkedin.com/in/awasthi-ashish/",
      },
    ] satisfies AboutPerson[],
  },
  advisors: {
    id: "advisors",
    eyebrow: "Advisors",
    title: "Guidance from people who understand growth, ethics, and scale",
    description:
      "Advisors help us stay grounded while building software that can grow with care.",
    people: [
      {
        id: "ravi-changle",
        name: "Dr. Ravi Changle",
        role: "Advisor",
        bio: "Member of the Forbes Council and an entrepreneur focused on AI leadership, with engagement across international forums. Ravi advises LawGPT on ecosystem connections and ethical AI.",
        image: "/assets/about/ravi-changle.jpg",
        imageAlt: "Dr. Ravi Changle, Advisor to LawGPT",
        linkedin: "https://www.linkedin.com/in/drravichangle/",
      },
      {
        id: "rohit-jindal",
        name: "Rohit Jindal",
        role: "Advisor",
        bio: "Co-Founder and Chief Business Officer at MyGate, active angel investor, and serial entrepreneur. Rohit advises LawGPT on marketing and sales leadership, thought leadership, and growth.",
        image: "/assets/about/rohit-jindal.jpg",
        imageAlt: "Rohit Jindal, Advisor to LawGPT",
        linkedin: "https://www.linkedin.com/in/rohit-jindal-32653214/",
      },
    ] satisfies AboutPerson[],
  },
  technology: {
    id: "technology",
    eyebrow: "Our technology",
    title: "Principles behind the platform",
    description:
      "LawGPT is designed as an AI-first legal platform—guided, structured, and built to work alongside human expertise.",
    points: [
      {
        id: "ai-first",
        title: "AI-first platform",
        description:
          "AI is used to structure matters, ask better questions, and prepare drafts—not to produce unsupported legal conclusions.",
      },
      {
        id: "workflows",
        title: "Guided legal workflows",
        description:
          "Each workflow follows a clear path from problem to package, so users always know what stage they are in.",
      },
      {
        id: "reasoning",
        title: "Context-aware legal reasoning",
        description:
          "The platform keeps facts, documents, and next steps connected, so guidance stays grounded in the matter at hand.",
      },
      {
        id: "documents",
        title: "Lawyer-grade document generation",
        description:
          "Outputs are designed as serious working drafts—structured, editable, and ready for review.",
      },
      {
        id: "review",
        title: "Human lawyer review",
        description:
          "When professional judgment is needed, Lawyer Review+ can be added without turning software into a substitute for counsel.",
      },
      {
        id: "security",
        title: "Secure, privacy-first architecture",
        description:
          "Sensitive legal information belongs in a private workspace with secure storage and responsible handling as foundational requirements.",
      },
      {
        id: "improve",
        title: "Continuous improvement",
        description:
          "Workflows, documents, and product quality improve over time as we learn from real use—not from one-off demos.",
      },
    ] satisfies AboutTechPoint[],
  },
  values: {
    id: "values",
    eyebrow: "Our values",
    title: "What guides every product decision",
    items: [
      {
        id: "accessibility",
        title: "Accessibility",
        description:
          "We believe quality legal help should be accessible to everyone—not only to those who already know how the system works.",
      },
      {
        id: "accuracy",
        title: "Accuracy",
        description:
          "Every workflow is designed to produce reliable, lawyer-grade outputs grounded in the facts a user provides.",
      },
      {
        id: "transparency",
        title: "Transparency",
        description:
          "Users should always understand where they are in the legal process and what the next step is for.",
      },
      {
        id: "trust",
        title: "Trust",
        description:
          "Security, privacy, and responsible AI are fundamental—not secondary features added later.",
      },
      {
        id: "innovation",
        title: "Innovation",
        description:
          "We continuously improve how technology supports legal services without losing sight of professional judgment.",
      },
      {
        id: "user-first",
        title: "User first",
        description:
          "Every product decision begins with solving a real user problem, not with adding complexity for its own sake.",
      },
    ] satisfies AboutValue[],
  },
  careers: {
    id: "careers",
    eyebrow: "Careers",
    title: "Join us",
    description:
      "We're building the future of legal technology. If you're passionate about AI, law, design, or engineering, we'd love to hear from you.",
    status: "Career opportunities coming soon.",
    contactHref: "/contact?category=careers#contact-form",
  },
  contact: {
    id: "contact",
    eyebrow: "Contact",
    title: "Get in touch",
    description:
      "For product questions, partnerships, or press, visit our contact hub or email us directly.",
    emailLabel: "contact@lawgptapp.com",
    emailHref: "mailto:contact@lawgptapp.com",
    pageHref: "/contact",
    pageLabel: "Open contact hub",
  },
  cta: {
    eyebrow: "Experience LawGPT",
    title: "Start your first legal workflow",
    description:
      "Explore a launched workflow, answer guided questions, and see how LawGPT turns a legal problem into a clearer next step.",
    primaryLabel: "Start Your First Legal Workflow",
    primaryHref: siteConfig.appUrl,
    secondaryLabel: "Explore the platform",
    secondaryHref: "/platform",
  },
} as const;
