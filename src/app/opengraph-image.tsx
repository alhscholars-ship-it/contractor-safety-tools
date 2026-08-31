import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const runtime = "nodejs";

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
          fontFamily: "Arial, Helvetica, sans-serif",
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
              fontSize: "24px",
              color: "white",
              fontWeight: 700,
            }}
          >
            OK
          </div>
          <div
            style={{
              display: "flex",
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
            display: "flex",
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
            display: "flex",
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
    { ...size },
  );
}
