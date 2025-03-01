import { cn } from "@repo/utils";
import { GithubIcon, LinkedinIcon, VelogIcon } from "../assets";

export const Footer = () => {
  return (
    <footer className={cn("w-full", "h-[12.5rem]", "space-y-4", "mx-auto")}>
      <p className={cn("text-[0.75rem]", "font-thin", "text-primary-linear")}>
        ©2025. OnlyOn all rights reserved.
      </p>

      <div>
        <h2 className={cn("text-sm", "font-bold", "text-primary-linear")}>
          비지니스 문의
        </h2>
        <ul>
          <li className={cn("text-[0.75rem]", "text-primary-400", "font-thin")}>
            연락처: 010-9201-5487
          </li>
          <li className={cn("text-[0.75rem]", "text-primary-400", "font-thin")}>
            <a href="mailto:yoosioff@gmail.com">이메일: yoosioff@gmail.com</a>
          </li>
        </ul>
      </div>

      <div className={cn("flex", "gap-3")}>
        <a
          href="https://github.com/yoosion030"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub 프로필 방문하기"
        >
          <GithubIcon className={cn("text-primary")} />
        </a>
        <a
          href="https://www.linkedin.com/in/yusion"
          target="_blank"
          rel="noreferrer"
          aria-label="Linkedin 프로필 방문하기"
        >
          <LinkedinIcon className={cn("text-primary")} />
        </a>
        <a
          href="https://velog.io/@yoosion030"
          target="_blank"
          rel="noreferrer"
          aria-label="Velog 프로필 방문하기"
        >
          <VelogIcon className={cn("text-primary")} />
        </a>
      </div>
    </footer>
  );
};
