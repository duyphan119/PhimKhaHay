"use client";

import { useEffect, useState } from "react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary text-primary-foreground p-3 shadow-lg hover:bg-primary/80 transition-all duration-200 hover:scale-110 active:scale-95"
          title="Cuộn lên đầu trang"
          aria-label="Scroll to top"
        >
          <HugeiconsIcon icon={ArrowUp01Icon} size={20} />
        </button>
      )}
    </>
  );
}
