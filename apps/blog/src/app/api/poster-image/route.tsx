import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Untitled";
  const slicedTitle = title.length > 40 ? `${title.slice(0, 40)}...` : title;
  const width = searchParams.get("w") || "350";
  const height = searchParams.get("h") || "180";

  const font = await readFile(
    join(process.cwd(), "public", "fonts", "BMKkubulim.otf"),
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #8BB5F5 0%, #A1C3F7 100%)",
      }}
    >
      <p
        style={{
          fontSize: "70px",
          color: "white",
          wordBreak: "keep-all",
          maxWidth: "90%",
          fontFamily: "BMKkubulim",
        }}
      >
        {slicedTitle}
      </p>
    </div>,
    {
      width: parseInt(width, 10) * 2,
      height: parseInt(height, 10) * 2,
      fonts: [
        {
          name: "BMKkubulim",
          data: font,
          weight: 900,
          style: "normal",
        },
      ],
    },
  );
}
