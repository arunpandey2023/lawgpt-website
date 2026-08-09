import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 48,
} as const;

interface LogoProps {
  className?: string;
  size?: keyof typeof sizeMap;
}

export function Logo({ className, size = "md" }: LogoProps) {
  const px = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-85",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={siteConfig.brand.logo}
        alt={siteConfig.name}
        width={px}
        height={px}
        priority
        className="rounded-[22%] shadow-sm ring-1 ring-black/5"
        style={{ width: px, height: px }}
      />
    </Link>
  );
}
