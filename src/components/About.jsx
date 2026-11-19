// src/components/About.jsx
import { useState, useEffect, useRef } from "react";
import { useLang } from "../i18n/LangContext";
import schoolLogo   from "../assets/Logo/School_Logo.jpeg";
import amitShah1    from "../assets/Awad/AmitShah1.jpg";
import amitShah2    from "../assets/Awad/AmitShah2.jpg";
import awardVideo   from "../assets/Awad/VID-20260515-WA0038.mp4";

const SLIDES = [
  { type: "image", src: amitShah1, alt: "Award ceremony – photo 1" },
  { type: "image", src: amitShah2, alt: "Award ceremony – photo 2" },
  { type: "video", src: awardVideo },
];

const SLIDE_DURATION = 8000;  // each slide stays 8 s
const FADE_DURATION  = 2000;  // cross-fade takes 2 s

export default function About() {
  const { t } = useLang();
  const videoRef = useRef(null);
  const [slideIdx, setSlideIdx] = useState(0);

  /* ── auto-advance ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  /* ── play / pause video when its slide is active ── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (slideIdx === 2) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [slideIdx]);

  const infoRows = [
    ["info_name",     t("school_name")],
    ["info_address",  t("info_address_val")],
    ["info_taluka",   t("info_taluka_val")],
    ["info_jilha",    t("info_jilha_val")],
    ["info_type",     t("info_type_val")],
    ["info_board",    t("school_board")],
    ["info_medium",   t("school_medium")],
    ["info_classes",  t("school_classes")],
    ["info_est",      t("info_est_val")],
    ["info_students", t("info_students_val")],
  ];

  return (
    <section id="about" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-navy-800 section-heading mb-10">
          {t("about_title")}
        </h2>

        {/* ── Two-column ── */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left */}
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">{t("about_p1")}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{t("about_p2")}</p>
            <div className="space-y-4">
              <div className="bg-saffron-50 border-l-4 border-saffron-500 p-4 rounded-r">
                <h3 className="font-bold text-navy-800 text-base mb-1">🌟 {t("vision_title")}</h3>
                <p className="text-gray-700 text-sm">{t("vision_text")}</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-navy-700 p-4 rounded-r">
                <h3 className="font-bold text-navy-800 text-base mb-1">🎯 {t("mission_title")}</h3>
                <p className="text-gray-700 text-sm">{t("mission_text")}</p>
              </div>
            </div>
          </div>

          {/* Right: info table */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-saffron-400 shadow-md bg-white">
                <img src={schoolLogo} alt="School Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-navy-800 mb-3 border-b-2 border-saffron-500 pb-1">
              {t("info_title")}
            </h3>
            <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
              <tbody>
                {infoRows.map(([labelKey, val], i) => (
                  <tr key={labelKey} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-3 py-2 font-semibold text-navy-800 w-2/5 border-b border-gray-100">
                      {t(labelKey)}
                    </td>
                    <td className="px-3 py-2 text-gray-700 border-b border-gray-100">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── National Pride Card ── */}
        <div className="mt-12 relative overflow-hidden rounded-2xl shadow-2xl">

          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#1b2a3b] to-[#0d1b2a]" />
          <div className="absolute -top-10 -left-10 w-56 h-56 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <div className="relative flex flex-col-reverse md:flex-row min-h-64">

            {/* Left: text content */}
            <div className="flex-1 p-7 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-[#0d1b2a] text-xs font-extrabold px-4 py-1.5 rounded-full w-fit mb-5 shadow-lg tracking-wide uppercase">
                🏆 {t("achievement_highlight_title")}
              </div>

              <p className="text-gray-100 text-sm md:text-base leading-relaxed mb-7">
                {t("achievement_highlight_text")}
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2.5 bg-amber-500/15 border border-amber-400/30 rounded-xl px-4 py-2.5">
                  <span className="text-2xl">🥇</span>
                  <div>
                    <p className="text-amber-300 text-xs font-bold uppercase tracking-wider">Best Woman Entrepreneur</p>
                    <p className="text-gray-400 text-xs mt-0.5">Honoured by Hon. Home Minister of India</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                  <span className="text-2xl">👩‍🎓</span>
                  <div>
                    <p className="text-white text-xs font-bold">Bhagyashree Supekar</p>
                    <p className="text-gray-400 text-xs mt-0.5">Our Proud Alumna</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: slideshow container */}
            <div className="relative md:w-72 lg:w-80 flex-shrink-0 h-64 md:h-auto overflow-hidden">

              {SLIDES.map((slide, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: i === slideIdx ? 1 : 0,
                    transition: `opacity ${FADE_DURATION}ms ease-in-out`,
                    zIndex: i === slideIdx ? 2 : 1,
                  }}
                >
                  {slide.type === "image" ? (
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={slide.src}
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}

              {/* Blend gradient – fades into card background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 3 }}
              >
                {/* mobile: bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#0d1b2a]/20 to-transparent md:hidden" />
                {/* desktop: left fade */}
                <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#0d1b2a] via-[#0d1b2a]/30 to-transparent" />
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" style={{ zIndex: 4 }}>
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width:  i === slideIdx ? "20px" : "6px",
                      height: "6px",
                      background: i === slideIdx ? "#f59e0b" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

      </div>
    </section>
  );
}
