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

    rows.forEach((row, index) => {
      const translateInStart = centeredContainerTop;
      let rowPosition = (scrollPosition - translateInStart) / translateDistance;

      let translateXValue;
      let translateYValue;
      let adjustedRowPosition;

      if (row.classList.contains("three")) {
        // Handle horizontal translation for the divs within row three
        row.querySelectorAll("div").forEach((div, divIndex) => {
          const translateInStart = centeredContainerTop;
          let rowPosition =
            (scrollPosition - translateInStart) / translateDistance;
          let translateXValue;
          let adjustedRowPosition;

          if (divIndex === 0) {
            // First div slides in from the left side
            translateXValue = (1 - rowPosition) * -20; // Adjust initial off-screen position to -20%
          } else {
            // Second div slides in from the right side
            translateXValue = (1 - rowPosition) * 20; // Adjust initial off-screen position to 20%
          }

          // Adjust rowPosition to control opacity transition timing
          if (rowPosition >= 0.4) {
            adjustedRowPosition = (rowPosition - 0.4) * 1.66; // Start opacity transition at 0.4
          } else {
            adjustedRowPosition = 0;
          }

          if (
            scrollPosition >= translateInStart &&
            scrollPosition <= centeredContainerMiddle
          ) {
            // Translation in
            if (rowPosition <= 1) {
              div.style.transform = `translateX(${translateXValue}%)`;
              div.style.opacity = adjustedRowPosition;
            } else {
              div.style.transform = `translateX(0%)`;
              div.style.opacity = 1;
            }
          } else if (
            scrollPosition > centeredContainerMiddle &&
            scrollPosition <= stationaryEnd
          ) {
            // Stationary period
            div.style.transform = `translateX(0%)`;
            div.style.opacity = 1;
          } else if (
            scrollPosition > stationaryEnd &&
            scrollPosition <= translateOutStart
          ) {
            // Translation out
            rowPosition = (scrollPosition - stationaryEnd) / translateDistance;
            if (divIndex === 0) {
              translateXValue = rowPosition * -20; // Adjust translation value
            } else {
              translateXValue = rowPosition * 20; // Adjust translation value
            }
            div.style.transform = `translateX(${translateXValue}%)`;
            div.style.opacity = 1 - rowPosition;
          } else if (scrollPosition < translateInStart) {
            div.style.transform = `translateX(${
              divIndex === 0 ? "-20%" : "20%"
            })`;
            div.style.opacity = 0;
          } else {
            div.style.transform = `translateX(${
              divIndex === 0 ? "-20%" : "20%"
            })`;
            div.style.opacity = 0;
          }

          console.log(`Row 3 Div ${divIndex + 1} Position:`, rowPosition);
          console.log(`TranslateX: ${div.style.transform}`);
          console.log("div.style.opacity", div.style.opacity);
        });
      } else if (
        row.classList.contains("one") ||
        row.classList.contains("two")
      ) {
        // Handle rows one and two
        if (rowPosition > 1) {
          rowPosition = 1; // Clamp row position to 1 during translate in
        }

        if (
          scrollPosition >= translateInStart &&
          scrollPosition <= centeredContainerMiddle
        ) {
          // Translation in
          translateXValue = (1 - rowPosition) * 20; // Adjust initial off-screen position to 20%
          translateYValue = (1 - rowPosition) * -20; // Adjust initial off-screen position to -20%
          row.style.transform = `translate(${translateXValue}%, ${translateYValue}vh)`;
          row.style.opacity = rowPosition; // Opacity transition
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
          translateXValue = rowPosition * 20; // Adjust translation value
          translateYValue = rowPosition * -20; // Adjust translation value
          row.style.transform = `translate(${translateXValue}%, ${translateYValue}vh)`;
          row.style.opacity = 1 - rowPosition;
        } else if (scrollPosition < translateInStart) {
          row.style.transform = `translate(20%, -20vh)`; // Initial off-screen position
          row.style.opacity = 0;
        } else {
          row.style.transform = `translate(20%, -20vh)`; // Initial off-screen position
          row.style.opacity = 0;
        }

        console.log(`Row ${index + 1} Position:`, rowPosition);
        console.log(`Translate: ${row.style.transform}`);
        console.log("row.style.opacity", row.style.opacity);
      } else if (
        row.classList.contains("four") ||
        row.classList.contains("five")
      ) {
        // Handle rows four and five
        if (rowPosition > 1) {
          rowPosition = 1; // Clamp row position to 1 during translate in
        }

        if (
          scrollPosition >= translateInStart &&
          scrollPosition <= centeredContainerMiddle
        ) {
          // Translation in
          translateXValue = (1 - rowPosition) * -20; // Adjust initial off-screen position to -20%
          translateYValue = (1 - rowPosition) * 20; // Adjust initial off-screen position to 20%
          row.style.transform = `translate(${translateXValue}%, ${translateYValue}vh)`;
          row.style.opacity = rowPosition; // Opacity transition
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
          translateXValue = rowPosition * -20; // Adjust translation value
          translateYValue = rowPosition * 20; // Adjust translation value
          row.style.transform = `translate(${translateXValue}%, ${translateYValue}vh)`;
          row.style.opacity = 1 - rowPosition;
        } else if (scrollPosition < translateInStart) {
          row.style.transform = `translate(-20%, 20vh)`; // Initial off-screen position
          row.style.opacity = 0;
        } else {
          row.style.transform = `translate(-20%, 20vh)`; // Initial off-screen position
          row.style.opacity = 0;
        }

        console.log(`Row ${index + 1} Position:`, rowPosition);
        console.log(`Translate: ${row.style.transform}`);
        console.log("row.style.opacity", row.style.opacity);
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
