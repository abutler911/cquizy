// Variables for card elements
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");
const cardInner = document.querySelector(".card-inner");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const buttons = document.querySelectorAll(".button-group button");
const categoryElement = cardFront.querySelector(".category");
const questionContextElement = cardFront.querySelector(".context");
const questionElement = cardFront.querySelector(".question");
const answerElement = cardBack.querySelector(".answer");

let currentQuestionIndex = 0;

const messages = [
  "TFAYD",
  "2025 CQ! Let's go!",
  "You're Amazing!",
  "Keep it up!",
  "You're doing great!",
  "Keep at it!",
];

gsap.to(".title", {
  y: -6,
  repeat: -1,
  yoyo: true,
  duration: 0.5,
  ease: "sine.inOut",
});

function loadQuestion(index) {
  if (index >= 0 && index < questions.length) {
    const { category, context, question, answer } = questions[index];
    categoryElement.textContent = category;
    questionContextElement.textContent = `Context: ${context}` || context;
    questionElement.textContent = question;
    answerElement.textContent = answer;

    // Reset the flip state
    cardInner.classList.remove("is-flipped");

    // Animate card entry
    gsap.fromTo(
      cardInner,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  } else {
    categoryElement.textContent = "";
    questionElement.textContent = "No more questions!";
    answerElement.textContent = "End of cards";
  }
}

cardInner.addEventListener("click", () => {
  if (!cardInner.classList.contains("is-flipped")) {
    gsap.to(cardInner, {
      duration: 0.1,
      rotationY: 180,
      scale: 1.1, // Slightly enlarge
      ease: "back.out(1)",
      onComplete: () => {
        cardInner.classList.add("is-flipped");
        gsap.to(cardInner, { scale: 1, duration: 0.2 }); // Reset scale
      },
    });
  } else {
    gsap.to(cardInner, {
      duration: 0.1,
      rotationY: 0,
      scale: 1.1,
      ease: "back.out(1.7)",
      onComplete: () => {
        cardInner.classList.remove("is-flipped");
        gsap.to(cardInner, { scale: 1, duration: 0.2 });
      },
    });
  }
});
// Left arrow functionality
leftArrow.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
});

// Right arrow functionality
rightArrow.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
});

// Function to shuffle questions
function shuffleQuestions() {
  // Add the fade-out class to start the animation
  cardInner.classList.add("fade-out");

  // Wait for the fade-out animation to complete
  setTimeout(() => {
    // Shuffle the questions
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    console.log("Questions shuffled:", questions); // Debugging

    // Load the first question from the shuffled list
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex);

    // Add the fade-in class
    cardInner.classList.remove("fade-out");
    cardInner.classList.add("fade-in");

    // Remove the fade-in class after the animation
    setTimeout(() => {
      cardInner.classList.remove("fade-in");
    }, 500); // Match the fade-in duration
  }, 500); // Match the fade-out duration
}

// Event listener for the randomize button
document
  .getElementById("randomize-btn")
  .addEventListener("click", shuffleQuestions);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    gsap.to(button, { duration: 0.2, scale: 0.9, ease: "power1.inOut" });
    gsap.to(button, {
      duration: 0.2,
      scale: 1,
      delay: 0.2,
      ease: "power1.out",
    });
  });
});

// Randomly show popup messages at the fixed position
function showPopupMessage() {
  const popupMessage = document.querySelector(".popup-message");
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Set the message content
  popupMessage.textContent = randomMessage;

  // Show the popup with animation
  gsap.fromTo(
    popupMessage,
    { display: "none", opacity: 0, scale: 0.8 },
    {
      display: "block",
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Hide the popup after 2 seconds
        gsap.to(popupMessage, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          delay: 2,
          ease: "power2.in",
          onComplete: () => {
            popupMessage.style.display = "none"; // Hide it completely
            popupMessage.textContent = ""; // Clear the text
          },
        });
      },
    }
  );
}

// Trigger the popup randomly every few seconds
setInterval(() => {
  if (Math.random() > 0.2) {
    showPopupMessage();
  }
}, 10000);

// Load the first question
loadQuestion(currentQuestionIndex);
