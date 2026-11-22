import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formSection, hero, testimonials, testimonialsSection } from "@/lib/sars-content";
import { RichText, stripMarkup } from "./_components/RichText";
import SarsFooter from "./_components/SarsFooter";
import SarsHeader from "./_components/SarsHeader";
import ApplyFlowLoader from "./apply/ApplyFlowLoader";
import StickyCta from "./_components/StickyCta";
import VideoRail from "./_components/VideoRail";
import WistiaVsl from "./_components/WistiaVsl";

/** Wistia: "BX-SARS-VSL-v3-9x16", 1:31, portrait. */
const SARS_VSL_ID = "qwaqlivit7";
/** Bump to v2 when the video is replaced, so old and new watch data stay apart. */
const VSL_TRACK_AS = "sars_vsl_v1";

/** Anchors for the sticky bar: it shows once the video has scrolled away, and hides at the form. */
const VSL_SECTION_ID = "sars-vsl";
const FORM_ID = "sars-form";

const readyTestimonials = testimonials.filter((t) => !t.videoId.startsWith("TODO"));

/**
 * /sars: logo, hero, the video, the form, client videos. Nothing else.
 * The form is the one-question-per-screen flow from /sars/apply, embedded. Each
 * answer moves to the next question, and the last screen sends to /sars/next-step.
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

        {/* 2. The video */}
        <section id={VSL_SECTION_ID} className="pb-8 md:pb-10">
          <Container>
            <WistiaVsl
              videoId={SARS_VSL_ID}
              title={stripMarkup(hero.headline)}
              aspect="9/16"
              duration="1:31"
              trackAs={VSL_TRACK_AS}
            />
          </Container>
        </section>

        {/* 3. The form, embedded: one question per screen */}
        <section id={FORM_ID} className="scroll-mt-4 pb-12 md:pb-16">
          <Container className="max-w-xl">
            <div className="mb-6 text-center sm:mb-8">
              <h2 className="text-balance text-[2rem] font-bold leading-[1.1] text-ink sm:text-5xl">
                <RichText text={formSection.title} />
              </h2>
              <p className="mt-3 text-base text-body sm:text-lg">{hero.ctaNote}</p>
              <svg
                viewBox="0 0 24 24"
                className="mx-auto mt-4 h-9 w-9 text-gold motion-safe:animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
            <ApplyFlowLoader embedded />
          </Container>
        </section>

        {/* 4. Client videos, under the form. Nothing at all without real video IDs. */}
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
      <StickyCta vslId={VSL_SECTION_ID} formId={FORM_ID} />
    </>
  );
}
