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

    console.log("Scroll Position:", scrollPosition);
    console.log("Centered Container Top:", centeredContainerTop);
    console.log("Centered Container Middle:", centeredContainerMiddle);
    console.log("Row Five Bottom:", rowFiveBottom);
    console.log("Translate Out Start:", translateOutStart);
    console.log("Translate Distance:", translateDistance);

    rows.forEach((row, index) => {
      const translateInStart = centeredContainerTop;
      let rowPosition = (scrollPosition - translateInStart) / translateDistance;

      if (
        scrollPosition >= translateInStart &&
        scrollPosition <= centeredContainerMiddle
      ) {
        // Translation in
        row.style.transform = `translateX(${(1 - rowPosition) * -100}%)`;
        row.style.opacity = rowPosition;
      } else if (
        scrollPosition > centeredContainerMiddle &&
        scrollPosition <= translateOutStart
      ) {
        // Translation out
        rowPosition =
          (scrollPosition - centeredContainerMiddle) / translateDistance;
        row.style.transform = `translateX(${rowPosition * -100}%)`;
        row.style.opacity = 1 - rowPosition;
      } else if (scrollPosition < translateInStart) {
        row.style.transform = `translateX(-100%)`;
        row.style.opacity = 0;
      } else {
        row.style.transform = `translateX(-100%)`;
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
