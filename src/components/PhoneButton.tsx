"use client";

import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/phone";

// Ré-export pour les composants qui l'importaient depuis ici
export { PHONE_DISPLAY, PHONE_HREF };

interface PhoneButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
}

export default function PhoneButton({
  variant = "primary",
  size = "md",
  text,
  className = "",
}: PhoneButtonProps) {
  const defaultText =
    size === "xl" || size === "lg"
      ? `Appeler le ${PHONE_DISPLAY}`
      : `📞 ${PHONE_DISPLAY}`;

  const displayText = text ?? defaultText;

  const base =
    "inline-flex items-center justify-center gap-2 font-black rounded-xl transition-all duration-150 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300 cursor-pointer";

  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-500",
    ghost: "bg-transparent hover:bg-white/10 text-white border-2 border-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-lg",
    xl: "px-8 py-5 text-xl md:text-2xl",
  };

  return (
    <a href={PHONE_HREF} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {displayText}
    </a>
  );
}
