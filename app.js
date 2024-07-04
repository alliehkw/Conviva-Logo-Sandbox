document.addEventListener("DOMContentLoaded", function () {
  const centeredElement = document.querySelector(".centered-container");
  const rows = document.querySelectorAll(".row");

  if (!centeredElement || !rows.length) {
    console.error("Centered element or rows not found");
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Adjust this value to detect when the element is in the center
  };

  let rowsVisible = false;
  let transitioningIn = false;

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!rowsVisible && !transitioningIn) {
          transitioningIn = true;
          rows.forEach((row) => {
            row.style.transform = `translateX(0)`;
            row.style.opacity = 1;
          });
          setTimeout(() => {
            transitioningIn = false;
            rowsVisible = true;
          }, 500); // Match this duration to your CSS transition duration
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(centeredElement);

  window.addEventListener("scroll", () => {
    if (rowsVisible && !transitioningIn) {
      const centeredElementRect = centeredElement.getBoundingClientRect();
      const bufferHeight = window.innerHeight / 2;
      const scrollPosition = window.scrollY + bufferHeight;

      // Check if the scroll position has moved past the center element
      if (
        scrollPosition > centeredElementRect.bottom ||
        scrollPosition < centeredElementRect.top
      ) {
        rows.forEach((row) => {
          row.style.transform = `translateX(-100%)`;
          row.style.opacity = 0;
        });
        rowsVisible = false;
      }
    }
  });
});
