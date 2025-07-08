import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui";
import { cn } from "@repo/utils";
import Image from "next/image";

type ImageZoomProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

const ImageZoom = ({ src, alt, width, height, className }: ImageZoomProps) => {
  return (
    <span className={cn("block", "my-6")}>
      <Dialog>
        <DialogTrigger asChild>
          <Image
            alt={alt || ""}
            src={src}
            width={width || 800}
            height={height || 400}
            className={cn("cursor-pointer", className)}
          />
        </DialogTrigger>
        <DialogContent
          className={cn(
            "p-6",
            "border-none",
            "bg-transparent",
            "shadow-none",
            "rounded-none",
            "outline-none",
            "h-screen",
            "max-w-none",
          )}
          showCloseButton={false}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">이미지 확대보기</DialogTitle>
          <DialogClose asChild>
            <div className={cn("flex", "flex-col")}>
              <div
                className={cn(
                  "flex-1",
                  "overflow-hidden",
                  "rounded-lg",
                  "flex",
                  "items-center",
                  "justify-center",
                )}
              >
                <Image
                  src={src}
                  alt={alt || ""}
                  width={1600}
                  height={1200}
                  className={cn("object-contain", "aspect-video", "h-full")}
                  priority
                />
              </div>
              {alt && (
                <div className={cn("text-white", "p-4", "rounded-b-lg")}>
                  <p className={cn("text-sm", "font-medium", "text-center")}>
                    {alt}
                  </p>
                </div>
              )}
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </span>
  );
};

export default ImageZoom;
