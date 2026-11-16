"use client";

import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/forms/quote-form";

/** Pré-coche le besoin quand on arrive depuis une page service (?service=…). */
export function QuoteFormFromUrl({ responseDelay }: { responseDelay: string }) {
  const service = useSearchParams().get("service") ?? undefined;
  return <QuoteForm key={service} defaultService={service} responseDelay={responseDelay} />;
}
