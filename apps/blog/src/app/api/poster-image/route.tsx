import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Untitled";
  const slicedTitle = title.length > 40 ? title.slice(0, 40) + "..." : title;
  const width = searchParams.get("w") || "350";
  const height = searchParams.get("h") || "180";

  return new ImageResponse(
    (
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
            fontSize: "50px",
            fontWeight: 900,
            fontFamily: "Arial Black, Arial Bold, Gadget, sans-serif",
            color: "white",
            wordBreak: "break-word",
            maxWidth: "90%",
            textShadow: "0px 0px 1px white",
            WebkitTextStroke: "1px white",
          }}
        >
          {slicedTitle}
        </p>
      </div>
    ),
    {
      width: parseInt(width, 10) * 2,
      height: parseInt(height, 10) * 2,
    }
  );
}
