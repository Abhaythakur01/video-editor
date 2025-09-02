import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award } from "lucide-react";

import { DEMO_PROJECTS } from "./portfolioData";  // ✅ new import

// --------------------- Types ---------------------

type Category = "all" | "commercial" | "concept" | "music" | "brand";

export type VideoProject = {
  id: number;
  title: string;
  category: Exclude<Category, "all">;
  year: string;
  client: string;
  src: string;
  description: string;
  awards?: string[];
  captureAtSeconds?: number;
};

// --------------------- Utilities ---------------------

function useVideoThumbnail(src: string, captureAtSeconds?: number) {
  const [thumb, setThumb] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let video: HTMLVideoElement | null = null;

    async function generate() {
      try {
        setLoading(true);
        setError(null);
        setThumb(null);

        video = document.createElement("video");
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = "anonymous";
        video.src = src;

        await new Promise<void>((resolve, reject) => {
          if (!video) return reject(new Error("No video"));
          const onMeta = () => resolve();
          const onErr = () => reject(new Error("Failed to load metadata"));
          video.addEventListener("loadedmetadata", onMeta, { once: true });
          video.addEventListener("error", onErr, { once: true });
        });

        if (!video || cancelled) return;

        const targetTime =
          typeof captureAtSeconds === "number" && captureAtSeconds >= 0
            ? Math.min(captureAtSeconds, Math.max(0, video.duration - 0.1))
            : Math.min(Math.max(0, video.duration * 0.25), Math.max(0, video.duration - 0.1));

        await new Promise<void>((resolve, reject) => {
          if (!video) return reject(new Error("No video"));
          const onSeeked = () => resolve();
          const onErr = () => reject(new Error("Failed to seek"));
          video!.currentTime = targetTime || 0;
          video!.addEventListener("seeked", onSeeked, { once: true });
          video!.addEventListener("error", onErr, { once: true });
        });

        if (!video || cancelled) return;

        const canvas = document.createElement("canvas");
        const w = video.videoWidth || 1280;
        const h = video.videoHeight || 720;
        const targetW = 1280;
        const scale = Math.min(1, targetW / w);
        canvas.width = Math.floor(w * scale);
        canvas.height = Math.floor(h * scale);

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D context unavailable");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

        if (!cancelled) setThumb(dataUrl);
      } catch (e: unknown) {
        if (!cancelled) setError((e instanceof Error && e.message) ? e.message : "Thumbnail generation failed");
      } finally {
        if (!cancelled) setLoading(false);
        if (video) {
          video.src = "";
          video.load();
          video = null;
        }
      }
    }

    if (typeof window !== "undefined") generate();

    return () => {
      cancelled = true;
      if (video) {
        video.src = "";
        video.load();
        video = null;
      }
    };
  }, [src, captureAtSeconds]);

  return { thumb, isLoading, error } as const;
}

// --------------------- Card ---------------------

type VideoCardProps = {
  project: VideoProject;
  onOpen: (project: VideoProject) => void;
  index: number;
};

const VideoCard: React.FC<VideoCardProps> = ({ project, onOpen }) => {
  const { thumb, isLoading } = useVideoThumbnail(project.src, project.captureAtSeconds);

  return (
    <motion.div
      className="group flex flex-col bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-400/50 shadow-lg hover:shadow-yellow-400/20 transition-all duration-500 backdrop-blur-lg"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full animate-pulse bg-slate-800" />
        ) : (
          <img
            src={thumb || ""}
            alt={`${project.title} thumbnail`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            draggable={false}
          />
        )}
        <button
          onClick={() => onOpen(project)}
          className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-400/80 to-green-400/80 text-black font-medium text-sm hover:from-yellow-400 hover:to-green-400 transition-all shadow-md"
        >
          ▶ Play
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 font-[Montserrat] font-bold">
        <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
        <p className="text-sm text-slate-400">{project.client}</p>
        <p className="text-sm text-slate-500 line-clamp-2">{project.description}</p>
        {!!project.awards?.length && (
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Award size={14} className="text-yellow-400" />
            <span>{project.awards[0]}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --------------------- Modal Player ---------------------

type PlayerModalProps = {
  open: boolean;
  project: VideoProject | null;
  onClose: () => void;
};

const PlayerModal: React.FC<PlayerModalProps> = ({ open, project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [maxH, setMaxH] = useState<string>("100dvh");

  useEffect(() => {
    if (!open) return;
    const update = () => setMaxH(`${window.innerHeight}px`);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      document.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = original;
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [open, project?.src]);

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    const travel = Math.abs(info.offset.y);
    const speed = Math.abs(info.velocity.y);
    if (travel > 120 || speed > 800) onClose();
  };

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[100] font-[Montserrat] font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4 md:p-6"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="mx-auto w-full max-w-5xl rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/40"
              style={{ maxHeight: maxH }}
            >
              <div className="grid grid-rows-[minmax(0,1fr)_auto] bg-slate-950">
                <div className="relative bg-black flex items-center justify-center min-h-0">
                  <video
                    ref={videoRef}
                    src={project.src}
                    className="block max-w-full max-h-full w-auto h-auto object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback"
                  />
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md p-2 text-white hover:bg-white/20 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-slate-950/80 px-5 py-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-white font-bold tracking-tight">{project.title}</div>
                    <div className="text-slate-400 text-sm">{project.client} • {project.year}</div>
                  </div>
                  {!!project.awards?.length && (
                    <div className="hidden md:flex items-center gap-2 text-slate-200 text-sm">
                      <Award size={16} className="text-yellow-400" />
                      <span>{project.awards[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --------------------- Main Grid ---------------------

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "commercial", label: "Commercials" },
  { id: "concept", label: "Concept Films" },
  { id: "music", label: "Music Videos" },
  { id: "brand", label: "Brand Stories" },
];

export default function PortfolioVideoGrid({ projects = DEMO_PROJECTS }: { projects?: VideoProject[] }) {
  const [filter, setFilter] = useState<Category>("all");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<VideoProject | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  const openPlayer = (p: VideoProject) => {
    setActive(p);
    setOpen(true);
  };
  const closePlayer = () => {
    setOpen(false);
    setTimeout(() => setActive(null), 250);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden font-[Montserrat] font-bold">
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-1/3 left-1/4 w-60 h-60 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">PORT</span>
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent">FOLIO</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Each project is a carefully crafted visual narrative, designed to captivate and inspire.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all backdrop-blur-lg border ${
                filter === c.id
                  ? "bg-gradient-to-r from-yellow-400 to-green-400 text-white border-transparent shadow-lg shadow-yellow-400/20 scale-105"
                  : "bg-slate-800/40 border-white/10 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-105"
              }`}
              style={{ transitionDuration: "600ms" }}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, idx) => (
            <VideoCard key={p.id} project={p} onOpen={openPlayer} index={idx} />
          ))}
        </div>
      </div>

      <PlayerModal open={open} project={active} onClose={closePlayer} />
    </section>
  );
}
