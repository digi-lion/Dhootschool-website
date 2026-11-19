// src/components/Gallery.jsx
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LangContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ── School / Building (folder: 02) ───────────────────────────────────
import sch01 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.43 PM.jpeg";
import sch02 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.44 PM.jpeg";
import sch03 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.46 PM (1).jpeg";
import sch04 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.46 PM.jpeg";
import sch05 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.47 PM (2).jpeg";
import sch06 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.47 PM (3).jpeg";
import sch07 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.48 PM (1).jpeg";
import sch08 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.48 PM (2).jpeg";
import sch09 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.49 PM (1).jpeg";
import sch10 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.49 PM.jpeg";
import sch11 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.50 PM (2).jpeg";
import sch12 from "../assets/SchoolFolder/02-20260518T094346Z-3-001/02/WhatsApp Image 2026-05-18 at 2.13.50 PM.jpeg";

// ── Sports (folder: 04) ──────────────────────────────────────────────
import spt01 from "../assets/SchoolFolder/04-20260518T094331Z-3-001/04/WhatsApp Image 2026-05-18 at 2.13.53 PM (1).jpeg";
import spt02 from "../assets/SchoolFolder/04-20260518T094331Z-3-001/04/WhatsApp Image 2026-05-18 at 2.13.53 PM (2).jpeg";

// ── Classrooms ───────────────────────────────────────────────────────
import cls01 from "../assets/SchoolFolder/Classroom-20260518T094344Z-3-001/Classroom/WhatsApp Image 2026-05-18 at 2.13.44 PM (1).jpeg";
import cls02 from "../assets/SchoolFolder/Classroom-20260518T094344Z-3-001/Classroom/WhatsApp Image 2026-05-18 at 2.13.44 PM (2).jpeg";
import cls03 from "../assets/SchoolFolder/Classroom-20260518T094344Z-3-001/Classroom/WhatsApp Image 2026-05-18 at 2.13.45 PM (1).jpeg";
import cls04 from "../assets/SchoolFolder/Classroom-20260518T094344Z-3-001/Classroom/WhatsApp Image 2026-05-18 at 2.13.45 PM (2).jpeg";
import cls05 from "../assets/SchoolFolder/Classroom-20260518T094344Z-3-001/Classroom/WhatsApp Image 2026-05-18 at 2.13.51 PM (3).jpeg";
import cls06 from "../assets/SchoolFolder/Classroom-20260518T094344Z-3-001/Classroom/WhatsApp Image 2026-05-18 at 2.13.52 PM.jpeg";

// ── Computer Lab ─────────────────────────────────────────────────────
import cmp01 from "../assets/SchoolFolder/Computer-20260518T094328Z-3-001/Computer/WhatsApp Image 2026-05-18 at 2.13.54 PM (1).jpeg";
import cmp02 from "../assets/SchoolFolder/Computer-20260518T094328Z-3-001/Computer/WhatsApp Image 2026-05-18 at 2.13.54 PM (2).jpeg";
import cmp03 from "../assets/SchoolFolder/Computer-20260518T094328Z-3-001/Computer/WhatsApp Image 2026-05-18 at 2.13.55 PM (1).jpeg";

// ── Activities (folder: Extra) ───────────────────────────────────────
import act01 from "../assets/SchoolFolder/Extra-20260518T094328Z-3-001/Extra/WhatsApp Image 2026-05-18 at 2.13.51 PM.jpeg";
import act02 from "../assets/SchoolFolder/Extra-20260518T094328Z-3-001/Extra/WhatsApp Image 2026-05-18 at 2.13.53 PM.jpeg";

// ── Science Lab ──────────────────────────────────────────────────────
import lab01 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.56 PM (1).jpeg";
import lab02 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.56 PM.jpeg";
import lab03 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.57 PM (1).jpeg";
import lab04 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.57 PM (2).jpeg";
import lab05 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.57 PM.jpeg";
import lab06 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.58 PM (1).jpeg";
import lab07 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.58 PM (2).jpeg";
import lab08 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.58 PM (4).jpeg";
import lab09 from "../assets/SchoolFolder/Lab-20260518T094405Z-3-001/Lab/WhatsApp Image 2026-05-18 at 2.13.58 PM.jpeg";

// ── Library ──────────────────────────────────────────────────────────
import lib01 from "../assets/SchoolFolder/library-20260518T094351Z-3-001/library/WhatsApp Image 2026-05-18 at 2.13.51 PM (1).jpeg";
import lib02 from "../assets/SchoolFolder/library-20260518T094351Z-3-001/library/WhatsApp Image 2026-05-18 at 2.13.55 PM (2).jpeg";

// ── Category arrays (index matches gallery_cats order) ───────────────
const school    = [sch01, sch02, sch03, sch04, sch05, sch06, sch07, sch08, sch09, sch10, sch11, sch12];
const sports    = [spt01, spt02];
const classroom = [cls01, cls02, cls03, cls04, cls05, cls06];
const computer  = [cmp01, cmp02, cmp03];
const activities = [act01, act02];
const scienceLab = [lab01, lab02, lab03, lab04, lab05, lab06, lab07, lab08, lab09];
const library   = [lib01, lib02];

// Index 0 = All, 1 = School, 2 = Classrooms, 3 = Computer Lab,
//       4 = Science Lab, 5 = Library, 6 = Activities, 7 = Sports
const GALLERY = [
  [...school, ...classroom, ...computer, ...scienceLab, ...library, ...activities, ...sports],
  school,
  classroom,
  computer,
  scienceLab,
  library,
  activities,
  sports,
];

export default function Gallery() {
  const { t } = useLang();
  const cats = t("gallery_cats");
  const [active, setActive]   = useState(0);
  const [lightbox, setLightbox] = useState(null); // { images, idx }

  const images = GALLERY[active] || [];

  const openLightbox = (idx) => setLightbox({ images, idx });
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(lb => ({ ...lb, idx: (lb.idx - 1 + lb.images.length) % lb.images.length }));
  const next = () => setLightbox(lb => ({ ...lb, idx: (lb.idx + 1) % lb.images.length }));

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape")      closeLightbox();
      else if (e.key === "ArrowLeft")  prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-navy-800 section-heading mb-8">
          {t("gallery_title")}
        </h2>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {cats.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === i
                  ? "bg-navy-800 text-white shadow"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-saffron-50 hover:border-saffron-400"
              }`}
            >
              {cat}
              {i === 0 && (
                <span className="ml-1.5 text-xs opacity-70">({GALLERY[0].length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-saffron-400"
            >
              <img
                src={src}
                alt={`${cats[active]} ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <ChevronRight
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity rotate-0"
                  style={{ transform: "rotate(0deg)" }}
                />
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          {images.length} {t("gallery_cats")[active] !== (cats[0]) ? cats[active] + " — " : ""}{images.length === 1 ? "photo" : "photos"}
        </p>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 rounded-full p-1.5 z-10"
          >
            <X size={24} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 text-white/80 hover:text-white bg-black/40 rounded-full p-2 z-10"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image */}
          <img
            src={lightbox.images[lightbox.idx]}
            alt=""
            className="max-h-[88vh] max-w-[88vw] object-contain rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 text-white/80 hover:text-white bg-black/40 rounded-full p-2 z-10"
          >
            <ChevronRight size={32} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums">
            {lightbox.idx + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </section>
  );
}
