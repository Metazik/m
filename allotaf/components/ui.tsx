import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  tone = "light",
  className,
  children,
  id,
}: {
  tone?: "light" | "mist" | "dark";
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cx(
        "py-20 sm:py-28",
        tone === "mist" && "bg-mist",
        tone === "dark" && "bg-ink text-white",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  dark,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={cx(
        "mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]",
        dark ? "text-muted-dark" : "text-muted",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cx("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {text && (
        <p
          className={cx(
            "mt-4 text-lg leading-relaxed text-pretty",
            dark ? "text-muted-dark" : "text-muted",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost-dark" | "white";
  arrow?: boolean;
  size?: "md" | "lg";
} & ComponentProps<typeof Link>;

export function ButtonLink({
  variant = "primary",
  arrow,
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      {...props}
      className={cx(buttonClass(variant, size), "group", className)}
    >
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </Link>
  );
}

export function buttonClass(
  variant: ButtonProps["variant"] = "primary",
  size: ButtonProps["size"] = "md",
) {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    size === "lg" ? "h-12 px-6 text-base" : "h-11 px-5 text-sm",
    variant === "primary" && "bg-accent text-white hover:bg-accent-strong",
    variant === "secondary" &&
      "border border-line bg-white text-ink hover:border-ink",
    variant === "ghost-dark" &&
      "border border-ink-line text-white hover:border-white/60",
    variant === "white" && "bg-white text-ink hover:bg-mist",
  );
}
