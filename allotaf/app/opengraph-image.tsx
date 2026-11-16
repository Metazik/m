import { ImageResponse } from "next/og";

export const alt = "AlloTaf — L’intelligence artificielle au service de votre entreprise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a0a0b", color: "#fff", padding: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 30, letterSpacing: 8, fontWeight: 600 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#16161a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 16, height: 16, borderRadius: 99, background: "#3b5bff" }} />
          </div>
          ALLOTAF
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2, maxWidth: 950 }}>
            Votre entreprise mérite de travailler plus intelligemment.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#a1a1ad" }}>
            Automatisation IA · Sites web · Marketing digital · Solutions métier
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#3b5bff", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
