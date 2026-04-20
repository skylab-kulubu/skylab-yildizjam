import PageSection from "./PageSection";

export default function Features() {
  return (
    <PageSection
      id="features"
      tag="CORE_FEATURES"
      title="NEDEN KATILMALISIN?"
      variant="hero"
      color="var(--color-brand-glow)"
      showBar={true}
    >
      <div className="w-full text-white/60">neden katılmalıyım</div>
    </PageSection>
  );
}
