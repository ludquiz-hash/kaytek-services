"use client";

import { BUSINESS_CONFIG } from "@/lib/config";

interface PhoneButtonProps {
  variant?: "primary" | "secondary" | "floating";
  size?: "sm" | "md" | "lg";
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
    size === "lg"
      ? `Appeler maintenant — ${BUSINESS_CONFIG.phone}`
      : `📞 ${BUSINESS_CONFIG.phone}`;

  const displayText = text || defaultText;

  const baseClasses =
    "inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 tracking-wide";

  const variantClasses = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl active:scale-95",
    secondary:
      "bg-white hover:bg-gray-50 text-orange-600 border-2 border-orange-500 shadow hover:shadow-md active:scale-95",
    floating:
      "bg-orange-500 hover:bg-orange-600 text-white shadow-2xl fixed bottom-6 right-6 z-50 rounded-full animate-pulse",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-5 text-xl",
  };

  const floatingClasses =
    variant === "floating" ? "w-16 h-16 text-2xl p-0" : "";

  return (
    <a
      href={BUSINESS_CONFIG.phoneHref}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${floatingClasses} ${className}`}
      onClick={() => {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "phone_click", {
            event_category: "lead",
            event_label: "phone_button",
          });
        }
      }}
    >
      {variant === "floating" ? "📞" : displayText}
    </a>
  );
}
