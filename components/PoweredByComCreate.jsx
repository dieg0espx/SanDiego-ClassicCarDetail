"use client";

/**
 * PoweredByComCreate
 * ------------------
 * A tiny, self-contained "Powered by ComCreate" credit badge for client-site footers.
 *
 * - Zero dependencies (plain React, no Tailwind / CSS modules / design tokens required).
 * - Conflict-free: styles are injected once under a unique class prefix.
 * - Pulls the ComCreate wordmark from the CDN (comcreate.io), so branding stays
 *   centrally managed — update the logo once and every site reflects it.
 * - "Powered by" label uses `currentColor`, so it inherits the host footer's color.
 *   The wordmark auto-swaps between its dark/light variants for the background.
 */

import { useEffect } from "react";

const PREFIX = "pbcc";
const DEFAULT_BASE = "https://comcreate.io";

const STYLES = `
.${PREFIX}-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.01em;
  text-decoration: none;
  color: currentColor;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
}
.${PREFIX}-link:hover,
.${PREFIX}-link:focus-visible {
  opacity: 1;
}
.${PREFIX}-link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
  border-radius: 3px;
}
.${PREFIX}-prefix {
  opacity: 0.85;
  font-weight: 400;
}
.${PREFIX}-mark {
  display: block;
  width: auto;
  flex: none;
}
@media (prefers-reduced-motion: reduce) {
  .${PREFIX}-link { transition: none; }
}
`;

function useInjectedStyles() {
  useEffect(() => {
    const id = `${PREFIX}-styles`;
    if (typeof document === "undefined" || document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = STYLES;
    document.head.appendChild(tag);
  }, []);
}

function Wordmark({ base, theme, height }) {
  const light = `${base}/logo.svg`;
  const dark = `${base}/logo-dark.svg`;
  const imgProps = {
    className: `${PREFIX}-mark`,
    alt: "ComCreate",
    height,
    loading: "lazy",
    decoding: "async",
    style: { height: `${height}px` },
  };

  if (theme === "light") return <img src={light} {...imgProps} />;
  if (theme === "dark") return <img src={dark} {...imgProps} />;

  return (
    <picture>
      <source srcSet={dark} media="(prefers-color-scheme: dark)" />
      <img src={light} {...imgProps} />
    </picture>
  );
}

export function PoweredByComCreate({
  href = "https://comcreate.io/?utm_source=client-site&utm_medium=footer&utm_campaign=powered-by",
  theme = "auto",
  align = "start",
  height = 16,
  baseUrl = DEFAULT_BASE,
  className,
  style,
} = {}) {
  useInjectedStyles();

  const justify =
    align === "center" ? "center" : align === "end" ? "flex-end" : "flex-start";

  return (
    <div style={{ display: "flex", justifyContent: justify, width: "100%" }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={[`${PREFIX}-link`, className].filter(Boolean).join(" ")}
        style={style}
        aria-label="Powered by ComCreate (opens in a new tab)"
      >
        <span className={`${PREFIX}-prefix`}>Powered by</span>
        <Wordmark base={baseUrl.replace(/\/$/, "")} theme={theme} height={height} />
      </a>
    </div>
  );
}

export default PoweredByComCreate;
