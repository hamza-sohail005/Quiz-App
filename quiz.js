const questions = [
  {
    question: "Which planet has the most moons?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 3
  },
  
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correct: 2
  },

  {
    question: "Which element has the chemical symbol 'Fe'?",
    options: ["Fluorine", "Iron", "Zinc", "Lead"],
    correct: 1
  },

  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2
  },

  {
    question: "Which country has the largest population?",
    options: ["USA", "India", "China", "Indonesia"],
    correct: 1
  },

  {
    question: "What is the smallest bone in the human body?",
    options: ["Stapes", "Femur", "Ulna", "Tibia"],
    correct: 0
  },

  {
    question: "Which gas is most abundant in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: 2
  },

  {
    question: "Who was the first person to reach the South Pole?",
    options: ["Robert Scott", "Roald Amundsen", "Ernest Shackleton", "Edmund Hillary"],
    correct: 1
  },

  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Thailand", "Japan", "South Korea"],
    correct: 2
  },

  {
    question: "What is the currency of Switzerland?",
    options: ["Euro", "Franc", "Dollar", "Pound"],
    correct: 1
  }
];

let currentQuestion = 0;

function render_questions(){
  if(currentQuestion == questions.length){
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').style.display = 'flex';
    return; 
  }
   let getQuestion = questions[currentQuestion];

   // copy + shuffle (original afe)
   let shuffuledOptions = shuffle([...getQuestion.options]);

   document.getElementById('quiz-screen').classList.remove('hidden');
   document.getElementById('quiz-screen').style.display = 'flex';
   document.getElementById('start-screen').classList.add('hidden');

   // options dynamically generate 
   let optionsHtml = "";
   shuffuledOptions.forEach((opt, index) => {
      optionsHtml += `
        <button class="option-btn" data-index="${index}">
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${opt}</span>
        </button>
      `;
   });

   let renderHtml = `
        <div class="question-number-tag">Q<span id="q-num">${currentQuestion + 1}</span></div>
        <h2 class="question-text">
            ${getQuestion.question}
        </h2>

        <div class="options-grid">
            ${optionsHtml}
        </div>

        <!-- Feedback -->
        <div class="feedback correct-feedback" id="feedback" style="display:none">
            <span class="feedback-icon">&#10004;</span>
            <span id="feedback-text">Correct! Well done!</span>
        </div>
   `;

   document.getElementById('question-card').innerHTML = renderHtml;
   currentQuestion = currentQuestion + 1;
}

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
