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

    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    // Random angle and distance
    const angle = Math.random() * 360; // Angle in degrees
    const distance = Math.random() * 500 + 300; // Random distance (300–800px)

    // Calculate end position using trigonometry
    const endX = startX + distance * Math.cos((angle * Math.PI) / 180);
    const endY = startY + distance * Math.sin((angle * Math.PI) / 180);

    // Set starting position
    comet.style.left = `${startX}px`;
    comet.style.top = `${startY}px`;

    // Animate the comet
    const cometAnimation = comet.animate(
      [
        { transform: `translate(0, 0)`, opacity: 1 },
        {
          transform: `translate(${endX - startX}px, ${endY - startY}px)`,
          opacity: 0,
        },
      ],
      {
        duration: 3000, // Duration in ms
        easing: "ease-out",
        fill: "forwards",
      }
    );

    // Remove the comet after animation
    cometAnimation.onfinish = () => {
      comet.remove();
    };

    starfield.appendChild(comet);
  };

  // Create initial stars
  createStars(150);

  // Add comets at regular intervals
  setInterval(() => {
    if (Math.random() < 0.6) {
      // 60% chance to create a comet
      createComet();
    }
  }, 1500); // Try every 1.5 seconds
});
