"use client";

import { cn } from "@repo/utils";
import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";

type CodeBlockProps = {
  children: {
    props: {
      className?: string;
      children?: string;
    };
  };
};

const CodeBlock = ({ children, ...props }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const childProps = children?.props;
  const className = childProps?.className || "";
  const language = className.startsWith("language-")
    ? className.replace(/language-/, "")
    : null;
  const code = childProps?.children?.trim() || "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={cn(
        "my-6",
        "rounded-md",
        "overflow-hidden",
        "relative",
        "backdrop-blur-xl",
        "shadow-2xl",
      )}
    >
      <div
        className={cn(
          "bg-primary-400/70",
          "border-white/20",
          "border-b",
          "text-white/90",
          "px-4",
          "py-2",
          "text-sm",
          "font-mono",
          "flex",
          "items-center",
          language ? "justify-between" : "justify-end",
          "shadow-lg",
        )}
      >
        {language && <span>{language}</span>}
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "flex",
            "items-center",
            "gap-1",
            "px-3",
            "py-1.5",
            "rounded-md",
            "text-xs",
            "font-medium",
            "transition-all",
            "duration-200",
            "backdrop-blur-sm",
            "border",
            copied
              ? "bg-blue-500/20 border-blue-400/30 text-blue-300"
              : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30",
          )}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <Highlight theme={themes.vsDark} code={code} language={language || ""}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              className,
              "p-4",
              "overflow-x-auto",
              "font-mono",
              "text-sm",
              "leading-relaxed",
              "bg-primary-400/90",
              "backdrop-blur-sm",
            )}
            {...props}
          >
            {tokens.map((line, i) => (
              <div key={`line-${i}`} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={`token-${key}`} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
