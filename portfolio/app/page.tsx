"use client";

import Image from "next/image";
import { CSSProperties, ChangeEvent, useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp, IoLogoGithub } from "react-icons/io5";
import { FaArrowPointer } from "react-icons/fa6";
import { MorphingTextDemo } from "@/components/animate-ui/primitives/texts/morphing";
import { fetchLikeCount, incrementLike } from "@/lib/firebaseClient";

type Project = {
  title: string;
  duration: string;
  frontImage: string;
  backDescription?: string;
  summary?: string;
  demoLink: string;
  githubLink: string;
  badge?: string;
};

const projects: Project[] = [
  {
    title: "GodakPin.lk",
    duration: "2 weeks",
    frontImage: "/godakpin.png",
    backDescription:
      "GodakPin.lk is a full-stack free item sharing platform built for Sri Lanka with Next.js, Express, and MongoDB. It enables users to post items, browse listings, and chat in real time through a fast, scalable, Docker-powered architecture. Custom Express APIs surface validated postings while MongoDB handles flexible, location-based queries; the containerised deployment keeps the service durable even under spikes in activity.",
    demoLink: "https://godakpin.dhanuka.dev",
    githubLink: "https://github.com/Dhanuka001/godak-pin.git",
  },
  {
    title: "SpaceX Launch Explorer",
    duration: "< 1 week",
    frontImage: "/spacex.png",
    backDescription:
      "A fast and responsive SpaceX launch explorer built in under one week using pure React and the SpaceX public API. Features include mission search, filters, favorites, client-side caching, request aborting, and reusable custom hooks optimized for performance.",
    demoLink: "https://space-x-launches-dhanuka.vercel.app/",
    githubLink: "https://github.com/Dhanuka001/SpaceX-Launches-Dhanuka.git",
  },
  {
    title: "PhoneBazzar eCommerce Store",
    duration: "2 months",
    frontImage: "/phonebazzar-2.png",
    backDescription:
      "PhoneBazzar is a full-stack eCommerce platform for mobile phones and gadgets with secure checkout, inventory tracking, order management, and a powerful admin panel. Includes user suspension tools, revenue dashboards, product analytics, and complete store automation from end to end.",
    demoLink: "https://cornelectronics.com",
    githubLink: "https://github.com/Dhanuka001/corn-ecommerce.git",
    badge: "ongoing client project",
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

const ProjectShowcase = ({ items }: { items: Project[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = items[activeIndex];
  const description =
    activeProject.backDescription ??
    activeProject.summary ??
    "Designed UI kits, orchestrated integrations, and shipped polished demos for product stakeholders.";

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveIndex(Number(event.target.value));
  };

  return (
    <div className="mt-20 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div className="hidden flex-col gap-4 lg:flex">
        {items.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative flex flex-col items-end justify-end border px-4 pb-4 text-left transition-all aspect-[4/3] overflow-hidden ${
              index === activeIndex
                ? "border-slate-900 shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
                : "border-slate-200 hover:border-slate-900/40"
            }`}
            style={{
              backgroundImage: `url("${project.frontImage ?? "/file.svg"}")`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <span className="relative z-10 rounded-sm bg-white/90 px-2 py-1 text-sm font-semibold text-slate-900 shadow-[0_0_0_1px_rgba(15,23,42,0.1)]">
              {project.title}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 lg:hidden">
        <label className="text-sm font-semibold text-slate-500">Select project</label>
        <select
          value={activeIndex}
          onChange={handleSelectChange}
          className="rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
        >
          {items.map((project, index) => (
            <option key={project.title} value={index}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
      <article className="flex flex-col overflow-hidden border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="relative w-full" style={{ paddingTop: "75%" }}>
          <Image
            src={activeProject.frontImage ?? "/file.svg"}
            alt={`${activeProject.title} preview`}
            fill
            className="absolute inset-0 object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-6 px-4 py-6 lg:px-6 lg:py-7">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 lg:text-4xl">{activeProject.title}</h3>
              {activeProject.badge && (
                <p className="mt-1 text-xs font-semibold text-slate-500">{activeProject.badge}</p>
              )}
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Duration: {activeProject.duration ?? "6 weeks"}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={activeProject.demoLink ?? "#demo"}
                className="flex w-32 items-center justify-center gap-2 border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white hover:text-black hover:border-slate-900"
              >
                <FaArrowPointer className="text-base" />
                demo
              </a>
              <a
                href={activeProject.githubLink ?? "https://github.com/Dhanuka001"}
                target="_blank"
                rel="noreferrer"
                className="flex w-32 items-center justify-center gap-2 border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white hover:text-black hover:border-slate-900"
              >
                <IoLogoGithub className="text-base" />
                github
              </a>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        </div>
      </article>
    </div>
  );
};

const likedFlagKey = "portfolio-like-liked";
const delayStyle = (value: string): CSSProperties => ({ "--delay": value } as CSSProperties);

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [allowReveal, setAllowReveal] = useState(false);
  const [likeCount, setLikeCount] = useState(21);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setScrollProgress(progress);
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
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

    const frame = requestAnimationFrame(async () => {
      try {
        const count = await fetchLikeCount(21);
        setLikeCount(count);
      } catch {
        setLikeCount(21);
      }
      const storedFlag = localStorage.getItem(likedFlagKey);
      if (storedFlag === "true") {
        setHasLiked(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleLike = async () => {
    if (hasLiked) {
      return;
    }

    setLikeAnimating(true);
    const newCount = await incrementLike();
    setLikeCount(newCount || (likeCount + 1));
    setHasLiked(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(likedFlagKey, "true");
    }
    setTimeout(() => setLikeAnimating(false), 300);
  };

  return (
    <main className="relative min-h-screen bg-white text-black">
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
                  <p className="text-sm text-black/50">Madampe, Sri Lanka</p>
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
            <p className="text-base text-black/70 text-justify md:text-left">
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
          <ProjectShowcase items={projects} />
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
      <div className="scroll-progress-wrapper" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
    </main>
  );
}
