"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmittingOverlayProps {
  isVisible: boolean;
  title?: string;
  description?: string;
}

export default function SubmittingOverlay({
  isVisible,
  title = "Sending Your Request",
  description = "Please wait while we securely submit your details.",
}: SubmittingOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  console.log("SubmittingOverlay rendering:", { isVisible, mounted });

  if (!isVisible || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      aria-label={title}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white text-slate-900 shadow-2xl rounded-2xl p-8 max-w-sm w-full text-center border border-slate-200">
        <Loader2 className="w-12 h-12 text-[#0F172A] animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-500 font-medium">{description}</p>
      </div>
    </div>,
    document.body
  );
}
