"use client";

import { Switch } from "@headlessui/react";
import {
    ArrowUpRightIcon,
    GlobeAltIcon,
    MapPinIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const highlights = [
  {
    title: "Global stays",
    description: "Curated homes and co-working hubs in 80+ cities.",
    icon: GlobeAltIcon,
  },
  {
    title: "Local crews",
    description: "Weekly meetups so you land with a community.",
    icon: MapPinIcon,
  },
  {
    title: "Concierge",
    description: "Visas, logistics, and on-trip support built in.",
    icon: SparklesIcon,
  },
];

export default function Home() {
  const [remoteFirst, setRemoteFirst] = useState(true);

  return (
    <div className="min-h-screen bg-base-200">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:py-16">
        <section className="hero rounded-3xl bg-base-100 shadow-xl">
          <div className="hero-content flex-col items-start gap-10 lg:flex-row">
            <div className="space-y-6">
              <div className="badge badge-outline badge-primary">Go Nomads</div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Build your next chapter anywhere.
              </h1>
              <p className="max-w-2xl text-lg text-base-content/80">
                Plan, book, and host location-flexible experiences with a toolkit
                built for modern teams and digital nomads.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="btn btn-primary">Start planning</button>
                <button className="btn btn-outline">Talk to our crew</button>
                <div className="inline-flex items-center gap-3 rounded-full bg-base-200 px-3 py-2 text-sm">
                  <Switch
                    checked={remoteFirst}
                    onChange={setRemoteFirst}
                    className={`${
                      remoteFirst ? "bg-primary" : "bg-base-300"
                    } relative inline-flex h-7 w-14 items-center rounded-full transition`}
                  >
                    <span className="sr-only">Toggle travel style</span>
                    <span
                      className={`${
                        remoteFirst ? "translate-x-7" : "translate-x-1"
                      } inline-block h-5 w-5 transform rounded-full bg-base-100 shadow transition`}
                    />
                  </Switch>
                  <span className="text-sm font-medium text-base-content/80">
                    {remoteFirst ? "Remote-first" : "Retreat mode"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {highlights.map(({ title, description, icon: Icon }) => (
                  <div key={title} className="card bg-base-200 shadow-sm">
                    <div className="card-body gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="card-title text-lg">{title}</h3>
                      <p className="text-sm text-base-content/70">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card w-full max-w-sm shrink-0 bg-base-200 shadow-lg">
              <div className="card-body gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-base-content/70">Featured trip</p>
                    <p className="text-xl font-semibold">Kyoto → Seoul</p>
                  </div>
                  <div className="badge badge-primary badge-outline">10 seats</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl bg-base-100 px-4 py-3">
                    <div>
                      <p className="font-semibold">Coworking villa</p>
                      <p className="text-base-content/70">Fiber + studio desks</p>
                    </div>
                    <ArrowUpRightIcon className="h-5 w-5 text-base-content/60" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-base-100 px-4 py-3">
                    <div>
                      <p className="font-semibold">Nomad circles</p>
                      <p className="text-base-content/70">Curated founders & makers</p>
                    </div>
                    <ArrowUpRightIcon className="h-5 w-5 text-base-content/60" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-base-100 px-4 py-3">
                    <div>
                      <p className="font-semibold">Field days</p>
                      <p className="text-base-content/70">Kyoto trails + Seoul markets</p>
                    </div>
                    <ArrowUpRightIcon className="h-5 w-5 text-base-content/60" />
                  </div>
                </div>
                <button className="btn btn-primary btn-block">Reserve a spot</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
