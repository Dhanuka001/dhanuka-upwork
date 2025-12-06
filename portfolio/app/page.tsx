"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp, IoLogoGithub } from "react-icons/io5";
import { MorphingTextDemo } from "@/components/animate-ui/primitives/texts/morphing";

const projects = [
  {
    title: "Aurora Docs",
    role: "Design System + Docs",
    summary:
      "A modern documentation engine with live examples, searchable content, and a responsive UI toolkit built for product launches.",
    tech: ["Next.js", "Tailwind CSS", "MDX"],
  },
  {
    title: "Pulse Metrics",
    role: "Dashboard App",
    summary:
      "Data visualisation hub that combines telemetry feeds, anomaly alerts, and shareable reports for enterprise teams.",
    tech: ["React 19", "Supabase", "Zustand"],
  },
  {
    title: "Lumen Studio",
    role: "Custom CMS",
    summary:
      "Content editing workspace that lets marketing designers assemble hero layouts, schedule launches, and preview multi-device mocks.",
    tech: ["TypeScript", "Node.js", "Vercel"],
  },
];

const techIcons = [
  { src: "/icons/icons8-nextjs-96.png", label: "Next.js" },
  { src: "/icons/icons8-tailwind-css-96.png", label: "Tailwind CSS" },
  { src: "/icons/icons8-typescript-100.png", label: "TypeScript" },
  { src: "/icons/icons8-react-js-100.png", label: "React.js" },
  { src: "/icons/icons8-express-js-100.png", label: "Express.js" },
  { src: "/icons/icons8-docker-100.png", label: "Docker" },
  { src: "/icons/icons8-javascript-100.png", label: "JavaScript" },
  { src: "/icons/icons8-postgresql-100.png", label: "PostgreSQL" },
  { src: "/icons/icons8-sql-100.png", label: "SQL" },
  { src: "/icons/icons8-db-100.png", label: "MongoDB" },
];

const storageKey = "portfolio-like-count";
const delayStyle = (value: string): CSSProperties => ({ "--delay": value } as CSSProperties);

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [allowReveal, setAllowReveal] = useState(false);
  const [likeCount, setLikeCount] = useState(21);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showIntro) {
      return;
    }

    const timer = setTimeout(() => setAllowReveal(true), 100);
    return () => clearTimeout(timer);
  }, [showIntro]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const stored = localStorage.getItem(storageKey);
      if (!stored || stored === "142") {
        localStorage.setItem(storageKey, "21");
        setLikeCount(21);
      } else {
        setLikeCount(Number(stored));
      }
      const likedFlag = localStorage.getItem(`${storageKey}-liked`);
      if (likedFlag === "true") {
        setHasLiked(true);
      } else {
        localStorage.setItem(`${storageKey}-liked`, "false");
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleLike = () => {
    if (hasLiked) {
      return;
    }

    setLikeAnimating(true);
    setLikeCount((prev) => {
      const next = prev + 1;
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, next.toString());
      }
      return next;
    });
    setHasLiked(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(`${storageKey}-liked`, "true");
    }
    setTimeout(() => setLikeAnimating(false), 300);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {showIntro && (
        <div className="loading-overlay">
          <MorphingTextDemo loop holdDelay={1500} className="loading-text text-[clamp(96px,12vw,220px)] font-black" />
        </div>
      )}
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-8 py-12 sm:px-12 lg:px-28">
        <section
          className="pb-4 reveal-on-load"
          style={delayStyle("0.05s")}
          data-visible={allowReveal}
        >
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="relative flex h-24 w-24 justify-center">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-xl overflow-hidden bg-black/5">
                    <Image
                      src="/dhanuka.jpg"
                      alt="Dhanuka portrait"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 160px, 256px"
                    />
                  </div>
                  <span className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-green-400 border border-black/60" />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl font-semibold tracking-tight text-black">Dhanuka R</h1>
                  <p className="text-lg font-medium text-black/70">Full Stack Developer</p>
                  <p className="text-sm text-black/50">Colombo, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:px-8">
                <button
                  type="button"
                  className={`like-pill rounded-full px-3 py-1 text-xs font-semibold transition ${
                    hasLiked ? "liked" : ""
                  } ${likeAnimating ? "animate" : ""}`}
                  onClick={handleLike}
                >
                  {hasLiked ? (
                    <IoHeartSharp className="like-icon liked-icon" />
                  ) : (
                    <IoHeartOutline className="like-icon" />
                  )}
                  <span className="ml-1">{likeCount}</span>
                </button>
                <span className="text-xs font-medium text-black/60">people like my portfolio</span>
              </div>
            </div>
            <p className="text-base text-black/70 text-left">
              As a full stack developer, I design functional, user-friendly interfaces while also shaping the data and APIs that
              keep them running. I focus on simplifying complex tasks with clear, effective design to deliver seamless experiences.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#resume"
                className="inline-flex items-center gap-3 rounded-lg border border-black/70 bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900 hover:border-neutral-900 hover:shadow-[0_0_15px_rgba(0,0,0,0.4)]"
              >
                <span className="relative h-5 w-5">
                  <Image src="/icons/icons8-resume-96.png" alt="Resume" fill className="object-contain" sizes="20px" />
                </span>
                Resume
              </a>
              <a
                href="https://github.com/Dhanuka001"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center transition hover:text-black/60"
              >
                <span className="relative h-10 w-10">
                  <Image src="/icons/github.png" alt="GitHub" fill className="object-contain" sizes="24px" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section
          className="mt-4 reveal-on-load"
          style={delayStyle("0.15s")}
          data-visible={allowReveal}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Current tech stack</h2>
          </div>
          <div className="mt-20 grid grid-cols-2 gap-6 text-center text-sm text-black/60 sm:grid-cols-5">
            {techIcons.map((tech) => (
              <div key={tech.label} className="flex flex-col items-center gap-2">
                <div className="relative h-12 w-12">
                  <Image src={tech.src} alt={tech.label} fill className="object-contain" sizes="60px" />
                </div>
                <span className="text-xs">{tech.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="reveal-on-load"
          style={delayStyle("0.25s")}
          data-visible={allowReveal}
        >
          <div className="flex mt-8 items-center justify-between">
            <div>
              <p className="text-sm mb-4 text-black/50">Recent projects</p>
              <h2 className="text-3xl font-semibold">What I shipped recently</h2>
            </div>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="flip-card relative rounded-xl group aspect-square project-card bg-black/5 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
              >
                <div className="flip-card-inner  relative h-full w-full">
                  <div className="flip-card-face flip-card-front">
                    <div className="flex h-full flex-col justify-between  bg-white p-5 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-black/60">
                          {project.role}
                        </p>
                        <h3 className="text-2xl font-semibold text-black">{project.title}</h3>
                        <p className="text-sm text-black/60">{project.summary}</p>
                      </div>
                        <p className="text-[0.65rem] font-semibold text-black/40">
                          {project.tech.join(" • ")}
                        </p>
                        <div className="front-mobile-actions md:hidden">
                          <a
                            href="#demo"
                            className="icon-pill flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-md"
                          >
                            ↗
                          </a>
                          <a
                            href="https://github.com/Dhanuka001"
                            target="_blank"
                            rel="noreferrer"
                            className="icon-pill flex h-9 w-9 items-center justify-center rounded-full border border-black/20"
                          >
                            <IoLogoGithub className="text-lg" />
                          </a>
                        </div>
                    </div>
                  </div>
                  <div className="flip-card-face flip-card-back">
                    <div className="flex h-full flex-col justify-between bg-black p-5 text-white shadow-[0_25px_80px_rgba(0,0,0,0.3)]">
                      <div>
                        <p className="text-xs font-medium text-white/70">Details</p>
                        <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
                        <p className="mt-3 text-sm text-white/70">
                          Designed UI kits, orchestrated integrations, and shipped polished demos for product stakeholders.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center justify-between text-white/70">
                          <span>Role</span>
                          <span>{project.role}</span>
                        </div>
                        <div className="flex items-center justify-between text-white/70">
                          <span>Duration</span>
                          <span>6 weeks</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <a
                            href="#demo"
                            className="mt-2 inline-flex w-full items-center justify-center border border-white/60 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white hover:text-black"
                          >
                            View demo
                          </a>
                          <a
                            href="https://github.com/Dhanuka001"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex h-10 w-14 items-center justify-center rounded-full border border-white/60 transition hover:border-white hover:bg-white hover:text-black"
                          >
                            <IoLogoGithub />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href="#demo"
                  className="project-card-cta"
                  aria-label={`View demo for ${project.title}`}
                >
                  View demo <span aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section
          className="reveal-on-load"
          style={delayStyle("0.35s")}
          data-visible={allowReveal}
        >
          <div className="grid gap-8 border border-black/10 p-8">
            <h2 className="text-2xl font-semibold">How I partner as a full stack engineer</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="space-y-2">
                <p className="text-md text-black">Architecture Sprint</p>
                <p className="text-sm text-black/60">
                  Align on API contracts, data models, and UX flows with product + backend before any code gets written so the
                  team moves fast without rework.
                </p>
              </article>
              <article className="space-y-2">
                <p className="text-md text-black">Build & Monitor</p>
                <p className="text-sm text-black/60">
                  I ship end-to-end slices that include UI, services, and observability—every rollout ships with pairing notes and
                  telemetry hooks.
                </p>
              </article>
              <article className="space-y-2">
                <p className="text-md text-black">Operate & Iterate</p>
                <p className="text-sm text-black/60">
                  After launch, we measure adoption, unblock releases, and prioritize the next iteration while keeping docs and
                  stakeholders in sync.
                </p>
              </article>
            </div>
          </div>
        </section>

        <footer
          className="mt-12 border-t border-black/10 pt-8 text-center text-sm text-black/60 reveal-on-load"
          style={delayStyle("0.45s")}
          data-visible={allowReveal}
        >
          © {new Date().getFullYear()} Dhanuka R — handcrafted web experiences, built with clarity and discipline.
        </footer>
      </div>
    </main>
  );
}
