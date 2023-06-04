import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScrollDirection } from "../redux/slices/stickySlice";



export default function useScrollDirection() {
  const { scrollDirection, disableScroll } = useSelector(
    (state) => state.sticky
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!disableScroll) {
      let lastScrollY = window.pageYOffset;
      // function to run on scroll
      const updateScrollDirection = () => {

        const scrollY = window.pageYOffset;
        const goingDown = scrollY > lastScrollY;
        const diff = 10
        // There are two cases that the header might want to change the state:
        // - when scrolling up but the header is hidden
        // - when scrolling down but the header is shown
        // stateNotMatched variable decides when to try changing the state
        const stateNotMatched = goingDown !== scrollDirection
        const scrollDownTooFast = scrollY - lastScrollY > diff
        const scrollUpTooFast = scrollY - lastScrollY <- diff
        const shouldToggleHeader = stateNotMatched && (scrollDownTooFast || scrollUpTooFast)

        if (shouldToggleHeader) {
          dispatch(setScrollDirection(goingDown));
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection);
      return () => {
        window.removeEventListener("scroll", updateScrollDirection);
      };
    }
  }, [disableScroll, dispatch, scrollDirection]);
};