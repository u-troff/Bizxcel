"use client";

import { useEffect, useRef, type RefObject } from "react";

import type { WistiaElement } from "@/lib/wistia";
import { trackCustom } from "../track";

/** [event name, share of the video watched]. Play has no threshold. */
const MILESTONES: ReadonlyArray<readonly [string, number]> = [
  ["VSL_25", 0.25],
  ["VSL_40", 0.4],
  ["VSL_50", 0.5],
  ["VSL_75", 0.75],
  ["VSL_95", 0.95],
];

/** A time-update that moves further than this (share of the video) was a seek. */
const MAX_NATURAL_STEP = 0.05;

/**
 * Fires VSL_Play and the watch milestones to the SARS dataset, from Wistia's
 * player. These events build the retargeting audiences, so:
 *   - the player is NOT muted and the volume is above zero,
 *   - the video is at least half on screen,
 *   - playback is continuous: only a threshold crossed by normal playback
 *     counts, so seeking forward does not tick milestones.
 * A muted autoplay that is scrolled past fires nothing.
 *
 * Does nothing without `trackAs`.
 */
export function useWistiaMilestones(
  playerRef: RefObject<WistiaElement | null>,
  trackAs: string | undefined,
) {
  const fired = useRef(new Set<string>());

  useEffect(() => {
    const player = playerRef.current;
    if (!trackAs || !player) return;

    let inView = false;
    let lastPercent = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.5 },
    );
    observer.observe(player);

    const fire = (name: string, percent: number) => {
      if (fired.current.has(name)) return;
      fired.current.add(name);
      trackCustom(name, { video: trackAs, percent });
    };

    const onTimeUpdate = () => {
      const duration = player.duration;
      if (!duration || !Number.isFinite(duration)) return;

      const prev = lastPercent;
      const percent = player.currentTime / duration;
      lastPercent = percent;

      // A jump is a seek. Reset the baseline and count nothing.
      if (Math.abs(percent - prev) > MAX_NATURAL_STEP) return;

      // Heard and seen, or it does not count.
      const audible = !player.muted && player.volume > 0;
      if (!inView || !audible) return;

      if (percent > 0) fire("VSL_Play", Math.round(percent * 100));
      MILESTONES.forEach(([name, at]) => {
        if (prev < at && percent >= at) fire(name, Math.round(at * 100));
      });
    };

    // A restart from the top is a fresh run of natural steps.
    const onPlay = () => {
      lastPercent = player.currentTime / (player.duration || 1);
    };

    player.addEventListener("time-update", onTimeUpdate);
    player.addEventListener("play", onPlay);
    return () => {
      observer.disconnect();
      player.removeEventListener("time-update", onTimeUpdate);
      player.removeEventListener("play", onPlay);
    };
  }, [playerRef, trackAs]);
}
