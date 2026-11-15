"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { loadWistia, type WistiaElement } from "@/lib/wistia";
import { ui } from "@/lib/sars-content";
import { useWistiaMilestones } from "./useWistiaMilestones";

type WistiaVslProps = {
  /** Wistia media ID. An ID starting with TODO shows "Video coming soon". */
  videoId: string;
  /** Read by screen readers. */
  title: string;
  /** Runtime shown under the video, e.g. "2:02". */
  duration?: string;
  /** "4/5" suits portrait footage on a phone. "16/9" is landscape. */
  aspect?: "4/5" | "16/9";
  /** Turns on watch tracking, with this as the video name (e.g. "sars_vsl_v1"). */
  trackAs?: string;
};

const ASPECT = {
  "4/5": { ratio: 4 / 5, frame: "aspect-[4/5] max-w-[480px]" },
  "16/9": { ratio: 16 / 9, frame: "aspect-video max-w-4xl" },
} as const;

/**
 * The page's video, on Wistia's own player (not an iframe).
 *
 * It starts muted with captions on, because muted is the only way browsers
 * allow a video to start by itself. Sound is handed over on the visitor's
 * first tap anywhere on the page, or the sound button, and captions go off
 * once they can hear it. Watch tracking only counts audible, on-screen
 * playback (see useWistiaMilestones).
 */
export default function WistiaVsl({
  videoId,
  title,
  duration,
  aspect = "4/5",
  trackAs,
}: WistiaVslProps) {
  const playerRef = useRef<WistiaElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const isPlaceholder = videoId.startsWith("TODO");
  const { ratio, frame } = ASPECT[aspect];

  useWistiaMilestones(playerRef, trackAs);

  useEffect(() => {
    if (isPlaceholder) return;
    // Wistia wants the player colour as a hex without the hash. Read it from the
    // site's --gold token so the player always matches the brand.
    const gold = getComputedStyle(document.documentElement)
      .getPropertyValue("--gold")
      .trim()
      .replace("#", "");
    if (gold) playerRef.current?.setAttribute("player-color", gold);
    loadWistia(videoId);
  }, [videoId, isPlaceholder]);

  /** Mirrors the player's real state, so its own controls stay in sync. */
  const syncMuted = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    const muted = player.muted || player.volume === 0;
    setIsMuted(muted);
    try {
      // Captions for people who have not turned sound on.
      player.captionsEnabled = muted;
    } catch {
      // Captions are a nicety. A player without them is still fine.
    }
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || isPlaceholder) return;
    // "play" and "api-ready" cover the initial muted start, which has no
    // mute change to react to.
    const watched = ["mute-change", "volume-change", "play", "api-ready"];
    watched.forEach((e) => player.addEventListener(e, syncMuted));
    // The first tap anywhere hands over sound. A tap is a user gesture, so
    // browsers allow it, and the visitor chose to interact with the page.
    const events = ["pointerdown", "touchstart", "keydown"] as const;
    const onFirstGesture = () => {
      events.forEach((e) => window.removeEventListener(e, onFirstGesture));
      if (!player.muted && player.volume > 0) return;
      player.muted = false;
      player.volume = 1;
      void player.play?.();
    };
    events.forEach((e) =>
      window.addEventListener(e, onFirstGesture, { once: true, passive: true }),
    );
    return () => {
      watched.forEach((e) => player.removeEventListener(e, syncMuted));
      events.forEach((e) => window.removeEventListener(e, onFirstGesture));
    };
  }, [isPlaceholder, syncMuted]);

  const toggleSound = () => {
    const player = playerRef.current;
    if (!player) return;
    const nextMuted = !(player.muted || player.volume === 0);
    player.muted = nextMuted;
    if (!nextMuted) player.volume = 1;
    syncMuted();
  };

  return (
    <div className="mx-auto w-full">
      <div
        className={`relative mx-auto w-full overflow-hidden rounded-[10px] border border-border ${frame} ${
          isPlaceholder ? "bg-cream" : "bg-ink"
        }`}
      >
        {isPlaceholder ? (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center font-sans text-sm font-medium text-muted">
            {ui.videoComingSoon}
          </div>
        ) : (
          <>
            <wistia-player
              ref={playerRef}
              media-id={videoId}
              aspect={String(ratio)}
              autoplay="true"
              muted="true"
              aria-label={title}
              style={{
                position: "absolute",
                inset: 0,
                display: "block",
                width: "100%",
                height: "100%",
              }}
            />
            {/* Pinned to the top corner: the bottom of the frame belongs
                to the player's own controls. */}
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!isMuted}
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-[6px] bg-gold px-3 py-2 font-sans text-xs font-semibold text-white transition-colors hover:bg-gold-hover"
            >
              <SoundIcon muted={isMuted} />
              {isMuted ? ui.soundOff : ui.soundOn}
            </button>
          </>
        )}
      </div>

      {isPlaceholder || !duration ? null : (
        <p className="mt-3 text-center font-sans text-xs text-muted">
          {duration} · {isMuted ? ui.videoHintMuted : ui.videoHintSound}
        </p>
      )}
    </div>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      {muted ? (
        <path d="m16 9 5 6m0-6-5 6" />
      ) : (
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      )}
    </svg>
  );
}
