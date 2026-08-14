import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Workflows", href: "/workflows" },
  { label: "Legal Guides", href: "/academy" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav = {
  platform: [
    { label: "Platform", href: "/platform" },
    { label: "How it works", href: "/platform#how-it-works" },
    { label: "Capabilities", href: "/platform#platform" },
    { label: "Start Free", href: "/#start" },
  ],
  workflows: [
    { label: "All workflows", href: "/workflows" },
    { label: "Wrongful Termination", href: "/workflows/wrongful-termination" },
    { label: "Consumer Complaint", href: "/workflows/consumer-complaint" },
    { label: "Cheque Bounce", href: "/workflows/cheque-bounce" },
    { label: "Police Refusing FIR", href: "/workflows/police-refusing-fir" },
    { label: "Drunk Driving", href: "/workflows/drunk-driving" },
  ],
  academy: [
    { label: "Legal Guides", href: "/academy" },
    { label: "Featured guides", href: "/academy#featured" },
    { label: "Workflows", href: "/workflows" },
    { label: "FAQ", href: "/academy" },
  ],
  resources: [
    { label: "Legal Guides", href: "/academy" },
    { label: "Video Center", href: "/platform#videos" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Security", href: "/platform#security" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
} as const;

/** Official LawGPT social profiles (footer + other public surfaces). */
export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/lawgptapp/?viewAsMember=true",
    ariaLabel: "LawGPT on LinkedIn",
    icon: "linkedin" as const,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@LawGPTIndia",
    ariaLabel: "LawGPT on YouTube",
    icon: "youtube" as const,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/LawGPTapp",
    ariaLabel: "LawGPT on Facebook",
    icon: "facebook" as const,
  },
] as const;
