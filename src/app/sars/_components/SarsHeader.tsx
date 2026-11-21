import { Container } from "@/components/ui/Container";

/** Slim bar with the BizXcel wordmark only. No links: the only way forward is the button. */
export default function SarsHeader() {
  return (
    <header className="border-b border-border bg-white">
      <Container className="flex h-14 items-center justify-center sm:h-16">
        <p className="font-serif text-lg font-bold text-ink sm:text-xl">
          BizXcel <span className="text-gold">Kuils River</span>
        </p>
      </Container>
    </header>
  );
}
