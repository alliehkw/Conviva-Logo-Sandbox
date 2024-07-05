document.addEventListener("DOMContentLoaded", function () {
  const centeredContainer = document.querySelector(".centered-container");
  const rows = document.querySelectorAll(".row");
  const centeredText = document.querySelector(".centered");

  if (!centeredContainer || !rows.length || !centeredText) {
    console.error("Centered container, centered text, or rows not found");
    return;
  }

  const viewportHeight = window.innerHeight;
  const bufferPeriod = 0.25 * viewportHeight; // Define a 25vh buffer period

  const updateRowOnePosition = (
    row,
    scrollPosition,
    translateDistance,
    centeredContainerTop,
    centeredContainerMiddle,
    stationaryEnd,
    translateOutStart
  ) => {
    const translateInStart = centeredContainerTop;
    let rowPosition = (scrollPosition - translateInStart) / translateDistance;
    let translateYValue;

    if (rowPosition > 1) rowPosition = 1;

    if (
      scrollPosition >= translateInStart &&
      scrollPosition <= centeredContainerMiddle
    ) {
      // Translation in
      translateYValue = (1 - rowPosition) * -20; // Start at the top of the screen
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
      translateYValue = rowPosition * -20;
      row.style.transform = `translate(0%, ${translateYValue}vh)`;
      row.style.opacity = 1 - rowPosition;
    } else if (scrollPosition < translateInStart) {
      row.style.transform = `translate(0%, -20vh)`; // Initial off-screen position at the top
      row.style.opacity = 0;
    } else {
      row.style.transform = `translate(0%, -20vh)`; // Initial off-screen position at the top
      row.style.opacity = 0;
    }

    row.querySelectorAll(".hexagon").forEach((hexagon, index) => {
      let hexagonPosition =
        (scrollPosition - translateInStart) / translateDistance;
      let translateXValue;

      if (index === 0 || index === 1) {
        // Hexagons one and two start all the way on the left
        translateXValue = (1 - hexagonPosition) * -100;
        translateXValue = Math.min(0, translateXValue); // Clamp translateXValue to a maximum of 0
      } else if (index === 2) {
        // Hexagon three starts on the right
        translateXValue = (1 - hexagonPosition) * 100;
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
        translateXValue =
          index === 0 || index === 1
            ? hexagonPosition * -100
            : hexagonPosition * 100;
        hexagon.style.transform = `translate(${translateXValue}%, 0)`;
        hexagon.style.opacity = 1 - hexagonPosition;
      } else if (scrollPosition < translateInStart) {
        hexagon.style.transform = `translate(${
          index === 0 || index === 1 ? "-100%" : "100%"
        }, 0)`;
        hexagon.style.opacity = 0;
      } else {
        hexagon.style.transform = `translate(${
          index === 0 || index === 1 ? "-100%" : "100%"
        }, 0)`;
        hexagon.style.opacity = 0;
      }

      console.log(`Row 1 Hexagon ${index + 1} Position:`, hexagonPosition);
      console.log(`Translate: ${hexagon.style.transform}`);
      console.log("hexagon.style.opacity", hexagon.style.opacity);
    });
  };

  const updateRowTwoPosition = (
    row,
    scrollPosition,
    translateDistance,
    centeredContainerTop,
    centeredContainerMiddle,
    stationaryEnd,
    translateOutStart
  ) => {
    const translateInStart = centeredContainerTop;
    let rowPosition = (scrollPosition - translateInStart) / translateDistance;
    let translateYValue;

    if (rowPosition > 1) rowPosition = 1;

    if (
      scrollPosition >= translateInStart &&
      scrollPosition <= centeredContainerMiddle
    ) {
      // Translation in
      translateYValue = (1 - rowPosition) * -20;
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
      translateYValue = rowPosition * -20;
      row.style.transform = `translate(0%, ${translateYValue}vh)`;
      row.style.opacity = 1 - rowPosition;
    } else if (scrollPosition < translateInStart) {
      row.style.transform = `translate(0%, -20vh)`;
      row.style.opacity = 0;
    } else {
      row.style.transform = `translate(0%, -20vh)`;
      row.style.opacity = 0;
    }

    row.querySelectorAll(".hexagon").forEach((hexagon, index) => {
      let hexagonPosition =
        (scrollPosition - translateInStart) / translateDistance;

      if (index === 0) {
        // Hexagon one starts on the left and translates to the resting position
        let translateXValue = (1 - hexagonPosition) * -100;
        translateXValue = Math.min(0, translateXValue); // Clamp translateXValue to a maximum of 0

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
          hexagonPosition =
            (scrollPosition - stationaryEnd) / translateDistance;
          translateXValue = hexagonPosition * -100;
          hexagon.style.transform = `translate(${translateXValue}%, 0)`;
          hexagon.style.opacity = 1 - hexagonPosition;
        } else if (scrollPosition < translateInStart) {
          hexagon.style.transform = `translate(-100%, 0)`;
          hexagon.style.opacity = 0;
        } else {
          hexagon.style.transform = `translate(-100%, 0)`;
          hexagon.style.opacity = 0;
        }

        console.log(`Row 2 Hexagon 1 Position:`, hexagonPosition);
        console.log(`Translate: ${hexagon.style.transform}`);
        console.log("hexagon.style.opacity", hexagon.style.opacity);
      }

      if (index === 2) {
        // Hexagon three starts on the right and translates to the resting position
        let translateXValue = (1 - hexagonPosition) * 100;
        translateXValue = Math.max(0, translateXValue); // Clamp translateXValue to a minimum of 0

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
          hexagonPosition =
            (scrollPosition - stationaryEnd) / translateDistance;
          translateXValue = hexagonPosition * 100;
          hexagon.style.transform = `translate(${translateXValue}%, 0)`;
          hexagon.style.opacity = 1 - hexagonPosition;
        } else if (scrollPosition < translateInStart) {
          hexagon.style.transform = `translate(100%, 0)`;
          hexagon.style.opacity = 0;
        } else {
          hexagon.style.transform = `translate(100%, 0)`;
          hexagon.style.opacity = 0;
        }

        console.log(`Row 2 Hexagon 3 Position:`, hexagonPosition);
        console.log(`Translate: ${hexagon.style.transform}`);
        console.log("hexagon.style.opacity", hexagon.style.opacity);
      }
    });

    console.log(`Row 2 Position:`, rowPosition);
    console.log(`Translate: ${row.style.transform}`);
    console.log("row.style.opacity", row.style.opacity);
  };

  const updateRowThreePosition = (
    row,
    scrollPosition,
    translateDistance,
    centeredContainerTop,
    centeredContainerMiddle,
    stationaryEnd,
    translateOutStart
  ) => {
    let rowPosition =
      (scrollPosition - centeredContainerTop) / translateDistance;
    row.querySelectorAll(".hexagon").forEach((hexagon) => {
      let hexagonPosition =
        (scrollPosition - centeredContainerTop) / translateDistance;

      if (hexagon.classList.contains("left-logo")) {
        // left-logo starts on the left and translates to the resting position
        let translateXValue = (1 - hexagonPosition) * -100;
        translateXValue = Math.min(0, translateXValue); // Clamp translateXValue to a maximum of 0

        if (hexagonPosition > 1) hexagonPosition = 1;

        if (
          scrollPosition >= centeredContainerTop &&
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
          hexagonPosition =
            (scrollPosition - stationaryEnd) / translateDistance;
          translateXValue = hexagonPosition * -100;
          hexagon.style.transform = `translate(${translateXValue}%, 0)`;
          hexagon.style.opacity = 1 - hexagonPosition;
        } else if (scrollPosition < centeredContainerTop) {
          hexagon.style.transform = `translate(-100%, 0)`;
          hexagon.style.opacity = 0;
        } else {
          hexagon.style.transform = `translate(-100%, 0)`;
          hexagon.style.opacity = 0;
        }

        console.log(`Row 3 Left Logo Position:`, hexagonPosition);
        console.log(`Translate: ${hexagon.style.transform}`);
        console.log("hexagon.style.opacity", hexagon.style.opacity);
      }

      if (hexagon.classList.contains("right-logo")) {
        // right-logo starts on the right and translates to the resting position
        let translateXValue = (1 - hexagonPosition) * 100;
        translateXValue = Math.max(0, translateXValue); // Clamp translateXValue to a minimum of 0

        if (hexagonPosition > 1) hexagonPosition = 1;

        if (
          scrollPosition >= centeredContainerTop &&
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
          hexagonPosition =
            (scrollPosition - stationaryEnd) / translateDistance;
          translateXValue = hexagonPosition * 100;
          hexagon.style.transform = `translate(${translateXValue}%, 0)`;
          hexagon.style.opacity = 1 - hexagonPosition;
        } else if (scrollPosition < centeredContainerTop) {
          hexagon.style.transform = `translate(100%, 0)`;
          hexagon.style.opacity = 0;
        } else {
          hexagon.style.transform = `translate(100%, 0)`;
          hexagon.style.opacity = 0;
        }

        console.log(`Row 3 Right Logo Position:`, hexagonPosition);
        console.log(`Translate: ${hexagon.style.transform}`);
        console.log("hexagon.style.opacity", hexagon.style.opacity);
      }
    });

    console.log(`Row 3 Position:`, rowPosition);
    console.log(`Translate: ${row.style.transform}`);
    console.log("row.style.opacity", row.style.opacity);
  };

  const updateRowFourPosition = (
    row,
    scrollPosition,
    translateDistance,
    centeredContainerTop,
    centeredContainerMiddle,
    stationaryEnd,
    translateOutStart
  ) => {
    const translateInStart = centeredContainerTop;
    let rowPosition = (scrollPosition - translateInStart) / translateDistance;
    let translateYValue;

    if (rowPosition > 1) rowPosition = 1;

    if (
      scrollPosition >= translateInStart &&
      scrollPosition <= centeredContainerMiddle
    ) {
      // Translation in
      translateYValue = (1 - rowPosition) * 20; // Start at the bottom of the screen
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
      translateYValue = rowPosition * 20;
      row.style.transform = `translate(0%, ${translateYValue}vh)`;
      row.style.opacity = 1 - rowPosition;
    } else if (scrollPosition < translateInStart) {
      row.style.transform = `translate(0%, 20vh)`; // Initial off-screen position at the bottom
      row.style.opacity = 0;
    } else {
      row.style.transform = `translate(0%, 20vh)`; // Initial off-screen position at the bottom
      row.style.opacity = 0;
    }

    console.log(`Row 4 Position:`, rowPosition);
    console.log(`Translate: ${row.style.transform}`);
    console.log("row.style.opacity", row.style.opacity);
  };

  const updateRowFivePosition = (
    row,
    scrollPosition,
    translateDistance,
    centeredContainerTop,
    centeredContainerMiddle,
    stationaryEnd,
    translateOutStart
  ) => {
    const translateInStart = centeredContainerTop;
    let rowPosition = (scrollPosition - translateInStart) / translateDistance;
    let translateYValue;

    if (rowPosition > 1) rowPosition = 1;

    if (
      scrollPosition >= translateInStart &&
      scrollPosition <= centeredContainerMiddle
    ) {
      // Translation in
      translateYValue = (1 - rowPosition) * 20; // Start at the bottom of the screen
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
      translateYValue = rowPosition * 20;
      row.style.transform = `translate(0%, ${translateYValue}vh)`;
      row.style.opacity = 1 - rowPosition;
    } else if (scrollPosition < translateInStart) {
      row.style.transform = `translate(0%, 20vh)`; // Initial off-screen position at the bottom
      row.style.opacity = 0;
    } else {
      row.style.transform = `translate(0%, 20vh)`; // Initial off-screen position at the bottom
      row.style.opacity = 0;
    }

    console.log(`Row 5 Position:`, rowPosition);
    console.log(`Translate: ${row.style.transform}`);
    console.log("row.style.opacity", row.style.opacity);
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
      if (row.classList.contains("one")) {
        updateRowOnePosition(
          row,
          scrollPosition,
          translateDistance,
          centeredContainerTop,
          centeredContainerMiddle,
          stationaryEnd,
          translateOutStart
        );
      } else if (row.classList.contains("two")) {
        updateRowTwoPosition(
          row,
          scrollPosition,
          translateDistance,
          centeredContainerTop,
          centeredContainerMiddle,
          stationaryEnd,
          translateOutStart
        );
      } else if (row.classList.contains("three")) {
        updateRowThreePosition(
          row,
          scrollPosition,
          translateDistance,
          centeredContainerTop,
          centeredContainerMiddle,
          stationaryEnd,
          translateOutStart
        );
      } else if (row.classList.contains("four")) {
        updateRowFourPosition(
          row,
          scrollPosition,
          translateDistance,
          centeredContainerTop,
          centeredContainerMiddle,
          stationaryEnd,
          translateOutStart
        );
      } else if (row.classList.contains("five")) {
        updateRowFivePosition(
          row,
          scrollPosition,
          translateDistance,
          centeredContainerTop,
          centeredContainerMiddle,
          stationaryEnd,
          translateOutStart
        );
      }
    });

    // Ensure centered text remains sticky long enough
    if (scrollPosition <= translateOutStart) {
      centeredText.style.position = "sticky";
      centeredText.style.top = "50%";
      centeredText.style.transform = "translateY(-50%)";
    } else {
      centeredText.style.position = "static";
      centeredText.style.transform = "none";
    }
  };

  window.addEventListener("scroll", updateRowPositions);
  updateRowPositions(); // Initial call
});
