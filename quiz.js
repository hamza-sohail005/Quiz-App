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

  let userResult = [];

  let currentQuestion = 0;
  let timerInterval = null;
  let timeLeft = 15;

  localStorage.clear();

  function render_questions(){
    if(currentQuestion == questions.length){      // yeh check krrha hai kah agr 10 questions hogai to results show karwado 
      clearInterval(timerInterval);               // time interval ko rukny ky liye clear interval use hota hai
      show_results();
      return;
    }
    document.getElementById('current-q').innerHTML = currentQuestion + 1;  // questions increase hoty hain ismai (1-10)

    let getQuestion = questions[currentQuestion];

    // copy + shuffle (original afe)
    let shuffuledOptions = shuffle([...getQuestion.options]);        // shuffling of options 

    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').style.display = 'flex';         // to show the quiz screen only
    document.getElementById('start-screen').classList.add('hidden');

    // options dynamically generate 
    let optionsHtml = "";
    shuffuledOptions.forEach((opt, index) => {
      optionsHtml += `
        <button class="option-btn" data-index="${index}" onclick="validateAnswer('${opt}', ${currentQuestion})">
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
          <div class="feedback correct-feedback" id="correct_feedback_${currentQuestion}" style="display:none">
              <span class="feedback-icon">&#10004;</span>
              <span id="feedback-text">Correct! Well done!</span>
          </div>

          <div class="feedback wrong-feedback" id="wrong_feedback_${currentQuestion}" style="display:none">
              <span class="feedback-icon">&#10006;</span>
              <span id="feedback-text">Wrong answer!</span>
          </div>
    `;

    document.getElementById('question-card').innerHTML = renderHtml;
    currentQuestion = currentQuestion + 1;             // move to the next question 

    startTimer(currentQuestion - 1);     // previous index pass hota hai (because increment ho chuka)
  }

  function startTimer(questionIndex) {
    clearInterval(timerInterval);
    timeLeft = 15;

    let timerEl = document.getElementById('timer');
    let timerCircle = document.querySelector('.timer-circle');

    timerEl.textContent = timeLeft;
    timerCircle.classList.remove('warning', 'danger');

    timerInterval = setInterval(() => {           // main logic of this timmer
      timeLeft--;
      timerEl.textContent = timeLeft;

      timerCircle.classList.remove('warning', 'danger');  // addition of colors
      if (timeLeft <= 5) {
        timerCircle.classList.add('danger');
      } else if (timeLeft <= 8) {
        timerCircle.classList.add('warning');
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);       // to stop the timer
        handleTimeout(questionIndex);
      }
    }, 1000);
  }

  function handleTimeout(questionIndex) {
    let questionObj = questions[questionIndex];
    let correctAnswerText = questionObj.options[questionObj.correct];

    let resultData = {
      questionIndex: questionIndex,
      selected: null,                                 //   Agar user time pe answer nahi deta to unanswered 
      correct: correctAnswerText,                       //     bhi wrong considered hoga
      isCorrect: false,
      score: 0,
      skipped: true
    };

    userResult.push(resultData);
    localStorage.setItem('userResult', JSON.stringify(userResult));

    // disable all options to prevent clicks after timeout
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    setTimeout(() => render_questions(), 1000);
  }

  function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function validateAnswer(selectedOption, currentQuestionIndex) {
    clearInterval(timerInterval);
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    let questionObj = questions[currentQuestionIndex];

    // get correct answer text
    let correctAnswerText = questionObj.options[questionObj.correct];

    // create result object (DON'T mutate original)
    let resultData = {
      questionIndex: currentQuestionIndex,
      selected: selectedOption,
      correct: correctAnswerText,
      isCorrect: selectedOption === correctAnswerText
    };

    // show feedback
    if(resultData.isCorrect){
      document.getElementById(`correct_feedback_${currentQuestionIndex}`).style.display = 'block';
      resultData['score'] = 10;
    } else {
      document.getElementById(`wrong_feedback_${currentQuestionIndex}`).style.display = 'block';
      resultData['score'] = 0;
    }

    // store in array
    userResult.push(resultData);

    // store in localStorage (proper way)
    localStorage.setItem('userResult', JSON.stringify(userResult));
    document.getElementById('score').innerHTML = userResult.reduce((acc, curr) => acc + curr.score, 0);

    // move to next question after delay
    setTimeout(() => {
      render_questions();
    }, 2000);
  }

  function show_results() {
    let correctCount = userResult.filter(r => r.isCorrect).length;
    let wrongCount   = userResult.filter(r => !r.isCorrect).length;
    let totalScore   = userResult.reduce((acc, curr) => acc + curr.score, 0);
    let percentage   = (correctCount / questions.length) * 100;

    document.getElementById('final-score').textContent  = totalScore;
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('wrong-count').textContent   = wrongCount;

    let icon, title, subtitle;
    if (percentage === 100) {
      icon = '🏆'; title = 'Perfect!';        subtitle = 'A flawless performance!';
    } else if (percentage >= 70) {
      icon = '🎉'; title = 'Excellent!';      subtitle = 'You really know your stuff!';
    } else if (percentage >= 50) {
      icon = '👍'; title = 'Good Job!';       subtitle = 'Keep practicing!';
    } else {
      icon = '📚'; title = 'Keep Studying!';  subtitle = 'You can do better next time!';
    }

    document.getElementById('result-icon').textContent    = icon;
    document.getElementById('result-title').textContent   = title;
    document.getElementById('result-subtitle').textContent = subtitle;

    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').style.display = 'flex';
  }

  function playAgain() {
    userResult      = [];
    currentQuestion = 0;
    clearInterval(timerInterval);
    localStorage.clear();

    document.getElementById('score').innerHTML = 0;
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('review-screen').classList.add('hidden');

    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('start-screen').style.display = 'flex';
  }

  function showReview() {
    let stored = JSON.parse(localStorage.getItem('userResult')) || [];

    let reviewHtml = stored.map((result, i) => {
      let q           = questions[result.questionIndex];
      let statusClass = result.isCorrect ? 'correct' : (result.skipped ? 'skipped' : 'wrong');
      let statusLabel = result.isCorrect ? '&#10004; Correct' : (result.skipped ? '&#9201; Timed Out' : '&#10006; Wrong');

      return `
        <div class="review-item review-${statusClass}">
          <div class="review-header">
            <span class="review-q-num">Q${i + 1}</span>
            <span class="review-badge review-badge-${statusClass}">${statusLabel}</span>
          </div>
          <p class="review-question">${q.question}</p>
          <div class="review-answers">
            <div class="review-answer review-your review-your-${statusClass}">
              <span class="review-label">Your Answer</span>
              <span class="review-value">${result.selected || '— (no answer)'}</span>
            </div>
            ${!result.isCorrect ? `
            <div class="review-answer review-correct-ans">
              <span class="review-label">Correct Answer</span>
              <span class="review-value">${result.correct}</span>
            </div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('review-list').innerHTML = reviewHtml;

    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('review-screen').classList.remove('hidden');
    document.getElementById('review-screen').style.display = 'flex';
  }
