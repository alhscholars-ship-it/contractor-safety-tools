import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c1a2e",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(241,109,44,0.25), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#e05a1e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
              fontWeight: 700,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "white",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            fontSize: "60px",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "920px",
          }}
        >
          Jobsite paperwork, built to{" "}
          <span style={{ color: "#f16d2c" }}>pass inspection</span>.
        </div>

        <div
          style={{
            marginTop: "32px",
            fontSize: "26px",
            color: "#dde3ea",
            maxWidth: "780px",
          }}
        >
          Free safety plans, checklists, and incident reports for contractors.
        </div>
      </div>
    ),
    { ...size }
  );
}
