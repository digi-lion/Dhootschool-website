import { useLang } from "../i18n/LangContext";

export default function LinkedChain() {
  const { t } = useLang();

  const links = [
    {
      emoji: "🏛️",
      label: t("Admission") || "Admission Procedure",
      darkRed: true,
    },
    {
      emoji: "📜",
      label: t("Transfer") || "Transfer Certificate",
      darkRed: false,
    },
    {
      emoji: "📁",
      label: t("Downloads") || "Downloads",
      darkRed: false,
    },
    {
      emoji: "📚",
      label: t("Prospectus") || "School Prospectus",
      darkRed: true,
    },
    {
      emoji: "📰",
      label: t("Activity") || "Recent Activity",
      darkRed: false,
    },
  ];

  return (
    <section className="py-10 bg-gray-50 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-start justify-center flex-wrap md:flex-nowrap gap-y-10 gap-x-0">
          {links.map((link, idx) => (
            <div key={idx} className="flex items-start">
              {/* Bubble + label below */}
              <div className="flex flex-col items-center cursor-pointer group" style={{ width: "140px" }}>
                {/* Circle */}
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: link.darkRed
                      ? "radial-gradient(circle at 32% 28%, #c0392b, #7b0000 70%)"
                      : "radial-gradient(circle at 32% 28%, #f7d060, #c8850a 70%)",
                    boxShadow: link.darkRed
                      ? "0 6px 22px rgba(100,0,0,0.5), inset 0 3px 8px rgba(255,255,255,0.2), inset 0 -3px 8px rgba(0,0,0,0.35)"
                      : "0 6px 22px rgba(160,100,0,0.4), inset 0 3px 8px rgba(255,255,255,0.3), inset 0 -3px 8px rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: link.darkRed
                      ? "3px solid rgba(180,60,60,0.6)"
                      : "3px solid rgba(240,180,30,0.5)",
                    flexShrink: 0,
                    transition: "transform 0.25s",
                  }}
                  className="group-hover:scale-110"
                >
                  <span style={{ fontSize: "2.8rem", lineHeight: 1 }}>{link.emoji}</span>
                </div>

                {/* Label — always below, consistent for all */}
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "0.78rem",
                    fontWeight: "700",
                    color: link.darkRed ? "#8B0000" : "#b8790a",
                    textAlign: "center",
                    lineHeight: 1.3,
                    letterSpacing: "0.01em",
                    maxWidth: "120px",
                    textTransform: link.darkRed ? "uppercase" : "none",
                  }}
                >
                  {link.label}
                </p>
              </div>

              {/* Chain connector between bubbles */}
              {idx < links.length - 1 && (
                <div
                  className="hidden md:flex items-center self-start flex-shrink-0"
                  style={{ marginTop: "55px" }}
                >
                  <div style={{ width: "8px", height: "3px", background: "#8B0000", borderRadius: "2px", opacity: 0.45 }} />
                  <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#D4900A", border: "2px solid white", boxShadow: "0 1px 4px rgba(0,0,0,0.25)" }} />
                  <div style={{ width: "8px", height: "3px", background: "#D4900A", borderRadius: "2px", opacity: 0.45 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


