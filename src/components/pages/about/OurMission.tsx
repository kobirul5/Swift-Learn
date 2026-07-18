import { Check, Globe2, Lightbulb, Target } from 'lucide-react'

const missionPoints = [
  'Make expert-led learning available wherever you are.',
  'Turn curiosity into practical, career-ready skills.',
  'Create an inclusive space where every learner can grow.',
]

export default function OurMission() {
  return (
    <section className="relative mb-16 overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl shadow-primary-900/10 sm:px-10 md:py-14 lg:px-14">
      <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl" />
      <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-100">
            <Target className="h-4 w-4 text-primary-300" />
            Our purpose
          </div>

          <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Learning that opens <span className="text-primary-300">every door.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            We democratize education through technology—bringing meaningful, high-quality learning to anyone with an internet connection, regardless of location or background.
          </p>

          <ul className="mt-8 space-y-3.5">
            {missionPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-6 text-slate-200 sm:text-base">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-400/20 text-primary-200">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-400 text-slate-950 shadow-lg shadow-primary-500/20">
              <Globe2 className="h-6 w-6" />
            </div>
            <p className="text-2xl font-bold">Everywhere</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Quality education should travel as far as ambition does.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/20">
              <Lightbulb className="h-6 w-6" />
            </div>
            <p className="text-2xl font-bold">For everyone</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">A supportive path forward for every background and goal.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

