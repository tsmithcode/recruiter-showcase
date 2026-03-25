type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="max-w-3xl space-y-4">
      <div className="flex items-center gap-4">
        <p className="showcase-eyebrow">{eyebrow}</p>
        <div className="showcase-rule max-w-24" />
      </div>
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-7 text-slate-300">{description}</p> : null}
    </header>
  );
}
