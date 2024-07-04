document.addEventListener("DOMContentLoaded", function () {
  const centeredContainer = document.querySelector(".centered-container");
  const rows = document.querySelectorAll(".row");

  if (!centeredContainer || !rows.length) {
    console.error("Centered container or rows not found");
    return;
  }

  const viewportHeight = window.innerHeight;

  const updateRowPositions = () => {
    const scrollPosition = window.scrollY;
    const centeredContainerRect = centeredContainer.getBoundingClientRect();
    const centeredContainerTop = centeredContainerRect.top + window.scrollY;
    const centeredContainerMiddle =
      centeredContainerTop + centeredContainerRect.height / 2;

    const rowFive = document.querySelector(".row.five");
    const rowFiveBottom =
      rowFive.getBoundingClientRect().bottom + window.scrollY;
    const translateOutStart = rowFiveBottom - viewportHeight / 2;
    const translateDistance = centeredContainerMiddle - centeredContainerTop;

    rows.forEach((row, index) => {
      const translateInStart = centeredContainerTop;
      let rowPosition = (scrollPosition - translateInStart) / translateDistance;

      let translateXValue;
      let translateYValue;
      let adjustedRowPosition;

      // Determine the direction of translation
      if (index === 0 || index === 1) {
        // .row.one and .row.two slide in from the top right
        translateXValue = (1 - rowPosition) * 100; // Positive value for right to left
        translateYValue = (1 - rowPosition) * -100; // Move from top to original position
      } else {
        // .row.three and .row.four slide in from the bottom left
        translateXValue = (1 - rowPosition) * -100; // Negative value for left to right
        translateYValue = (1 - rowPosition) * 100; // Move from bottom to original position
      }

      // Adjust rowPosition to control opacity transition timing
      if (rowPosition >= 0.5) {
        adjustedRowPosition = (rowPosition - 0.5) * 2; // Start opacity transition at 0.5
      } else {
        adjustedRowPosition = 0;
      }

      if (
        scrollPosition >= translateInStart &&
        scrollPosition <= centeredContainerMiddle
      ) {
        // Translation in
        row.style.transform = `translate(${translateXValue}%, ${translateYValue}vh)`;
        row.style.opacity = adjustedRowPosition;
      } else if (
        scrollPosition > centeredContainerMiddle &&
        scrollPosition <= translateOutStart
      ) {
        // Translation out
        rowPosition =
          (scrollPosition - centeredContainerMiddle) / translateDistance;
        if (index === 0 || index === 1) {
          translateXValue = rowPosition * 100; // Positive value for right to left
          translateYValue = rowPosition * -100; // Move from original position to top
        } else {
          translateXValue = rowPosition * -100; // Negative value for left to right
          translateYValue = rowPosition * 100; // Move from original position to bottom
        }
        row.style.transform = `translate(${translateXValue}%, ${translateYValue}vh)`;
        row.style.opacity = 1 - rowPosition;
      } else if (scrollPosition < translateInStart) {
        row.style.transform = `translate(${
          index === 0 || index === 1 ? "100%, -100vh" : "-100%, 100vh"
        })`;
        row.style.opacity = 0;
      } else {
        row.style.transform = `translate(${
          index === 0 || index === 1 ? "100%, -100vh" : "-100%, 100vh"
        })`;
        row.style.opacity = 0;
      }

      console.log(`Row ${index + 1} Position:`, rowPosition);
      console.log(`TranslateX: ${row.style.transform}`);
      console.log("row.style.opacity", row.style.opacity);
    });
  };

  window.addEventListener("scroll", updateRowPositions);
  updateRowPositions(); // Initial call
});
