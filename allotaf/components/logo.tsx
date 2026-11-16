import { cx } from "./ui";

/** Monogramme : deux barres qui convergent, évoquant un flux automatisé. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cx("h-7 w-7", className)}
      aria-hidden
      focusable="false"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M9 23 15.2 9h1.6L23 23"
        fill="none"
        stroke="var(--color-paper, #fff)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="18.4" r="2.2" fill="#3b5bff" />
    </svg>
  );
}

export function Logo({
  className,
  dark,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2.5",
        dark ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark className={dark ? "text-ink-soft" : "text-ink"} />
      <span className="text-[15px] font-semibold tracking-[0.22em]">
        ALLOTAF
      </span>
    </span>
  );
}
