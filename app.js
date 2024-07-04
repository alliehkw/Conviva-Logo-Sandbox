document.addEventListener("scroll", () => {
  const hiddenElements = document.querySelectorAll(".hidden");
  const container = document.querySelector(".block-container");
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;

  hiddenElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const topPosition = rect.top + scrollY; // Get the element's top position relative to the document

    // Show the element if it's within the viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }

    // Apply translation only if the element has the show class
    if (el.classList.contains("show")) {
      const translateAmount = Math.min(
        1,
        (scrollY - topPosition + windowHeight) / windowHeight
      );

      if (el.classList.contains("row") && el.classList.contains("one")) {
        // Translate from right to center
        el.style.transform = `translateX(${(1 - translateAmount) * 100}%)`;
      } else if (el.classList.contains("row") && el.classList.contains("two")) {
        // Translate from right to 55px from center
        el.style.transform = `translateX(${
          (1 - translateAmount) * 100
        }%) translateX(55px)`;
      } else if (
        el.classList.contains("row") &&
        el.classList.contains("three")
      ) {
        // Translate from right to center
        el.style.transform = `translateX(${(1 - translateAmount) * 100}%)`;
      } else if (
        el.classList.contains("row") &&
        el.classList.contains("four")
      ) {
        // Translate from left to 55px from center
        el.style.transform = `translateX(${
          -(1 - translateAmount) * 100
        }%) translateX(55px)`;
      } else if (
        el.classList.contains("row") &&
        el.classList.contains("five")
      ) {
        // Translate from left to center
        el.style.transform = `translateX(${-(1 - translateAmount) * 100}%)`;
      }
      // Add more conditions here for other rows if needed
    }
  });

  // Check if the block-container's center is in the viewport's center
  const containerRect = container.getBoundingClientRect();
  const containerCenter =
    containerRect.top + scrollY + containerRect.height / 2;
  const viewportCenter = scrollY + windowHeight / 2;

  // If the container's center is within the viewport's center, make it sticky
  if (Math.abs(containerCenter - viewportCenter) < 1) {
    container.classList.add("sticky");
  } else {
    container.classList.remove("sticky");
  }
});
