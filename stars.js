function createShootingStar() {
  const shootingStarsContainer = document.querySelector(".shooting-stars");

  // Create a star element
  const star = document.createElement("div");
  star.classList.add("star");

  // Randomize the starting position
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;

  // Randomize the ending position and direction
  const endX = (Math.random() - 0.5) * 2000; // Range: -1000 to 1000px
  const endY = (Math.random() - 0.5) * 2000; // Range: -1000 to 1000px

  // Randomize size and brightness
  const scale = Math.random() * 0.5 + 0.5; // Range: 0.5 to 1
  const brightness = Math.random() * 0.8 + 0.2; // Range: 0.2 to 1

  // Randomize animation timing
  const delay = Math.random() * 5; // Up to 5 seconds delay
  const duration = Math.random() * 3 + 2; // Between 2-5 seconds duration

  // Set styles for the star
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;
  star.style.setProperty("--end-x", `${endX}px`);
  star.style.setProperty("--end-y", `${endY}px`);
  star.style.setProperty("--scale", scale);
  star.style.animationDelay = `${delay}s`;
  star.style.animationDuration = `${duration}s`;
  star.style.opacity = brightness;

  // Add the star to the container
  shootingStarsContainer.appendChild(star);

  // Remove the star after the animation
  setTimeout(() => {
    shootingStarsContainer.removeChild(star);
  }, (delay + duration) * 1000);
}

// Generate stars at intervals (more frequent and random)
setInterval(() => {
  const starCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 stars at a time
  for (let i = 0; i < starCount; i++) {
    createShootingStar();
  }
}, 800); // New stars every 800ms
