// Variables for card elements
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");
const cardInner = document.querySelector(".card-inner");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

const categoryElement = cardFront.querySelector(".category");
const questionElement = cardFront.querySelector(".question");
const answerElement = cardBack.querySelector(".answer");

let currentQuestionIndex = 0;

// Load a question onto the card
function loadQuestion(index) {
  if (index >= 0 && index < questions.length) {
    const { category, question, answer } = questions[index];
    categoryElement.textContent = category;
    questionElement.textContent = question;
    answerElement.textContent = answer;

    // Reset the flip state when loading a new question
    cardInner.classList.remove("is-flipped");
  } else {
    categoryElement.textContent = "";
    questionElement.textContent = "No more questions!";
    answerElement.textContent = "End of cards";
  }
}

// Flip the card on click
cardInner.addEventListener("click", () => {
  cardInner.classList.toggle("is-flipped");
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

// Load the first question
loadQuestion(currentQuestionIndex);
