import { cn } from "@repo/utils";

const PostSkeleton = () => {
  return (
    <div
      className={cn(
        "hover:bg-blue-50",
        "rounded-2xl",
        "p-2",
        "transition",
        "duration-300",
        "ease-in-out",
        "animate-pulse",
        "w-full",
      )}
    >
      <div
        className={cn(
          "aspect-video",
          "rounded-2xl",
          "w-full",
          "bg-gray-200",
          "animate-pulse",
        )}
      />

      <div className={cn("flex", "flex-col", "gap-1", "py-3")}>
        <div
          className={cn(
            "h-3",
            "bg-gray-200",
            "rounded",
            "animate-pulse",
            "w-20",
          )}
        />

        <div
          className={cn(
            "h-5",
            "bg-gray-200",
            "rounded",
            "animate-pulse",
            "w-3/4",
            "mt-1",
          )}
        />

        <div
          className={cn(
            "h-3",
            "bg-gray-200",
            "rounded",
            "animate-pulse",
            "w-2/3",
            "mt-1",
          )}
        />
      </div>
    </div>
  );
};

export default PostSkeleton;
