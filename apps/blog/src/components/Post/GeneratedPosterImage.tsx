import { cn } from "@repo/utils";
import Image, { type ImageProps } from "next/image";

type GeneratedPosterImageProps = {
  title: string;
  width: number;
  height: number;
} & Omit<ImageProps, "src">;

const GeneratedPosterImage = ({
  title,
  width,
  height,
  ...props
}: GeneratedPosterImageProps) => {
  const apiUrl = `/api/poster-image?title=${encodeURIComponent(title)}&w=${width}&h=${height}`;

  return (
    <Image
      src={apiUrl}
      className={cn("aspect-video", "rounded-2xl")}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default GeneratedPosterImage;
