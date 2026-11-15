/**
 * Globals used by the /sars pages only: the Meta Pixel function, Tally's embed
 * loader and Wistia's <wistia-player> element.
 */
import type { WistiaElement } from "@/lib/wistia";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    Tally?: { loadEmbeds: () => void };
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "media-id": string;
        aspect?: string;
        autoplay?: string;
        muted?: string;
        "player-color"?: string;
        ref?: React.Ref<WistiaElement>;
      };
    }
  }
}
