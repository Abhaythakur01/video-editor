import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X, Award } from "lucide-react";

/**
 * PortfolioVideoGrid — Mobile-Safe Modal Player
 * -------------------------------------------------------------
 * Key upgrades in this version:
 * 1) TRUE responsive video in the modal that auto-scales to BOTH width & height.
 *    - The player container is capped by the *real* viewport height (via JS + 100dvh fallback).
 *    - The <video> uses object-contain + max-w/max-h so it never overflows.
 *    - Layout is a 2-row grid: [video | meta], where the video row flex-shrinks first to keep
 *      the whole sheet in view on tiny screens.
 * 2) Drag-to-close (swipe down) on touch devices, click backdrop, or ESC to dismiss.
 * 3) Body scroll lock while open.
 *
 * Drop-in: replace your current file with this one.
 */

// --------------------- Types ---------------------

type Category = "all" | "commercial" | "concept" | "music" | "brand";

export type VideoProject = {
  id: number;
  title: string;
  category: Exclude<Category, "all">;
  year: string;
  client: string;
  src: string; // e.g., "/assets/videos/luxury-watch.mp4"
  description: string; // keep this short
  awards?: string[];
  // optional: capture frame at N seconds; if omitted, it auto-picks ~25% of the duration
  captureAtSeconds?: number;
};

// --------------------- Demo Data (replace with yours) ---------------------

const DEMO_PROJECTS: VideoProject[] = [
  {
    id: 1,
    title: "Luxury Watch Campaign",
    category: "commercial",
    year: "2024",
    client: "Premium Timepieces",
    src: "/assets/videos/luxury-watch.mp4",
    description: "Precision and elegance wrapped in 30 seconds.",
    awards: ["Best Commercial Edit 2024"],
    captureAtSeconds: 1.5,
  },
  {
    id: 2,
    title: "Urban Dreams",
    category: "concept",
    year: "2024",
    client: "Independent Film",
    src: "/assets/videos/urban-dreams.mp4",
    description: "A surreal drift between Mumbai's nights and neon.",
  },
  {
    id: 3,
    title: "Tech Startup Launch",
    category: "brand",
    year: "2023",
    client: "InnovateX",
    src: "/assets/videos/innovatex-launch.mp4",
    description: "Momentum, energy, and a bold new brand story.",
    awards: ["Silver Lion Cannes 2024"],
    captureAtSeconds: 0.8,
  },
  {
    id: 4,
    title: "Monsoon Melody",
    category: "music",
    year: "2023",
    client: "Indie Artist",
    src: "/assets/videos/monsoon-melody.mp4",
    description: "Heart-on-sleeve visuals in the pouring rain.",
  },
  {
    id: 5,
    title: "Fashion Forward",
    category: "commercial",
    year: "2023",
    client: "Haute Couture Brand",
    src: "/assets/videos/fashion-forward.mp4",
    description: "Avant-garde silhouettes with razor-sharp edits.",
  },
  {
    id: 6,
    title: "Silent Conversations",
    category: "concept",
    year: "2023",
    client: "Art House Production",
    src: "/assets/hero-video.mp4",
    description: "Two strangers, one city, a thousand glances.",
  },
];

// --------------------- Utilities ---------------------

/**
 * useVideoThumbnail
 * Creates a hidden <video> off-DOM, seeks to a target time, draws a frame to a canvas,
 * and returns a dataURL thumbnail. Cleans up listeners and elements.
 */
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
        video.muted = true; // prevents any autoplay restrictions from complaining
        video.playsInline = true;
        video.crossOrigin = "anonymous"; // safe for same-origin local assets
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
        const targetW = 1280; // adjust as needed
        const scale = Math.min(1, targetW / w);
        canvas.width = Math.floor(w * scale);
        canvas.height = Math.floor(h * scale);

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D context unavailable");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

        if (!cancelled) setThumb(dataUrl);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Thumbnail generation failed");
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

const VideoCard: React.FC<VideoCardProps> = ({ project, onOpen, index }) => {
  const { thumb, isLoading } = useVideoThumbnail(project.src, project.captureAtSeconds);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-lg border border-white/10 hover:shadow-2xl hover:shadow-yellow-400/20"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full animate-pulse bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        ) : (
          <img
            src={thumb || ""}
            alt={`${project.title} thumbnail`}
            className="w-full h-full object-cover transform transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:brightness-110"
            draggable={false}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 active:scale-95 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlayCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Play</span>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-green-400 group-hover:to-yellow-500 group-hover:bg-clip-text transition-all duration-500">
            {project.title}
          </h3>
          <span className="text-sm text-white/80 bg-slate-800/40 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
            {project.year}
          </span>
        </div>
        <p className="text-slate-300 mb-2">{project.client}</p>
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{project.description}</p>
        {!!project.awards?.length && (
          <div className="flex items-center gap-2 text-slate-200 text-sm">
            <Award size={16} className="text-yellow-400" />
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

  // Track the *real* viewport height for ultra-reliable mobile sizing.
  const [maxH, setMaxH] = useState<string>("100dvh"); // fallback
  useEffect(() => {
    if (!open) return;
    const update = () => {
      // window.innerHeight gives the pixel-accurate viewport height with mobile UI considered
      setMaxH(`${window.innerHeight}px`);
    };
    update();
    window.addEventListener("resize", update);
    // some browsers fire orientationchange instead
    const onOrientation = () => update();
    window.addEventListener("orientationchange", onOrientation);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", onOrientation);
    };
  }, [open]);

  // Lock the body scroll & handle ESC
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = original;
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  // Autoplay on open (user gesture already happened)
  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        /* ignore autoplay errors */
      });
    }
  }, [open, project?.src]);

  // Swipe/drag-to-close thresholds
  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    const travel = Math.abs(info.offset.y);
    const speed = Math.abs(info.velocity.y);
    if (travel > 120 || speed > 800) onClose();
  };

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Dim + BLUR BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Player sheet (centered) */}
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
              style={{
                // Double safety: CSS class caps at 100dvh; inline style uses real innerHeight
                maxHeight: maxH,
              }}
            >
              {/* Grid: video (1fr) + meta (auto). Video shrinks first to keep all visible. */}
              <div className="grid grid-rows-[minmax(0,1fr)_auto] bg-slate-950">
                {/* Video area */}
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

                  {/* Close */}
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md p-2 text-white hover:bg-white/20 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Meta */}
                <div className="bg-slate-950/80 px-5 py-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-white font-semibold tracking-tight">{project.title}</div>
                    <div className="text-slate-400 text-sm">{project.client} • {project.year}</div>
                  </div>
                  {!!project.awards?.length && (
                    <div className="hidden md:flex items-center gap-2 text-slate-2 00 text-sm">
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
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Subtle glowing orbs */}
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
          {CATEGORIES.map((c, i) => (
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

      {/* Modal */}
      <PlayerModal open={open} project={active} onClose={closePlayer} />
    </section>
  );
}