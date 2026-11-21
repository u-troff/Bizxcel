import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { hero, testimonials, testimonialsSection } from "@/lib/sars-content";
import ApplyCta from "./_components/ApplyCta";
import { RichText, stripMarkup } from "./_components/RichText";
import SarsFooter from "./_components/SarsFooter";
import SarsHeader from "./_components/SarsHeader";
import StickyCta from "./_components/StickyCta";
import VideoRail from "./_components/VideoRail";
import WistiaVsl from "./_components/WistiaVsl";

/** [YOU] Swap for the real Wistia media ID once the VSL is uploaded. */
const SARS_VSL_ID = "TODO_SARS_VSL";
/** Bump to v2 when the video is replaced, so old and new watch data stay apart. */
const VSL_TRACK_AS = "sars_vsl_v1";

/** The hero button. The sticky bar appears once this has scrolled out of view. */
const HERO_CTA_ID = "sars-hero-cta";

const readyTestimonials = testimonials.filter((t) => !t.videoId.startsWith("TODO"));

/**
 * /sars: logo, hero, the video, one button, client videos. Nothing else.
 * The button goes to /sars/apply, the one-question-per-screen form.
 */
export default function SarsPage() {
  return (
    <>
      <SarsHeader />

      <main id="main-content" className="bg-white">
        {/* 1. Hero. Centred, and short so the video starts high on a phone. */}
        <section className="pb-5 pt-6 text-center sm:pb-8 sm:pt-12">
          <Container className="max-w-3xl">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-3 text-balance text-[1.85rem] font-bold leading-[1.1] text-ink sm:mt-5 sm:text-6xl">
              <RichText text={hero.headline} />
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] leading-snug text-body sm:mt-5 sm:text-lg sm:leading-relaxed">
              <RichText text={hero.sub} />
            </p>
          </Container>
        </section>

        {/* 2. The video, with the one button straight under it */}
        <section className="pb-12 md:pb-16">
          <Container>
            <WistiaVsl
              videoId={SARS_VSL_ID}
              title={stripMarkup(hero.headline)}
              aspect="4/5"
              trackAs={VSL_TRACK_AS}
            />
            <div className="mx-auto mt-6 max-w-[480px] text-center">
              <ApplyCta id={HERO_CTA_ID} className="w-full">
                {hero.cta}
              </ApplyCta>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted">{hero.ctaNote}</p>
            </div>
          </Container>
        </section>

        {/* 3. Client videos. Nothing at all until real video IDs are added. */}
        {readyTestimonials.length ? (
          <section className="bg-cream py-12 text-center md:py-16">
            <h2 className="px-5 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              {testimonialsSection.title}
            </h2>
            <div className="mt-6">
              <VideoRail videos={readyTestimonials} />
            </div>
          </section>
        ) : null}
      </main>

      <SarsFooter stickyPad />
      <StickyCta heroCtaId={HERO_CTA_ID} />
    </>
  );
}
