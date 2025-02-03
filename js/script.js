// DOM Elements
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
const bookmarkButton = document.querySelector(".bookmark-btn");
const reviewLaterButton = document.getElementById("review-later-btn");

// Status Messages
const spinnerContainer = document.getElementById("spinner-container");
const shufflingMessage = document.getElementById("shuffling-message");

// Hide initially
spinnerContainer.style.display = "none";
shufflingMessage.style.display = "none";

// State Management
let currentQuestionIndex = 0;
let questions = [];
let bookmarkedQuestions =
  JSON.parse(localStorage.getItem("bookmarkedQuestions")) || [];
let reviewingBookmarks = false;

/* ==========================
   ✅ Fetch Questions from API 
   ========================== */
async function fetchQuestions() {
  spinnerContainer.style.display = "flex"; // Show loading spinner

  try {
    const response = await fetch(
      "https://cquizy-api.onrender.com/api/questions",
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch questions: ${response.statusText}`);

    questions = await response.json();
    spinnerContainer.style.display = "none"; // Hide loading spinner

    if (questions.length > 0) {
      loadQuestion(0);
    } else {
      questionElement.textContent = "No questions available.";
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    spinnerContainer.style.display = "none";
  }
}

/* ==========================
   ✅ Load Question 
   ========================== */
function loadQuestion(index) {
  if (index < 0 || index >= questions.length) {
    questionElement.textContent = "No more questions!";
    answerElement.textContent = "End of cards";
    questionNumberElement.textContent = "";
    return;
  }

  const { _id, category, context, question, answer } = questions[index];

  categoryElement.textContent = category;
  questionContextElement.textContent = context ? `Context: ${context}` : "";
  questionElement.textContent = question;
  answerElement.textContent = answer;
  questionNumberElement.textContent = `${index + 1} of ${questions.length}`;

  cardInner.classList.remove("is-flipped");

  updateBookmarkIcon(_id);
}

/* ==========================
   ✅ Flip Card Logic
   ========================== */
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

/* ==========================
   ✅ Navigation Controls
   ========================== */
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

/* ==========================
   ✅ Shuffle Questions
   ========================== */
function shuffleQuestions() {
  flipCardBack(() => {
    shufflingMessage.style.display = "block";

    setTimeout(() => {
      questions.sort(() => Math.random() - 0.5);
      currentQuestionIndex = 0;
      loadQuestion(currentQuestionIndex);
      shufflingMessage.style.display = "none";
    }, 1000);
  });
}

document
  .getElementById("randomize-btn")
  .addEventListener("click", shuffleQuestions);

/* ==========================
   ✅ Bookmark Functionality 
   ========================== */
function toggleBookmark(event) {
  event.stopPropagation(); // Prevents card flipping

  const currentQuestionId = questions[currentQuestionIndex]._id;

  if (bookmarkedQuestions.includes(currentQuestionId)) {
    bookmarkedQuestions = bookmarkedQuestions.filter(
      (id) => id !== currentQuestionId
    );
  } else {
    bookmarkedQuestions.push(currentQuestionId);
  }

  localStorage.setItem(
    "bookmarkedQuestions",
    JSON.stringify(bookmarkedQuestions)
  );
  updateBookmarkIcon(currentQuestionId);
}

function updateBookmarkIcon(questionId) {
  if (bookmarkedQuestions.includes(questionId)) {
    bookmarkButton.classList.add("active");
  } else {
    bookmarkButton.classList.remove("active");
  }
}

bookmarkButton.addEventListener("click", toggleBookmark);

/* ==========================
   ✅ Review Bookmarked Questions
   ========================== */
let fullQuestionSet = [];

function showBookmarkedQuestions() {
  if (!reviewingBookmarks) {
    fullQuestionSet = [...questions]; // Store full set
    questions = questions.filter((q) => bookmarkedQuestions.includes(q._id));
    reviewLaterButton.textContent = "Back to All";
    reviewingBookmarks = true;
  } else {
    questions = [...fullQuestionSet]; // Restore full set
    reviewLaterButton.textContent = "Review Later";
    reviewingBookmarks = false;
  }
  currentQuestionIndex = 0;
  loadQuestion(currentQuestionIndex);
}

reviewLaterButton.addEventListener("click", showBookmarkedQuestions);

/* ==========================
   ✅ Button Animations
   ========================== */
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

/* ==========================
   ✅ Initialize App
   ========================== */
fetchQuestions();
