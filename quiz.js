// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const quizQuestions = document.getElementById('quiz-questions');
    const resultDiv = document.getElementById('result');

    const questions = [
        {
            question: "What is the most famous places in Hyderabad?",
            options: ["Tankbund", "Park", "Lotus temple", "Charminar"],
            answer: "Charminar"
        },
        {
            question: "Which language is used for web development?",
            options: ["Python", "C++", "JavaScript", "Java"],
            answer: "JavaScript"
        },
        {
            question: "What are the most famous cartoons that watched by children more?",
            options: ["Doreamon", "Ben10", "Tom and Jerry", "Dora Bujji"],
            answer: "Doreamon"
        }
    ];

    function displayQuestions() {
        questions.map((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <p>${q.question}</p>
                <ul class="options">
                    ${q.options.map((option, i) => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${option}" required>
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            `;
            quizQuestions.appendChild(questionDiv);
        });
    }

    function calculateScore() {
        const formData = new FormData(quizForm);
        const userAnswers = questions.map((q, index) => formData.get(`question${index}`));
        const score = userAnswers.reduce((total, answer, index) => {
            return answer === questions[index].answer ? total + 1 : total;
        }, 0);
        return score;
    }

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const score = calculateScore();
        resultDiv.textContent = `You scored ${score} out of ${questions.length}`;
    });

    displayQuestions();
});
