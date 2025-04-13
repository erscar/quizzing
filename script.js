// Beispiel-Daten für 8 Fragen
const quizQuestions = [
  {
    question: "Was ist die Hauptstadt von Deutschland?",
    image: "images/berlin.jpg", // Achte darauf, dass der Bildpfad korrekt ist
    answers: ["Berlin", "München", "Hamburg", "Köln"],
    correct: 0
  },
  {
    question: "Welcher Planet ist der rote Planet?",
    image: "images/mars.jpg",
    answers: ["Erde", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  // Weitere 6 Fragen hinzufügen
  // ...
];

// Variablen zur Steuerung des Quiz
let currentQuestionIndex = 0;
let score = 0;
let userName = "";

// DOM-Elemente
const welcomeScreen = document.getElementById("welcome-screen");
const quizContainer = document.getElementById("quiz-container");
const resultScreen = document.getElementById("result-screen");
const questionTitle = document.getElementById("question-title");
const questionImage = document.getElementById("question-image");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const finalScoreEl = document.getElementById("final-score");
const highscoreListEl = document.getElementById("highscore-list");

// Startknopf Event
document.getElementById("start-btn").addEventListener("click", startQuiz);

function startQuiz() {
  userName = document.getElementById("userName").value.trim();
  if (!userName) {
    alert("Bitte gib einen Namen ein!");
    return;
  }
  welcomeScreen.style.display = "none";
  quizContainer.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

// Zeigt die aktuelle Frage mit Bild und Antworten an
function showQuestion() {
  // Frage und Bild setzen
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;
  questionImage.src = currentQuestion.image;
  // Leere vorherige Antworten
  answersContainer.innerHTML = "";
  // Erstelle Buttons für die Antworten
  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

// Überprüft die Auswahl des Nutzers und markiert evtl. richtig/falsch
function selectAnswer(selectedIndex) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  // Deaktiviere weitere Antwortklicks
  Array.from(answersContainer.children).forEach(btn => btn.disabled = true);
  // Highscore: Erhöhe den Punktestand, wenn die Antwort korrekt ist
  if (selectedIndex === currentQuestion.correct) {
    score++;
  }
  // Markierung (zum Beispiel: Farben oder Hinweise, ob richtig/falsch)
  Array.from(answersContainer.children).forEach((btn, index) => {
    if (index === currentQuestion.correct) {
      btn.style.backgroundColor = "lightgreen";
    } else if(index === selectedIndex) {
      btn.style.backgroundColor = "salmon";
    }
  });
  // Zeige den "Nächste Frage"-Button
  nextBtn.style.display = "block";
}

// Event für den "Nächste Frage"-Button
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Endbildschirm und Highscore-Anzeige
function showResult() {
  quizContainer.style.display = "none";
  resultScreen.style.display = "block";
  finalScoreEl.textContent = `${userName}, du hast ${score} von ${quizQuestions.length} Punkten erreicht.`;
  updateHighscore();
  displayHighscore();
}

// Speichert bzw. aktualisiert den Highscore im Local Storage
function updateHighscore() {
  const existingScores = JSON.parse(localStorage.getItem("highscores")) || [];
  // Neuen Eintrag hinzufügen
  existingScores.push({ name: userName, score: score });
  // Optional: sortiere Highscores absteigend und speichere nur die Top 5 oder Top 10
  existingScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highscores", JSON.stringify(existingScores));
}

// Zeigt die Highscore-Liste an
function displayHighscore() {
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscoreListEl.innerHTML = "";
  highscores.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score}`;
    highscoreListEl.appendChild(li);
  });
}

// Neustart des Quiz
document.getElementById("restart-btn").addEventListener("click", () => {
  resultScreen.style.display = "none";
  welcomeScreen.style.display = "block";
});
