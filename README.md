# 🧠 Quiz App

An interactive, timer-based quiz application built with vanilla HTML, CSS, and JavaScript. Answer 10 general-knowledge questions, race the clock, and review your results at the end.

## 🚀 Live Demo

**[https://onlinequizz-app.netlify.app/](https://onlinequizz-app.netlify.app/)**

## ✨ Features

- **10 general-knowledge questions** covering science, geography, history, and art
- **15-second countdown timer** per question, with visual warning/danger states as time runs low
- **Randomized answer options** — choices are shuffled on every render
- **Live score tracking** displayed throughout the quiz
- **Instant feedback** after each answer (correct/incorrect)
- **Results summary** with a performance message based on your score
- **Answer review screen** showing your selected answer vs. the correct one for every question
- **Play again** functionality to restart the quiz at any time
- Fully responsive, single-page experience with no backend or build step required

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

## 📂 Project Structure

```
Quiz-App/
├── index.html   # App markup and screen layout
├── quiz.css     # Styling
├── quiz.js      # Quiz logic, timer, scoring, and review
└── README.md
```

## 💻 Running Locally

No build tools or dependencies are required.

```bash
git clone https://github.com/hamza-sohail005/Quiz-App.git
cd Quiz-App
```

Then simply open `index.html` in your browser, or serve it with a lightweight local server:

```bash
npx serve .
```

## 📦 Deployment

This project is a static site and is deployed on [Netlify](https://www.netlify.com/). Since it has no build step, the publish directory is simply the project root.

## 📄 License

This project is open source and available for personal and educational use.
