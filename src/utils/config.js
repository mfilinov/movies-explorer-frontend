import {
  DESKTOP_INIT_CARDS,
  DESKTOP_MORE_CARDS,
  MOBILE_INIT_CARDS,
  MOBILE_MORE_CARDS,
  TABLET_INIT_CARDS,
  TABLET_MORE_CARDS
} from "./constants";

export const visibleMovieCards = {
  desktop: {
    initCount: DESKTOP_INIT_CARDS,
    moreCount: DESKTOP_MORE_CARDS,
  },
  tablet: {
    initCount: TABLET_INIT_CARDS,
    moreCount: TABLET_MORE_CARDS,
  },
  mobile: {
    initCount: MOBILE_INIT_CARDS,
    moreCount: MOBILE_MORE_CARDS,
  },
};