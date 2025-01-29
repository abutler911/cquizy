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
const questionNumberElement = document.createElement("div");
questionNumberElement.classList.add("question-number");
cardFront.appendChild(questionNumberElement);

let currentQuestionIndex = 0;
let questions = [];

const messages = [
  "TFAYD",
  "2025 CQ! Let's go!",
  "You're Amazing!",
  "Keep it up!",
  "You're doing great!",
  "Keep at it!",
];

async function fetchQuestions() {
  try {
    const response = await fetch(
      "https://cquizy-api.onrender.com/api/questions",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }

    questions = await response.json();
    if (questions.length > 0) {
      loadQuestion(0);
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function loadQuestion(index) {
  if (index >= 0 && index < questions.length) {
    const { category, context, question, answer } = questions[index];
    categoryElement.textContent = category;
    questionContextElement.textContent = `Context: ${context}` || context;
    questionElement.textContent = question;
    answerElement.textContent = answer;
    questionNumberElement.textContent = `${index + 1} of ${questions.length}`;
    cardInner.classList.remove("is-flipped");

    gsap.fromTo(
      cardInner,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  } else {
    categoryElement.textContent = "";
    questionElement.textContent = "No more questions!";
    answerElement.textContent = "End of cards";
    questionNumberElement.textContent = "";
  }
}

cardInner.addEventListener("click", () => {
  if (!cardInner.classList.contains("is-flipped")) {
    gsap.to(cardInner, {
      duration: 0.05,
      rotationY: 180,
      scale: 1.05,
      ease: "back.out(1)",
      onComplete: () => {
        cardInner.classList.add("is-flipped");
        gsap.to(cardInner, { scale: 1, duration: 0.1 });
      },
    });
  } else {
    gsap.to(cardInner, {
      duration: 0.05,
      rotationY: 0,
      scale: 1.05,
      ease: "back.out(1.7)",
      onComplete: () => {
        cardInner.classList.remove("is-flipped");
        gsap.to(cardInner, { scale: 1, duration: 0.1 });
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

fetchQuestions();
