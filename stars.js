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

  // Generate Comets
  const createComet = () => {
    const comet = document.createElement("div");
    comet.className = "comet";

    // Random starting point
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    comet.style.left = `${startX}px`;
    comet.style.top = `${startY}px`;

    // Append comet to the starfield
    starfield.appendChild(comet);

    // Remove the comet after animation
    setTimeout(() => {
      starfield.removeChild(comet);
    }, 5000); // Match animation duration
  };

  // Create initial stars
  createStars(150);

  // Add comets occasionally
  setInterval(() => {
    if (Math.random() < 0.3) {
      createComet();
    }
  }, 3000); // Try every 3 seconds
});
