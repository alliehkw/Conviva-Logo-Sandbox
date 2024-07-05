document.addEventListener("DOMContentLoaded", function () {
  const centeredContainer = document.querySelector(".centered-container");
  const rows = document.querySelectorAll(".row");
  const centeredText = document.querySelector(".centered");
  const corners = document.querySelectorAll(".corner");
  const fogOverlay = document.querySelector(".fog-overlay");

  if (!centeredContainer || !rows.length || !centeredText || !fogOverlay) {
    console.error(
      "Centered container, centered text, rows, or fog overlay not found"
    );
    return;
  }

  const viewportHeight = window.innerHeight;
  const bufferPeriod = 0.25 * viewportHeight; // Define a 25vh buffer period

  const rowConfigurations = {
    one: {
      hexagonStartPositions: [-100, -120, -100, 50, 180],
      translateYDirection: -20,
    },
    two: {
      hexagonStartPositions: [0, -150, 0, 90, 140],
      translateYDirection: -20,
    },
    three: {
      hexagonStartPositions: [-100, 100],
      translateYDirection: 0,
    },
    four: {
      hexagonStartPositions: [-150, -80, -20, 40],
      translateYDirection: 20,
    },
    five: {
      hexagonStartPositions: [-100, -25, 100, 75, 100],
      translateYDirection: 20,
    },
  };

  const updateRowPosition = (
    row,
    scrollPosition,
    translateDistance,
    centeredContainerTop,
    centeredContainerMiddle,
    stationaryEnd,
    translateOutStart,
    hexagonStartPositions,
    translateYDirection
  ) => {
    const translateInStart = centeredContainerTop;
    let rowPosition = (scrollPosition - translateInStart) / translateDistance;
    let translateYValue;

    if (rowPosition > 1) rowPosition = 1;

    if (translateYDirection !== 0) {
      if (
        scrollPosition >= translateInStart &&
        scrollPosition <= centeredContainerMiddle
      ) {
        // Translation in
        translateYValue = (1 - rowPosition) * translateYDirection; // Start at the top or bottom of the screen
        row.style.transform = `translate(0%, ${translateYValue}vh)`;
        row.style.opacity = rowPosition;
      } else if (
        scrollPosition > centeredContainerMiddle &&
        scrollPosition <= stationaryEnd
      ) {
        // Stationary period
        row.style.transform = `translate(0%, 0vh)`;
        row.style.opacity = 1;
      } else if (
        scrollPosition > stationaryEnd &&
        scrollPosition <= translateOutStart
      ) {
        // Translation out
        rowPosition = (scrollPosition - stationaryEnd) / translateDistance;
        translateYValue = rowPosition * translateYDirection;
        row.style.transform = `translate(0%, ${translateYValue}vh)`;
        row.style.opacity = 1 - rowPosition;
      } else if (scrollPosition < translateInStart) {
        row.style.transform = `translate(0%, ${translateYDirection}vh)`; // Initial off-screen position
        row.style.opacity = 0;
      } else {
        row.style.transform = `translate(0%, ${translateYDirection}vh)`; // Initial off-screen position
        row.style.opacity = 0;
      }
    }

    row.querySelectorAll(".hexagon").forEach((hexagon, index) => {
      let hexagonPosition =
        (scrollPosition - translateInStart) / translateDistance;
      let translateXValue;

      translateXValue = (1 - hexagonPosition) * hexagonStartPositions[index];
      if (hexagonStartPositions[index] < 0) {
        translateXValue = Math.min(0, translateXValue); // Clamp translateXValue to a maximum of 0
      } else {
        translateXValue = Math.max(0, translateXValue); // Clamp translateXValue to a minimum of 0
      }

      if (hexagonPosition > 1) hexagonPosition = 1;

      if (
        scrollPosition >= translateInStart &&
        scrollPosition <= centeredContainerMiddle
      ) {
        // Translation in
        hexagon.style.transform = `translate(${translateXValue}%, 0)`;
        hexagon.style.opacity = hexagonPosition;
      } else if (
        scrollPosition > centeredContainerMiddle &&
        scrollPosition <= stationaryEnd
      ) {
        // Stationary period
        hexagon.style.transform = `translate(0%, 0)`;
        hexagon.style.opacity = 1;
      } else if (
        scrollPosition > stationaryEnd &&
        scrollPosition <= translateOutStart
      ) {
        // Translation out
        hexagonPosition = (scrollPosition - stationaryEnd) / translateDistance;
        translateXValue = hexagonPosition * hexagonStartPositions[index];
        hexagon.style.transform = `translate(${translateXValue}%, 0)`;
        hexagon.style.opacity = 1 - hexagonPosition;
      } else if (scrollPosition < translateInStart) {
        hexagon.style.transform = `translate(${hexagonStartPositions[index]}%, 0)`;
        hexagon.style.opacity = 0;
      } else {
        hexagon.style.transform = `translate(${hexagonStartPositions[index]}%, 0)`;
        hexagon.style.opacity = 0;
      }
    });
  };

  const updateCornerPositions = (
    scrollPosition,
    translateDistance,
    centeredContainerTop,
    centeredContainerMiddle,
    stationaryEnd,
    translateOutStart
  ) => {
    const translateInStart = centeredContainerTop;
    let cornerPosition =
      (scrollPosition - translateInStart) / translateDistance;

    corners.forEach((corner) => {
      let translateXValue;

      if (corner.classList.contains("top-left")) {
        translateXValue = (1 - cornerPosition) * -15; // Slightly off-screen
        translateXValue = Math.min(0, translateXValue); // Clamp to maximum of 0
      } else if (corner.classList.contains("bottom-right")) {
        translateXValue = (1 - cornerPosition) * 15; // Slightly off-screen
        translateXValue = Math.max(0, translateXValue); // Clamp to minimum of 0
      }

      if (cornerPosition > 1) cornerPosition = 1;

      if (
        scrollPosition >= translateInStart &&
        scrollPosition <= centeredContainerMiddle
      ) {
        // Translation in
        corner.style.transform = `translate(${translateXValue}vw, 0)`;
        corner.style.opacity = cornerPosition;
      } else if (
        scrollPosition > centeredContainerMiddle &&
        scrollPosition <= stationaryEnd
      ) {
        // Stationary period
        corner.style.transform = `translate(0, 0)`;
        corner.style.opacity = 1;
      } else if (
        scrollPosition > stationaryEnd &&
        scrollPosition <= translateOutStart
      ) {
        // Translation out
        cornerPosition = (scrollPosition - stationaryEnd) / translateDistance;
        translateXValue =
          cornerPosition * (corner.classList.contains("top-left") ? -15 : 15);
        corner.style.transform = `translate(${translateXValue}vw, 0)`;
        corner.style.opacity = 1 - cornerPosition;
      } else if (scrollPosition < translateInStart) {
        corner.style.transform = `translate(${
          corner.classList.contains("top-left") ? "-15vw" : "15vw"
        }, 0)`;
        corner.style.opacity = 0;
      } else {
        corner.style.transform = `translate(${
          corner.classList.contains("top-left") ? "-15vw" : "15vw"
        }, 0)`;
        corner.style.opacity = 0;
      }
    });
  };

  const updateRowPositions = () => {
    const scrollPosition = window.scrollY;
    const centeredContainerRect = centeredContainer.getBoundingClientRect();
    const centeredContainerTop = centeredContainerRect.top + window.scrollY;
    const centeredContainerMiddle =
      centeredContainerTop + centeredContainerRect.height / 2;

    const rowFive = document.querySelector(".row.five");
    const rowFiveBottom =
      rowFive.getBoundingClientRect().bottom + window.scrollY;
    const translateOutStart = rowFiveBottom - viewportHeight + bufferPeriod; // Add buffer period to translateOutStart
    const translateDistance =
      (centeredContainerMiddle - centeredContainerTop) / 2; // Halve the translate distance
    const stationaryEnd = centeredContainerMiddle + bufferPeriod; // Define the end of the stationary period

    rows.forEach((row) => {
      const rowClass = row.classList[1]; // Assuming the row class is always the second class
      const config = rowConfigurations[rowClass];

      if (config) {
        updateRowPosition(
          row,
          scrollPosition,
          translateDistance,
          centeredContainerTop,
          centeredContainerMiddle,
          stationaryEnd,
          translateOutStart,
          config.hexagonStartPositions,
          config.translateYDirection
        );
      }
    });

    updateCornerPositions(
      scrollPosition,
      translateDistance,
      centeredContainerTop,
      centeredContainerMiddle,
      stationaryEnd,
      translateOutStart
    );

    // Ensure centered text remains sticky long enough
    if (scrollPosition <= translateOutStart) {
      centeredText.style.position = "sticky";
      centeredText.style.top = "50%";
      centeredText.style.transform = "translateY(-50%)";
    } else {
      centeredText.style.position = "static";
      centeredText.style.transform = "none";
    }

    // Update fog overlay opacity
    if (
      scrollPosition < centeredContainerTop ||
      scrollPosition > translateOutStart
    ) {
      fogOverlay.style.opacity = 0;
    } else if (
      scrollPosition >= centeredContainerTop &&
      scrollPosition <= stationaryEnd
    ) {
      fogOverlay.style.opacity = 1;
    } else {
      const fadeOutPosition =
        (scrollPosition - stationaryEnd) / translateDistance;
      fogOverlay.style.opacity = 1 - fadeOutPosition;
    }
  };

  window.addEventListener("scroll", updateRowPositions);
  updateRowPositions(); // Initial call
});
