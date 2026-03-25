type ArchitectureDiagramProps = {
  summary: string;
  layers: Array<{
    name: string;
    detail: string;
  }>;
};

export default function ArchitectureDiagram({ summary, layers }: ArchitectureDiagramProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#07101f] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
      <p className="text-sm leading-7 text-slate-300">{summary}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {layers.map((layer, index) => (
          <div key={layer.name} className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            {index < layers.length - 1 ? (
              <div className="pointer-events-none absolute right-[-12px] top-1/2 hidden h-px w-6 bg-gradient-to-r from-cyan-300 to-transparent lg:block" />
            ) : null}
            <p className="showcase-chip">Layer {index + 1}</p>
            <h3 className="mt-4 text-lg font-semibold text-white">{layer.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{layer.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
