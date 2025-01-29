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
    cardInner.classList.remove("is-flipped");

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
      scale: 1.1,
      ease: "back.out(1)",
      onComplete: () => {
        cardInner.classList.add("is-flipped");
        gsap.to(cardInner, { scale: 1, duration: 0.2 });
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

leftArrow.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
});

rightArrow.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
});

function shuffleQuestions() {
  cardInner.classList.add("fade-out");
  setTimeout(() => {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex);
    cardInner.classList.remove("fade-out");
    cardInner.classList.add("fade-in");
    setTimeout(() => cardInner.classList.remove("fade-in"), 500);
  }, 500);
}

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

loadQuestion(currentQuestionIndex);
