import { BookOpen, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function OurStory() {
  return (
    <section className="mb-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-primary-100 sm:-left-6 sm:-top-6" />
          <div className="relative h-72 overflow-hidden rounded-3xl shadow-lg sm:h-96">
            <Image
              fill
              src="/assets/team.jpg"
              alt="Swift Learn team collaborating together"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-68">
              <p className="text-2xl font-bold">Since 2020</p>
              <p className="mt-1 text-sm text-slate-100">Built around a belief that learning belongs to everyone.</p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">
            <BookOpen className="h-4 w-4" />
            How it started
          </div>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            From a small idea to a <span className="text-primary-600">global classroom.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Founded in 2020, Swift Learn began as a small project to help local students find better learning resources. Today, our courses help thousands of learners build skills and move forward with confidence.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            We design every learning experience to be engaging, accessible, and shaped around the way real people learn.
          </p>

          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50/60 p-4 text-sm leading-6 text-slate-700">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>Thoughtfully made learning that inspires people to grow, wherever they begin.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
