// src/components/ScrollToTop.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {

    // IF URL HAS #section
    if (hash) {

      const element = document.querySelector(hash);

      if (element) {

        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);

        return;
      }
    }

    // NORMAL PAGE CHANGE
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;