document.addEventListener("DOMContentLoaded", () => {
  const starfield = document.querySelector(".starfield");

  // Generate Static Stars
  const createStars = (numStars) => {
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Random position for the star
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      // Random size for variation
      const size = Math.random() * 2 + 1; // Between 1px and 3px
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      starfield.appendChild(star);
    }
  };

  // Create initial stars
  createStars(450);
});
