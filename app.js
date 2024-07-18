document.addEventListener("DOMContentLoaded", function () {
  const centeredContainer = document.querySelector(".centered-container");
  const hexagons = document.querySelectorAll(".hexagon");
  const imageContainers = document.querySelectorAll(".img-containing-div");
  const centeredText = document.querySelector(".centered");

  if (
    !centeredContainer ||
    !hexagons.length ||
    !imageContainers.length ||
    !centeredText
  ) {
    console.error(
      "Centered container, centered text, hexagons, or image containers not found"
    );
    return;
  }

  const parentDivHeight = centeredContainer.offsetHeight;
  const transitionDistance = 0.35 * parentDivHeight; // 35% for transitioning in and out
  const stationaryDistance = 0.05 * parentDivHeight; // 5% for stationary period

  const calculateOpacity = (scrollPosition, start, middle, end, afterEnd) => {
    if (scrollPosition < start || scrollPosition > afterEnd) {
      return 0;
    } else if (scrollPosition >= start && scrollPosition < middle) {
      return (scrollPosition - start) / transitionDistance;
    } else if (scrollPosition >= middle && scrollPosition <= end) {
      return 1;
    } else if (scrollPosition > end && scrollPosition <= afterEnd) {
      return 1 - (scrollPosition - end) / transitionDistance;
    }
    return 0;
  };

  const calculateTranslation = (
    scrollPosition,
    start,
    middle,
    end,
    afterEnd,
    initialTranslate
  ) => {
    if (scrollPosition < start) {
      return initialTranslate;
    } else if (scrollPosition >= start && scrollPosition < middle) {
      return (
        initialTranslate * (1 - (scrollPosition - start) / transitionDistance)
      );
    } else if (scrollPosition >= middle && scrollPosition <= end) {
      return 0;
    } else if (scrollPosition > end && scrollPosition <= afterEnd) {
      return (initialTranslate * (scrollPosition - end)) / transitionDistance;
    }
    return initialTranslate;
  };

  const updateElementTransformations = () => {
    const scrollPosition = window.scrollY;
    const centeredRect = centeredContainer.getBoundingClientRect();
    const centeredTop = centeredRect.top + window.scrollY;
    const centeredMiddle = centeredTop + centeredRect.height / 2;
    const start = centeredMiddle - parentDivHeight / 2;
    const middle = centeredMiddle;
    const end = middle + stationaryDistance;
    const afterEnd = end + transitionDistance;

    const updateTransform = (element) => {
      let opacity = calculateOpacity(
        scrollPosition,
        start,
        middle,
        end,
        afterEnd
      );
      opacity = Math.max(0, Math.min(1, opacity)); // Ensure opacity is between 0 and 1

      const initialTranslateY = parseFloat(
        getComputedStyle(element).getPropertyValue("--initial-translate-y")
      );
      const initialTranslateX = parseFloat(
        getComputedStyle(element).getPropertyValue("--initial-translate-x")
      );
      let translateY = calculateTranslation(
        scrollPosition,
        start,
        middle,
        end,
        afterEnd,
        initialTranslateY
      );
      let translateX = calculateTranslation(
        scrollPosition,
        start,
        middle,
        end,
        afterEnd,
        initialTranslateX
      );

      translateY =
        initialTranslateY < 0
          ? Math.min(Math.max(initialTranslateY, translateY), 0) // Clamp for top elements
          : Math.max(Math.min(initialTranslateY, translateY), 0); // Clamp for bottom elements

      translateX =
        initialTranslateX < 0
          ? Math.min(Math.max(initialTranslateX, translateX), 0) // Clamp for left elements
          : Math.max(Math.min(initialTranslateX, translateX), 0); // Clamp for right elements

      element.style.opacity = opacity;
      element.style.transform = `translate(${translateX}vw, ${translateY}vh)`; // Adjust the transformation direction if needed
    };

    hexagons.forEach((element) => updateTransform(element));
    imageContainers.forEach((element) => updateTransform(element));
  };

  window.addEventListener("scroll", updateElementTransformations);
  updateElementTransformations(); // Initial call
});
