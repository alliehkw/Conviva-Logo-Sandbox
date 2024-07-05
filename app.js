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
            translateXValue = (1 - rowPosition) * -100;
          } else {
            // Second div slides in from the right side
            translateXValue = (1 - rowPosition) * 100;
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
            div.style.transform = `translateX(${translateXValue}%)`;
            div.style.opacity = adjustedRowPosition;
          } else if (
            scrollPosition > centeredContainerMiddle &&
            scrollPosition <= translateOutStart
          ) {
            // Translation out
            rowPosition =
              (scrollPosition - centeredContainerMiddle) / translateDistance;
            if (divIndex === 0) {
              translateXValue = rowPosition * -100;
            } else {
              translateXValue = rowPosition * 100;
            }
            div.style.transform = `translateX(${translateXValue}%)`;
            div.style.opacity = 1 - rowPosition;
          } else if (scrollPosition < translateInStart) {
            div.style.transform = `translateX(${
              divIndex === 0 ? "-100%" : "100%"
            })`;
            div.style.opacity = 0;
          } else {
            div.style.transform = `translateX(${
              divIndex === 0 ? "-100%" : "100%"
            })`;
            div.style.opacity = 0;
          }

          console.log(`Row 3 Div ${divIndex + 1} Position:`, rowPosition);
          console.log(`TranslateX: ${div.style.transform}`);
          console.log("div.style.opacity", div.style.opacity);
        });
      } else {
        const translateInStart = centeredContainerTop;
        let rowPosition =
          (scrollPosition - translateInStart) / translateDistance;

        let translateXValue;
        let translateYValue;
        let adjustedRowPosition;

        if (index === 0 || index === 1) {
          // .row.one and .row.two slide in from the top right
          translateXValue = (1 - rowPosition) * 100; // Positive value for right to left
          translateYValue = (1 - rowPosition) * -100; // Move from top to original position
        } else {
          // .row.four and .row.five slide in from the bottom left
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
      }
    });
  };

  window.addEventListener("scroll", updateRowPositions);
  updateRowPositions(); // Initial call
});
