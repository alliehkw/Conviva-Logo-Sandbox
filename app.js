document.addEventListener("scroll", () => {
  const rows = document.querySelectorAll(".row");
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;

  const firstRow = rows[0];
  const firstRowRect = firstRow.getBoundingClientRect();
  const firstRowTop = firstRowRect.top + scrollY;
  const viewportTop = 0; // Top of the viewport

  // Make rows visible as soon as they come into the viewport
  rows.forEach((row) => {
    const rect = row.getBoundingClientRect();
    if (rect.top < windowHeight && rect.bottom > 0) {
      row.classList.add("show");
    } else {
      row.classList.remove("show");
    }
  });

  // Set initial top offset for each row once
  rows.forEach((row) => {
    if (!row.dataset.initialTop) {
      row.dataset.initialTop = row.getBoundingClientRect().top + window.scrollY;
    }
  });

  // Make all rows sticky when the first row reaches the top of the viewport
  if (firstRowRect.top <= viewportTop) {
    rows.forEach((row) => {
      row.style.position = "sticky";
      row.style.top = `${parseFloat(row.dataset.initialTop) - firstRowTop}px`;
    });
  }

  // Translate rows horizontally based on scroll position
  rows.forEach((row) => {
    const elementTop = parseFloat(row.dataset.initialTop);
    const translateAmount = Math.min(
      1,
      (scrollY - elementTop + windowHeight) / windowHeight
    );

    // Apply translation if the row is visible
    if (row.classList.contains("show")) {
      if (row.classList.contains("one")) {
        row.style.transform = `translateX(${(1 - translateAmount) * 100}%)`;
      } else if (row.classList.contains("two")) {
        row.style.transform = `translateX(${
          (1 - translateAmount) * 100
        }%) translateX(55px)`;
      } else if (row.classList.contains("three")) {
        row.style.transform = `translateX(${(1 - translateAmount) * 100}%)`;
      } else if (row.classList.contains("four")) {
        row.style.transform = `translateX(${
          -(1 - translateAmount) * 100
        }%) translateX(-55px)`;
      } else if (row.classList.contains("five")) {
        row.style.transform = `translateX(${-(1 - translateAmount) * 100}%)`;
      }
    } else {
      row.style.transform = `translateX(0)`; // Reset translation when not visible
    }
  });
});
