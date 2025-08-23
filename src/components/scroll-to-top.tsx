"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 40) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="fixed bottom-4 right-4 z-20 md:block hidden">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="opacity-85"
          title="Cuộn lên đầu trang"
          variant="gradientBluePurple"
        >
          <ArrowUp />
        </Button>
      )}
    </div>
  );
}
