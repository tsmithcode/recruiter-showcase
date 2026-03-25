type SystemsMapProps = {
  lanes: Array<{
    title: string;
    items: string[];
  }>;
};

export default function SystemsMap({ lanes }: SystemsMapProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {lanes.map((lane) => (
        <section
          key={lane.title}
          className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
        >
          <h3 className="text-lg font-semibold text-white">{lane.title}</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {lane.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
