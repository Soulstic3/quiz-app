// Array de perguntas e respostas
const questions = [
  {
    question: "Which of this animals are not a mammal?",
    answers: [
      { text: "Cat", correct: false },
      { text: "Crocodile", correct: true },
      { text: "Blue Whale", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is biggest city in the world?",
    answers: [
      { text: "Tokyo", correct: true },
      { text: "São Paulo", correct: false },
      { text: "Dheli", correct: false },
      { text: "Dhaka", correct: false },
    ],
  },
  {
    question: "Which of this is the larger continent?",
    answers: [
      { text: "Antartica", correct: false },
      { text: "America", correct: false },
      { text: "Asia", correct: true },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which year the men landed on the moon?",
    answers: [
      { text: "1967", correct: false },
      { text: "1969", correct: true },
      { text: "1970", correct: false },
      { text: "1964", correct: false },
    ],
  },
];

// Pegando elementos da pagina
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// variaveis para definir a pergunta e marcar pontuação
let currentQuestionIndex = 0;
let score = 0;

// função para iniciar quiz, reseta o score e o currentQuestionIndex, define o texto do botão next e chama função showQuestion
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// função para exibir proxima pergunta, chama a função reset state, pega a pergunta do array e aumenta o currentIndex, usa innerHTML para escrever exibir a pergunta
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // passa pelo array de perguntas pegando as respostas e criando um botão para cada uma
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      // pega do array se a resposta esta correta ou não
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer); // chama a função selectAnswer para o botão clicado
  });
}

// função para esconder o botão next e as respostas da ultima pergunta
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// função que adiciona uma classe para o botão clicado baseado no valor "correct" do array
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct"); // adiciona background: #9aeabc;
    score++; // Aumenta score
  } else {
    selectedBtn.classList.add("incorrect"); // adiciona background: #ff9393;
  }
  Array.from(answerButtons.children).forEach((button) => { // percore por todos os botoes e adiciona o correto para caso o usuario erre a pergunta
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // desativa o botão para não poder mudar a resposta
  });
  nextButton.style.display = "block"; // exibe botao next
}

// função para exibir o score uma vez que o usuario responde todas as perguntas
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again!"; // muda o texto do botão next
  nextButton.style.display = "block";
}

//  ao clicar no botão next aumenta o currentIndex e chama a proxima pergunta se tiver ou exibe o score
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// se não ouver mais perguntas recomeça o quiz
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// inicia o quiz ao abrir a pagina
startQuiz();
