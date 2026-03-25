// ================= SCORE SYSTEM =================
let score = localStorage.getItem('score') || 0;

if (document.getElementById('score')) {
  document.getElementById('score').innerText = score;
}

// ================= TEXT TO SPEECH =================
function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'zh-CN';
  speech.rate = 0.9;
  speechSynthesis.speak(speech);
}

// ================= QUIZ DATA =================
const quizData = [
  {
    question: "What is 你好?",
    answers: ["Hello", "Goodbye"],
    correct: 0
  },
  {
    question: "What is 谢谢?",
    answers: ["Sorry", "Thank you"],
    correct: 1
  },
  {
    question: "What is 再见?",
    answers: ["Goodbye", "Hello"],
    correct: 0
  }
];

let current = 0;

// ================= LOAD QUIZ =================
function loadQuiz() {
  if (!document.getElementById('question')) return;

  let q = quizData[current];
  document.getElementById('question').innerText = q.question;

  let html = '';
  q.answers.forEach((ans, index) => {
    html += `<button onclick="checkAnswer(${index})">${ans}</button>`;
  });

  document.getElementById('answers').innerHTML = html;
}

// ================= CHECK ANSWER =================
function checkAnswer(index) {
  if (index === quizData[current].correct) {
    score++;
    localStorage.setItem('score', score);
    document.getElementById('result').innerText = "✅ Correct!";
  } else {
    document.getElementById('result').innerText = "❌ Wrong!";
  }

  current++;

  if (current < quizData.length) {
    setTimeout(loadQuiz, 1000);
  } else {
    document.getElementById('question').innerText = "🎉 Finished!";
    document.getElementById('answers').innerHTML = "";
  }
}

// ================= AUTO START =================
loadQuiz();