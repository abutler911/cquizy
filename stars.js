document.addEventListener("DOMContentLoaded", () => {
  const starfield = document.querySelector(".starfield");

  // Generate Stars with Color Variation
  const createStars = (numStars) => {
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Random position for the star
      const x = Math.random() * 100; // Horizontal position
      const y = Math.random() * 100; // Vertical position
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;

      // Random size for variation
      const size = Math.random() * 2 + 1; // Between 1px and 3px
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // Add slight color variation
      const hue = Math.random() * 360; // Random hue (0-360)
      star.style.backgroundColor = `hsl(${hue}, 70%, 80%)`;
      star.style.boxShadow = `0 0 10px hsl(${hue}, 70%, 60%)`;

      // Append the star to the starfield
      starfield.appendChild(star);

      // Add GSAP animations for twinkling
      gsap.fromTo(
        star,
        { opacity: Math.random() * 0.5 + 0.5 }, // Random initial opacity (0.5–1)
        {
          opacity: Math.random() * 0.5 + 0.5, // Random final opacity (0.5–1)
          duration: Math.random() * 2 + 1, // Random duration (1–3 seconds)
          repeat: -1, // Infinite loop
          yoyo: true, // Alternate between start and end values
          ease: "power1.inOut",
        }
      );
    }
  };

  // Create Shooting Stars
  const createShootingStar = () => {
    const shootingStar = document.createElement("div");
    shootingStar.className = "shooting-star";

    // Random start position and trajectory
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.5; // Top half of the screen
    const endX = startX + Math.random() * 200 - 100; // Slight horizontal variation
    const endY = startY + Math.random() * 300 + 100; // Downward diagonal

    // Random size and speed
    const size = Math.random() * 4 + 2; // Between 2px and 6px
    const duration = Math.random() * 1.5 + 0.5; // Between 0.5s and 2s
    shootingStar.style.width = `${size}px`;
    shootingStar.style.height = `${size / 2}px`; // Slightly elongated shape

    shootingStar.style.left = `${startX}px`;
    shootingStar.style.top = `${startY}px`;

    // Append the shooting star to the starfield
    starfield.appendChild(shootingStar);

    // Animate the shooting star
    gsap.fromTo(
      shootingStar,
      { opacity: 1 },
      {
        opacity: 0,
        x: endX - startX,
        y: endY - startY,
        duration: duration,
        ease: "power1.out",
        onComplete: () => {
          shootingStar.remove(); // Remove the element after the animation
        },
      }
    );

    // Add a trail effect
    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.width = `${size * 10}px`; // Trail length proportional to the star size
    trail.style.height = `${size / 4}px`; // Thin trail
    trail.style.left = `${startX}px`;
    trail.style.top = `${startY}px`;

    starfield.appendChild(trail);

    // Animate the trail
    gsap.fromTo(
      trail,
      { opacity: 0.5 },
      {
        opacity: 0,
        x: endX - startX,
        y: endY - startY,
        duration: duration,
        ease: "power1.out",
        onComplete: () => {
          trail.remove(); // Remove the trail after the animation
        },
      }
    );
  };

  // Create initial stars
  createStars(450);

  // Periodically create shooting stars
  setInterval(createShootingStar, 15000); // Every 2 seconds
});
