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

    rows.forEach((row, index) => {
      const translateInStart = centeredContainerTop;
      const translateOutStart = centeredContainerMiddle;
      const translateDistance = translateOutStart - translateInStart;

      let rowPosition = (scrollPosition - translateInStart) / translateDistance;

      if (
        scrollPosition >= translateInStart &&
        scrollPosition <= translateOutStart
      ) {
        // Translation in
        row.style.transform = `translateX(${(1 - rowPosition) * -100}%)`;
        row.style.opacity = rowPosition;
      } else if (
        scrollPosition > translateOutStart &&
        scrollPosition <= translateOutStart + translateDistance
      ) {
        // Translation out
        rowPosition = (scrollPosition - translateOutStart) / translateDistance;
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
