/**
 * Shared pieces for Wistia's <wistia-player> element (the same markup as
 * Wistia's own embed code, running in our page rather than an iframe).
 */

/** The parts of the element we use. */
export interface WistiaElement extends HTMLElement {
  muted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  paused: boolean;
  captionsEnabled?: boolean;
  play: () => Promise<void> | void;
  pause: () => void;
}

/** Adds a script tag once per page, keyed by its src. */
function loadScriptOnce(src: string, module = false) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  if (module) s.type = "module";
  document.head.appendChild(s);
}

/** Loads Wistia's player library and the script for this one video. */
export function loadWistia(mediaId: string) {
  loadScriptOnce("https://fast.wistia.com/player.js");
  loadScriptOnce(`https://fast.wistia.com/embed/${mediaId}.js`, true);
}
