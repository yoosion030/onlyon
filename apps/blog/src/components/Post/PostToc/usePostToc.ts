"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type HeadingType = {
  id: string;
  text: string;
  level: number;
  element: Element;
};

type UsePostTocReturnType = {
  headingList: HeadingType[];
  activeHeadingId: string | null;
  handleHeadingClickToScroll: (id: string) => void;
};

export const usePostToc = (): UsePostTocReturnType => {
  const pathname = usePathname();
  const [headingList, setHeadingList] = useState<HeadingType[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const headingClickRef = useRef<boolean>(false);

  const getHeadings = useCallback((): HeadingType[] => {
    const headingElements = document.querySelectorAll("[data-heading='true']");

    if (!headingElements) {
      return [];
    }

    const headingData = Array.from(headingElements).map((heading, index) => {
      const level = heading.tagName.charAt(1);
      if (!heading.id) {
        heading.id = `#${level}-${index}`;
      }

      return {
        id: heading.id,
        text: heading.textContent?.replace(/#+$/, "") ?? "",
        level: Number(level),
        element: heading,
      };
    });

    return headingData;
  }, []);

  useEffect(() => {
    const headings = getHeadings();
    setHeadingList(headings);
  }, [getHeadings, pathname]);

  const handleScrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      headingClickRef.current = true;

      const headerHeight = 52;
      const buffer = 20;

      window.scrollTo({
        top: element.offsetTop - headerHeight - buffer,
        behavior: "smooth",
      });
      setActiveHeadingId(id);
      window.history.pushState(null, "", id);

      setTimeout(() => {
        headingClickRef.current = false;
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash;
      handleScrollToHeading(id);
    }
  }, [handleScrollToHeading]);

  const getCurrentActiveId = useCallback(() => {
    if (headingList.length === 0) return null;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const headingListWithPosition = headingList.map((heading) => {
      const element = document.getElementById(heading.id);
      const top = element ? element.getBoundingClientRect().top + scrollTop : 0;
      return { ...heading, top };
    });

    const headingHeight = 52;
    const buffer = 100;

    const currentHeading = headingListWithPosition
      .reverse()
      .find((heading) => scrollTop + headingHeight + buffer >= heading.top);

    return currentHeading?.id || null;
  }, [headingList]);

  const handleScroll = useCallback(() => {
    if (headingClickRef.current) return;

    const newActiveId = getCurrentActiveId();
    setActiveHeadingId(newActiveId);
  }, [getCurrentActiveId]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("headingClick", () =>
      handleScrollToHeading(window.location.hash ?? ""),
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("headingClick", () =>
        handleScrollToHeading(window.location.hash ?? ""),
      );
    };
  }, [handleScroll, handleScrollToHeading]);

  return {
    headingList,
    activeHeadingId,
    handleHeadingClickToScroll: handleScrollToHeading,
  };
};
