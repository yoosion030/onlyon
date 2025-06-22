import { useEffect } from "react";

type CommentSettingProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const useCommentSetting = ({ containerRef }: CommentSettingProps) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const existingScript = containerRef.current.querySelector("script");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "yoosion030/onlyon");
    script.setAttribute("data-repo-id", "R_kgDON72P5w");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDON72P584Ctix8");
    script.setAttribute("data-mapping", "og:title");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        const currentScript = containerRef.current.querySelector("script");
        if (currentScript) {
          currentScript.remove();
        }
      }
    };
  }, []);
};

export default useCommentSetting;
