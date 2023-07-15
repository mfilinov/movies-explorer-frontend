import {deviceWidth} from "../contexts/WindowModeContext";
import {useLayoutEffect, useState} from "react";

function debounce(f, ms) {
  let isCooldown = false;
  return function() {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}

export default function useWindowSize() {
  const [screenType, setScreenType] = useState("desktop");
  const debounceTime = 500;
  const handleScreenResize = () => {
    const currenWidth = window.innerWidth
    if (currenWidth < deviceWidth.tablet) {
      setScreenType('mobile');
    } else if (currenWidth === deviceWidth.tablet) {
      setScreenType('tablet');
    } else if (currenWidth > deviceWidth.tablet) {
      setScreenType('desktop');
    }
  }
  useLayoutEffect(() => {
    window.addEventListener('resize', debounce(handleScreenResize, debounceTime));
    handleScreenResize();
    return () => {
      window.removeEventListener('resize', debounce(handleScreenResize, debounceTime));
    };
  })
  return screenType
}
