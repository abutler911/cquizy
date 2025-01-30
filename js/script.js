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

// Get status message elements
const loadingBarContainer = document.getElementById("loading-bar-container");
const loadingBar = document.getElementById("loading-bar");
const loadingMessage = document.getElementById("loading-message"); // Fix: Define loadingMessage
const shufflingMessage = document.getElementById("shuffling-message");

// Hide messages initially
shufflingMessage.style.display = "none";
loadingBarContainer.style.display = "none";

let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestions() {
  loadingBarContainer.style.display = "block"; // Show loading bar
  loadingMessage.style.display = "block";
  loadingBar.style.width = "0%";

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    loadingBar.style.width = `${progress}%`;
    if (progress >= 100) clearInterval(interval);
  }, 200);

  try {
    const response = await fetch(
      "https://cquizy-api.onrender.com/api/questions",
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }

    questions = await response.json();
    clearInterval(interval);
    loadingBar.style.width = "100%";

    setTimeout(() => {
      loadingBarContainer.style.display = "none";
      loadingMessage.style.display = "none";
    }, 500);

    if (questions.length > 0) {
      loadQuestion(0);
    } else {
      questionElement.textContent = "No questions available.";
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    loadingMessage.textContent = "Error loading questions!";
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

function flipCardBack(callback) {
  if (cardInner.classList.contains("is-flipped")) {
    gsap.to(cardInner, {
      duration: 0.2,
      rotationY: 0,
      scale: 1,
      ease: "power2.out",
      onComplete: () => {
        cardInner.classList.remove("is-flipped");
        if (callback) callback();
      },
    });
  } else if (callback) {
    callback();
  }
}

cardInner.addEventListener("click", () => {
  if (!cardInner.classList.contains("is-flipped")) {
    gsap.to(cardInner, {
      duration: 0.1,
      rotationY: 180,
      scale: 1.05,
      ease: "back.out(1)",
      onComplete: () => {
        cardInner.classList.add("is-flipped");
        gsap.to(cardInner, { scale: 1, duration: 0.1 });
      },
    });
  } else {
    flipCardBack();
  }
});

leftArrow.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    flipCardBack(() => {
      currentQuestionIndex--;
      loadQuestion(currentQuestionIndex);
    });
  }
});

rightArrow.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    flipCardBack(() => {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    });
  }
});

function shuffleQuestions() {
  flipCardBack(() => {
    shufflingMessage.style.display = "block";

    setTimeout(() => {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      currentQuestionIndex = 0;
      loadQuestion(currentQuestionIndex);

      shufflingMessage.style.display = "none";
    }, 1000);
  });
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
