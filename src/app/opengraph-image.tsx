import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

export const runtime = "nodejs"
export const alt = "Outdoor Patagonia — el sur como nunca lo viste"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const svgData = readFileSync(join(process.cwd(), "public/brand/op_01.svg"))
  const svgSrc = `data:image/svg+xml;base64,${svgData.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3a7a78 0%, #4b9492 60%, #87cabf 100%)",
          gap: 64,
          padding: "0 80px",
        }}
      >
        <img
          src={svgSrc}
          width={220}
          height={220}
          style={{ flexShrink: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            Outdoor
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            Patagonia
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.80)",
              marginTop: 8,
              letterSpacing: "0.5px",
            }}
          >
            el sur como nunca lo viste
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
